import logo from "../assets/img/fcit-logo.svg";
import { FiChevronRight } from "react-icons/fi";
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

type FloorKey = "F1" | "F2" | "Other";

function Sidebar() {
  const { navigation, setNavigation, setIsEditMode } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { objects } = useContext(MapDataContext) as MapDataContextType;
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


  const objectsByFloor = useMemo(() => {
    const grouped: Record<FloorKey, ObjectItem[]> = { F1: [], F2: [], Other: [] };
    navigatableObjects.forEach((o) => {
      if (o.floor === "F1") grouped.F1.push(o);
      else if (o.floor === "F2") grouped.F2.push(o);
      else grouped.Other.push(o);
    });
    // Sort each group alphabetically by name
    (Object.keys(grouped) as FloorKey[]).forEach((k) => {
      grouped[k] = grouped[k].slice().sort((a: ObjectItem, b: ObjectItem) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, [objects]);

  function handleObjectNavigation(selectedObjectName: string) {
    const object = objects.find((obj) => obj.name === selectedObjectName);
    setIsEditMode(false);
    if (!object) return;
    navigateToObject(object.name, navigation, setNavigation);
  }

  const floorOrder: FloorKey[] = ["F1", "F2", "Other"];
  const floorLabel: Record<FloorKey, string> = { F1: "Floor 1", F2: "Floor 2", Other: "Other" };

  return (
    <aside className="flex flex-col rounded-none w-[35rem] h-screen p-3 bg-white shadow-xl shadow-gray-200 -translate-x-full transform transition-transform duration-150 ease-in lg:translate-x-0 lg:shadow-md ">
      <header className="flex flex-col mb-4 pr-1 border-b py-2 w-full relative">
        <div className="flex items-center flex-none mr-10">
          <div className="rounded-md w-16 h-16 bg-gray-100 flex items-center justify-center shadow-md">
            <img
              src={logo}
              alt="FCIT Map"
              className={`w-12 h-12 object-contain ${isRotating ? "rotate" : ""}`}
              onClick={() => setIsRotating(true)}
              onAnimationEnd={() => setIsRotating(false)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="text-1xl font-semibold text-gray-900 pl-2">FCIT Map</p>
              <p className="text-sm font-semibold text-[#225EA9] pl-2">FCIT College Building Navigation</p>
            </div>
          </div>
        </div>
      </header>
      <div className="overflow-auto h-full">
        {floorOrder
          .filter((f) => objectsByFloor[f].length > 0)
          .map((floor) => (
            <div key={floor} className="mb-6">
              <header className="px-2 mb-2">
                <h2 className="text-xl font-bold flex items-center">
                  {floorLabel[floor]}
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    - {objectsByFloor[floor].length} {objectsByFloor[floor].length === 1 ? "Room" : "Rooms"}
                  </span>
                </h2>
              </header>
              <div className="flex flex-col">
                {objectsByFloor[floor].map((item: ObjectItem) => (
                  <div
                    key={item.id?.toString()}
                    data-product={item.name}
                    className="flex bg-[#f4faff] m-1 px-4 py-2 shadow-sm rounded-md cursor-pointer h-auto hover:bg-[#e4f2ff]"
                    onClick={() => handleObjectNavigation(item.name)}
                  >
                    <div className="m-1">
                      <p className="text-xs 2xl:text-sm font-semibold">{item.name}</p>
                      <p className="text-xs 2xl:text-sm text-gray-600">{item.desc}</p>
                      {item.floor && (
                        <p className="text-[10px] text-gray-500 mt-0.5">{item.floor === "F2" ? "Floor 2" : "Floor 1"}</p>
                      )}
                    </div>
                    <div className="ml-auto h-auto text-xl text-blue-300 flex items-center">
                      <FiChevronRight />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </aside>
  );
}
export default Sidebar;