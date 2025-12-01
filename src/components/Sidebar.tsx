import logo from "../assets/img/FCITMapLogo.svg";
import { ChevronRight, Search } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
} from "@/utils/types";
import { MapDataContext, NavigationContext } from "../pages/Map";

import { navigateToObject } from "@/utils/navigationHelper";
import { graphData } from "@/store/graphData";
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

type FloorKey = "F1" | "F2" | "Other";

function Sidebar() {
  const { navigation, setNavigation, setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { objects } = useContext(MapDataContext) as MapDataContextType;
  const [searchQuery, setSearchQuery] = useState("");
  const [isRotating, setIsRotating] = useState(false);
   
  // Filter to only show navigatable rooms (those mapped to vertices)
  const navigatableObjects = objects.filter((o) => {
   // Find room in catalog
   const room = roomsCatalog.find((r) => r.name === o.name || r.id === o.name);
   if (!room) return false;
    
   // Check if this room is mapped to a vertex via ID, name, or explicit vertexId
   const hasVertex =
     graphData.vertices.some(
       (v) => v.objectName === room.id || v.objectName === room.name
     ) ||
     (room.vertexId
       ? graphData.vertices.some((v) => v.id === room.vertexId)
       : false);
   return hasVertex;
  });

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

  const objectsByFloor = useMemo(() => {
    const grouped: Record<FloorKey, ObjectItem[]> = { F1: [], F2: [], Other: [] };
    filteredObjects.forEach((o) => {
      if (o.floor === "F1") grouped.F1.push(o);
      else if (o.floor === "F2") grouped.F2.push(o);
      else grouped.Other.push(o);
    });
    // Sort each group alphabetically by name
    (Object.keys(grouped) as FloorKey[]).forEach((k) => {
      grouped[k] = grouped[k].slice().sort((a: ObjectItem, b: ObjectItem) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, [filteredObjects]);

  function handleObjectNavigation(selectedObjectName: string) {
    const object = objects.find((obj) => obj.name === selectedObjectName);
    setIsEditMode(false);
    if (!object) return;
    navigateToObject(object.name, navigation, setNavigation);
  }

  const floorOrder: FloorKey[] = ["F1", "F2", "Other"];
  const floorLabel: Record<FloorKey, string> = { F1: "Floor 1", F2: "Floor 2", Other: "Other" };

  return (
    <SidebarPrimitive collapsible="icon" className="bg-white border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="rounded-md w-12 h-12 bg-gray-100 flex items-center justify-center shadow-md shrink-0">
            <img
              src={logo}
              alt="FCIT Map"
              className={`w-10 h-10 object-contain ${isRotating ? "rotate" : ""}`}
              onClick={() => setIsRotating(true)}
              onAnimationEnd={() => setIsRotating(false)}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">FCIT Map</p>
            <p className="text-xs font-semibold text-[#225EA9] truncate">FCIT College Building Navigation</p>
          </div>
        </div>
        <div className="px-2 pt-2">
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
        {floorOrder
          .filter((f) => objectsByFloor[f].length > 0)
          .map((floor) => (
            <SidebarGroup key={floor}>
              <SidebarGroupLabel>
                {floorLabel[floor]}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  ({objectsByFloor[floor].length})
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {objectsByFloor[floor].map((item: ObjectItem) => (
                    <SidebarMenuItem key={item.id?.toString()}>
                      <SidebarMenuButton
                        onClick={() => handleObjectNavigation(item.name)}
                        tooltip={item.name}
                        className="flex flex-col items-start gap-1 h-auto py-2 px-3"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-semibold text-left">{item.name}</span>
                          <ChevronRight className="h-4 w-4 text-teal-400 shrink-0" />
                        </div>
                        {item.desc && (
                          <span className="text-xs text-gray-600 text-left w-full truncate">
                            {item.desc}
                          </span>
                        )}
                        {item.floor && (
                          <span className="text-[10px] text-gray-500">
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
        {floorOrder.filter((f) => objectsByFloor[f].length > 0).length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            {searchQuery ? "No rooms found matching your search." : "No rooms available."}
          </div>
        )}
      </SidebarContent>
    </SidebarPrimitive>
  );
}

export default Sidebar;
