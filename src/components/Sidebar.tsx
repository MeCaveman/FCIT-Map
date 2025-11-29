import logo from "../assets/img/fcit-logo.svg";
import { FiChevronRight } from "react-icons/fi";
import { FaMapMarkerAlt, FaSearch, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
  Category,
} from "@/utils/types";
import { MapDataContext, NavigationContext } from "../pages/Map";

import { navigateToObject } from "@/utils/navigationHelper";

interface CategoryGroup {
  category: Category;
  objects: ObjectItem[];
}

function Sidebar() {
  const { navigation, setNavigation, setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { objects, categories } = useContext(MapDataContext) as MapDataContextType;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const groupByCategory = () => {
      let filteredObjects = objects;

      // Filter by search query
      if (searchQuery.trim()) {
        filteredObjects = filteredObjects.filter((obj) =>
          obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          obj.desc?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory !== "all") {
        filteredObjects = filteredObjects.filter(
          (obj) => obj.categoryId === selectedCategory
        );
      }

      // Group by category
      const grouped: { [key: string]: ObjectItem[] } = {};
      filteredObjects.forEach((object) => {
        const categoryId = object.categoryId || "uncategorized";
        if (!grouped[categoryId]) {
          grouped[categoryId] = [];
        }
        grouped[categoryId].push(object);
      });

      // Convert to array with category info
      const groups: CategoryGroup[] = Object.keys(grouped).map((categoryId) => {
        const category = categories.find((c) => c.id === categoryId) || {
          id: categoryId,
          name: "Uncategorized",
        };
        return {
          category,
          objects: grouped[categoryId],
        };
      });

      // Sort by category name
      groups.sort((a, b) => a.category.name.localeCompare(b.category.name));
      setCategoryGroups(groups);
    };

    groupByCategory();
  }, [objects, categories, searchQuery, selectedCategory]);

  function handleObjectNavigation(selectedObjectName: string) {
    const object = objects.find((obj) => obj.name === selectedObjectName);
    setIsEditMode(false);
    if (!object) return;
    navigateToObject(object.name, navigation, setNavigation);
  }

  const totalResults = categoryGroups.reduce(
    (sum, group) => sum + group.objects.length,
    0
  );

  return (
    <aside className="flex flex-col rounded-none w-96 h-screen bg-white shadow-xl shadow-gray-200 -translate-x-full transform transition-transform duration-150 ease-in lg:translate-x-0 lg:shadow-md">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b">
        <div className="rounded-md w-12 h-12 bg-gray-100 flex items-center justify-center">
          <img
            src={logo}
            alt="FCIT Map"
            className={`w-10 h-10 object-contain ${isRotating ? "rotate" : ""}`}
            onClick={() => setIsRotating(true)}
            onAnimationEnd={() => setIsRotating(false)}
          />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-green-600">FCIT Map</h1>
          <FaMapMarkerAlt className="text-green-600 text-sm" />
        </div>
      </header>
      <p className="text-sm text-gray-600 px-4 py-2 border-b">
        FCIT College Building Navigation
      </p>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms, professors, numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter by Type */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center gap-2 mb-2">
          <FaSearch className="text-gray-500 text-sm" />
          <label className="text-sm font-medium text-gray-700">Filter by Type</label>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Room Types</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Floor Selector */}
      <div className="px-4 py-3 border-b">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Floor:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFloor(1)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFloor === 1
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setSelectedFloor(2)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFloor === 2
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            2
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2 border-b bg-gray-50">
          <p className="text-sm font-medium text-gray-700">
            {totalResults} {totalResults === 1 ? "Result" : "Results"}
          </p>
        </div>

        {categoryGroups.map((group, groupIndex) => (
          <div key={group.category.id} className="mb-2">
            {/* Category Header */}
            <div
              className={`px-4 py-2 cursor-pointer ${
                selectedCategory === group.category.id || selectedCategory === "all"
                  ? "bg-blue-100"
                  : "bg-gray-50"
              }`}
            >
              <h3 className="font-semibold text-gray-900">
                {group.category.name} ({group.objects.length})
              </h3>
            </div>

            {/* Objects List */}
            <div className="px-2">
              {group.objects.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 mx-1 my-1 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleObjectNavigation(item.name)}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    {item.desc && (
                      <p className="text-xs text-gray-600">
                        {item.desc.includes("Capacity")
                          ? item.desc
                          : `Capacity: ${item.desc}`}
                      </p>
                    )}
                  </div>
                  <FiChevronRight className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Floor Navigation (if needed) */}
        {categoryGroups.length > 0 && (
          <div className="px-4 py-2 border-t flex items-center justify-between">
            <span className="text-sm text-gray-600">Floor {selectedFloor}</span>
            <div className="flex gap-1">
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <FaChevronUp />
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <FaChevronDown />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
export default Sidebar;
