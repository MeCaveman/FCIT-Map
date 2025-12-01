import Tooltip from "@/components/ui/Tooltip";
import { navigateWithDelay as navigationTestAll } from "@/utils/navigationHelper";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiNavigation } from "react-icons/fi";
import { useOnClickOutside } from "usehooks-ts";
import { MapDataContext, NavigationContext, WhereAreYouModalContext } from "../pages/Map";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
} from "../utils/types";

function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const { objects, categories } = useContext(MapDataContext) as MapDataContextType;
  const [suggestions, setSuggestions] = useState<ObjectItem[]>(objects);
  const [isAutocomplete, setIsAutocomplete] = useState<boolean>(false);
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const { navigation, setNavigation } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { setModalState } = useContext(WhereAreYouModalContext) || {};

  const categoryChips = ["Class", "Lab", "Bathroom", "Office", "Other"];

  useEffect(() => {
    setSuggestions(objects);
  }, [objects]);

  useOnClickOutside(suggestionsRef, (event) => {
    // Don't close if clicking on input or chips
    if (inputRef.current?.contains(event.target as Node) || chipsRef.current?.contains(event.target as Node)) {
      return;
    }
    setIsAutocomplete(false);
    setIsEditMode(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  });

  function handleChipClick(category: string) {
    // Don't trigger click if user was dragging
    if (hasDragged) {
      return;
    }
    
    if (activeFilter === category) {
      // Toggle off
      setActiveFilter(null);
      setSuggestions(objects);
    } else {
      // Filter by category
      setActiveFilter(category);
      const filtered = objects.filter(
        (obj) => (obj.categoryName || obj.categoryId || "").toLowerCase() === category.toLowerCase()
      );
      setSuggestions(filtered);
    }
    // Keep autocomplete open
    setIsAutocomplete(true);
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chipsRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - chipsRef.current.offsetLeft);
    setScrollLeft(chipsRef.current.scrollLeft);
    chipsRef.current.style.scrollBehavior = 'auto';
    chipsRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !chipsRef.current) return;
    e.preventDefault();
    const x = e.pageX - chipsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    const distance = Math.abs(walk);
    
    if (distance > 5) {
      setHasDragged(true);
    }
    
    chipsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (chipsRef.current) {
      chipsRef.current.style.scrollBehavior = 'smooth';
      chipsRef.current.style.userSelect = 'auto';
    }
    // Reset hasDragged after a short delay
    setTimeout(() => setHasDragged(false), 100);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    setActiveFilter(null); // Clear chip filter when typing
    if (value) {
      setIsAutocomplete(true);
      const q = value.trim().toLowerCase();
      const filteredSuggestions = objects.filter((obj) => {
        const nameMatch = obj.name.toLowerCase().includes(q);
        const catMatch = (obj.categoryName || obj.categoryId || "").toLowerCase().includes(q);
        return nameMatch || catMatch;
      });
      setSuggestions(filteredSuggestions);
    } else {
      setIsAutocomplete(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (isAutocomplete) {
      if (event.key === "ArrowDown") {
        if (selectedIndex < suggestions.length - 1) {
          setSelectedIndex((prevIndex) => prevIndex + 1);
          setInputValue(suggestions[selectedIndex + 1].name);
        }
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        if (selectedIndex > 0) {
          setSelectedIndex((prevIndex) => prevIndex - 1);
          setInputValue(suggestions[selectedIndex - 1].name);
        }
        event.preventDefault();
      } else if (event.key === "Enter") {
        event.preventDefault();
        // If input matches a category, prefer nearest-by-category navigation
        const trimmed = inputValue.trim().toLowerCase();
        const category = categories?.find(
          (c) => c.name.toLowerCase() === trimmed || c.id.toLowerCase() === trimmed
        );
        if (category) {
          handleSearch(inputValue);
          return;
        }
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
          // Show modal before navigating
          if (setModalState) {
            setModalState({
              open: true,
              targetObjectName: suggestions[selectedIndex].name,
            });
          }
        } else {
          handleSearch(inputValue);
        }
      }
    }
  }

  useEffect(() => {
    if (suggestionsRef.current && selectedIndex >= 0) {
      const suggestionElements = suggestionsRef.current.children;
      if (suggestionElements[selectedIndex]) {
        suggestionElements[selectedIndex].scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  function handleSuggestionClick(selectedObject: ObjectItem) {
    console.log(selectedObject);
    setInputValue(selectedObject.name);
    setIsAutocomplete(false);
  }
  function handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsEditMode(false);
    setIsAutocomplete(true);
    if (!inputValue && !activeFilter) {
      setSuggestions(objects);
    }
    event.currentTarget.select();
  }

  function handleSearch(inputValue: string) {
    const trimmed = inputValue.trim().toLowerCase();

    // If user entered a category name or id, navigate to nearest object of that category
    // Category search: if query matches a known category keyword, show first match and keep suggestions visible
    const categoryKeywords = ["class", "lab", "bathroom", "office", "other"];
    const matchesCategoryKeyword = categoryKeywords.some((kw) => kw.startsWith(trimmed));
    if (matchesCategoryKeyword) {
      const firstCatMatch = objects.find(
        (obj) => (obj.categoryName || obj.categoryId || "").toLowerCase().includes(trimmed)
      );
      if (firstCatMatch) {
        if (setModalState) {
          setModalState({ open: true, targetObjectName: firstCatMatch.name });
        }
        setSelectedIndex(-1);
        setIsAutocomplete(true);
        setInputValue(trimmed);
        setSuggestions(
          objects.filter((obj) => (obj.categoryName || obj.categoryId || "").toLowerCase().includes(trimmed))
        );
        return;
      }
    }

    // Exact object search fallback
    const matchingObject = objects.find(
      (obj) => obj.name.toLowerCase() === trimmed
    );
    if (!matchingObject) {
      if (inputValue === "Test") {
        const delay = 500;
        navigationTestAll(objects, 0, delay, navigation, setNavigation);
        return;
      } else {
        setIsInputInvalid(true);
        return;
      }
    }
    // Show modal before navigating
    if (setModalState) {
      setModalState({
        open: true,
        targetObjectName: matchingObject.name,
      });
    }
    setSelectedIndex(-1);
  }

  return (
    <div className="md:w-80 w-full flex flex-row">
      <div className="flex flex-inline rounded w-full">
        <div className="h-12 w-12 center flex-none rounded-l bg-white text-blue-500 text-[8px] ">
          <div className="w-full h-8 center border-gray-300 border-r">
            <img src="/src/assets/img/fcit-logo.svg" alt="FCIT" className="w-6 h-6" />
          </div>
        </div>
        <div className="flex w-full relative">
          <input
            className={`h-12 p-4 w-full flex-none text-gray-900 text-sm md:text-md ${
              isInputInvalid && "input-error"
            } `}
            placeholder="Search rooms"
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            onAnimationEnd={() => setIsInputInvalid(false)}
          />

          {isAutocomplete && (
            <ul
              ref={suggestionsRef}
              className="absolute w-full z-10 mt-[3.25rem] bg-white rounded shadow-md max-h-60 h-min overflow-y-auto"
              key={"suggestions"}
            >
              {/* Category Filter Chips - Horizontal Scrollable */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
                <div
                  ref={chipsRef}
                  className={`flex gap-2 overflow-x-auto pb-1 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categoryChips.map((cat) => (
                    <button
                      key={cat}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleChipClick(cat);
                      }}
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors flex-shrink-0 select-none ${
                        activeFilter === cat
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              {suggestions.length > 0 ? (
                suggestions.map((obj, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 border-t hover:bg-gray-200 active:bg-gray-300 ${
                      selectedIndex === index
                        ? "border-l-4 border-blue-500 bg-gray-200"
                        : ""
                    }`}
                    onMouseDown={() => handleSuggestionClick(obj)}
                  >
                    <div className="flex flex-col">
                      <span className="text-gray-700 text-sm md:text-md font-medium">{obj.name}</span>
                      {obj.floor && (
                        <span className="text-gray-500 text-xs">{obj.floor === "F2" ? "Floor 2" : "Floor 1"}</span>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li
                  className="p-2 text-gray-500 text-sm md:text-md"
                  key={"no-result"}
                >
                  No results found
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="">
          <Tooltip content="Search" className="bg-blue-500">
            <button
              className="h-12 w-12 flex flex-none center justify-center rounded-r bg-blue-500 text-white"
              onClick={() => handleSearch(inputValue)}
              aria-label="search"
            >
              <FiNavigation />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
