import logo from "../assets/img/FCITMapLogo.svg";
import { ChevronRight, Search, MapPin } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
} from "@/utils/types";
import { MapDataContext, NavigationContext } from "../pages/Map";

import { navigateToObject } from "@/utils/navigationHelper";
import { graphData } from "@/store/graphData";
import { graphDataF2 } from "@/store/graphDataF2";
import roomsCatalog from "@/data/roomsCatalog";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

function Sidebar() {
  const { navigation, setNavigation, setIsEditMode, currentFloor, setCurrentFloor } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { objects } = useContext(MapDataContext) as MapDataContextType;
  const [searchQuery, setSearchQuery] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate("/");
  };
   
  // Filter to show rooms that are mapped to vertices OR are offices
  const navigatableObjects = useMemo(() => {
    return objects.filter((o) => {
      // Find room in catalog
      const room = roomsCatalog.find((r) => r.name === o.name || r.id === o.name);
      if (!room) return false;
      
      // Always show offices, even if not mapped to vertices
      if (room.categoryId === "Office") {
        return true;
      }
      
      // Select the appropriate graph data based on room floor
      const currentGraphData = room.floor === "F2" ? graphDataF2 : graphData;
      
      // Check if this room is mapped to a vertex via ID, name, or explicit vertexId
      const hasVertex =
        currentGraphData.vertices.some(
          (v) => v.objectName === room.id || v.objectName === room.name
        ) ||
        (room.vertexId
          ? currentGraphData.vertices.some((v) => v.id === room.vertexId)
          : false);
      return hasVertex;
    });
  }, [objects]);

  // Filter objects by search query
  const filteredObjects = useMemo(() => {
    if (!searchQuery.trim()) return navigatableObjects;
    const query = searchQuery.toLowerCase();
    return navigatableObjects.filter(
      (o) =>
        o.name.toLowerCase().includes(query) ||
        o.desc?.toLowerCase().includes(query)
    );
  }, [navigatableObjects, searchQuery]);

  // Group objects by category instead of floor
  const objectsByCategory = useMemo(() => {
    const grouped: Record<string, ObjectItem[]> = {};
    filteredObjects.forEach((o) => {
      const category = o.categoryName || o.categoryId || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(o);
    });
    // Sort each group alphabetically by name
    Object.keys(grouped).forEach((category) => {
      grouped[category] = grouped[category].slice().sort((a: ObjectItem, b: ObjectItem) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, [filteredObjects]);

  function handleObjectNavigation(selectedObjectName: string) {
    const object = objects.find((obj) => obj.name === selectedObjectName);
    setIsEditMode(false);
    if (!object) return;
    
    // Switch floor if the selected room is on a different floor
    if (object.floor && object.floor !== currentFloor) {
      setCurrentFloor(object.floor);
      // Wait a bit for the floor to switch before navigating
      setTimeout(() => {
        navigateToObject(object.name, navigation, setNavigation);
      }, 100);
    } else {
      navigateToObject(object.name, navigation, setNavigation);
    }
  }

  // Sort categories alphabetically
  const categoryOrder = useMemo(() => {
    return Object.keys(objectsByCategory).sort();
  }, [objectsByCategory]);

  return (
    <SidebarPrimitive collapsible="icon" className="bg-white border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="rounded-md w-12 h-12 bg-gray-100 flex items-center justify-center shadow-md shrink-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 cursor-pointer hover:bg-gray-200 transition-colors">
            <img
              src={logo}
              alt="FCIT Map"
              className={`w-10 h-10 object-contain group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 ${isRotating ? "rotate" : ""}`}
              onClick={(e) => {
                if (e.detail === 2) {
                  // Double click for rotation
                  setIsRotating(true);
                } else {
                  // Single click for navigation
                  handleLogoClick();
                }
              }}
              onAnimationEnd={() => setIsRotating(false)}
            />
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-lg font-semibold text-gray-900 truncate">FCIT Map</p>
            <p className="text-xs font-semibold text-[#225EA9] truncate">FCIT College Building Navigation</p>
          </div>
        </div>
        <div className="px-2 pt-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <SidebarInput
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {categoryOrder
          .filter((category) => objectsByCategory[category].length > 0)
          .map((category) => (
            <SidebarGroup key={category}>
              <SidebarGroupLabel>
                {category}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  ({objectsByCategory[category].length})
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {objectsByCategory[category].map((item: ObjectItem) => (
                    <SidebarMenuItem key={item.id?.toString()}>
                      <SidebarMenuButton
                        onClick={() => handleObjectNavigation(item.name)}
                        tooltip={item.name}
                        className="flex flex-col items-start gap-1 h-auto py-2 px-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center"
                      >
                        <MapPin className="h-4 w-4 text-teal-400 shrink-0 hidden group-data-[collapsible=icon]:block" />
                        <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
                          <span className="text-sm font-semibold text-left">{item.name}</span>
                          <ChevronRight className="h-4 w-4 text-teal-400 shrink-0" />
                        </div>
                        {item.desc && (
                          <span className="text-xs text-gray-600 text-left w-full truncate group-data-[collapsible=icon]:hidden">
                            {item.desc}
                          </span>
                        )}
                        {item.floor && (
                          <span className="text-[10px] text-gray-500 group-data-[collapsible=icon]:hidden">
                            {item.floor === "F2" ? "Floor 2" : "Floor 1"}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        {categoryOrder.filter((category) => objectsByCategory[category].length > 0).length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            {searchQuery ? "No rooms found matching your search." : "No rooms available."}
          </div>
        )}
      </SidebarContent>
    </SidebarPrimitive>
  );
}

export default Sidebar;
