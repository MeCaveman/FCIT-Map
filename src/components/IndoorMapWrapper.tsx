import React, { useContext, useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { MapDataContext, NavigationContext, WhereAreYouModalContext } from "../pages/Map";
import "../styles/map.css";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
} from "../utils/types";
import { MapBackground, Paths, Positions, Objects } from "./IndoorMap";

import Controls from "./MapControls";
import ObjectDetailsModal from "./Modals/ObjectDetailsModal";
import { toast } from "react-toastify";

// Quick dev toggle to log SVG coordinates on click for alignment debugging
const DEV_LOG_COORDS = false;
// Debug mode to show all vertices with labels and click feedback
const DEBUG_VERTICES = false;
const FLOOR_CENTERS: Record<string, { x: number; y: number }> = {
  F1: { x: 3800.09, y: 10249.4 },
  F2: { x: 4524.7432 / 2, y: 6733.5117 / 2 },
};

function IndoorMapWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState<ObjectItem>({} as ObjectItem);
  const [clickedVertex, setClickedVertex] = useState<string | null>(null);
  const transformRef = useRef<any>(null);
  const positionRadius = isMobile ? 80 : 60;
  const minZoomLevel = isMobile ? 1.5 : 1.0;
  const defaultZoomLevel = isMobile ? 3 : 2.5;
  const { navigation, setNavigation, isEditMode, setIsEditMode, currentFloor } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const previousFloorRef = useRef<string>(currentFloor);
  const { objects } = useContext(MapDataContext) as MapDataContextType;
  const { setModalState } = useContext(WhereAreYouModalContext) || {};

  // Get current user position and zoom to it
  useEffect(() => {
    if (transformRef.current && !isEditMode) {
      const floorCenter = FLOOR_CENTERS[currentFloor] || FLOOR_CENTERS.F1;
      transformRef.current?.setTransform(
        -floorCenter.x * minZoomLevel + (isMobile ? window.innerWidth / 2 : window.innerWidth / 3),
        -floorCenter.y * minZoomLevel + window.innerHeight / 2,
        minZoomLevel,
        0
      );
      previousFloorRef.current = currentFloor;
    }
  }, [currentFloor, isEditMode]);
  async function handleObjectClick(e: React.MouseEvent<SVGPathElement>) {
    if (!isEditMode) {
      const targetId = (e.target as HTMLElement).id;
      const selectedObject = objects.find((obj) => obj.name === targetId);
      if (selectedObject?.id) {
        setObject(selectedObject);
        setModalOpen(true);
      } else {
        toast.error("Object not found");
      }
    }
  }
  const handlePositionClick = (e: React.MouseEvent<SVGPathElement>) => {
    const vertexId = (e.target as HTMLElement).id;
    
    if (DEBUG_VERTICES) {
      setClickedVertex(vertexId);
      // Clear the message after 3 seconds
      setTimeout(() => setClickedVertex(null), 3000);
    }
    
    if (isEditMode) {
      setNavigation({ start: vertexId });
      setIsEditMode(false);
    }
  };

  function handleNavigationClick() {
    setModalOpen(false);
    // Show modal before navigating
    if (setModalState) {
      setModalState({
        open: true,
        targetObjectName: object.name,
      });
    }
  }
  return (
    <div className="relative w-full h-full bg-white center">
      {DEV_LOG_COORDS && (
        <div className="absolute top-2 left-2 z-20 bg-white/80 rounded px-2 py-1 text-xs text-gray-700">
          Click the map to log SVG coords in console
        </div>
      )}
      {DEBUG_VERTICES && clickedVertex && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-teal-700 text-white rounded-lg px-6 py-3 text-lg font-bold shadow-lg">
          Clicked vertex: {clickedVertex}
        </div>
      )}
      <ObjectDetailsModal
        open={modalOpen}
        object={object}
        onClose={() => setModalOpen((cur) => !cur)}
        objectNavigation={handleNavigationClick}
      />

      <TransformWrapper
        key={currentFloor}
        ref={transformRef}
        centerOnInit
        minScale={minZoomLevel}
        maxScale={isMobile ? 5 : 6}
        doubleClick={{ mode: "reset" }}
        initialScale={defaultZoomLevel}
        smooth={true}
        wheel={{ smoothStep: 0.01 }}
        limitToBounds={true}
        onPanningStart={() => {}}
        onPanning={() => {}}
        onPanningStop={() => {}}
        onZoom={() => {}}
        onPinching={() => {}}
      >
        <TransformComponent wrapperClass="bg-white">
          <MapBackground>
            {/*Objects are the clickable areas on the map e.g. Rooms, Desks, ...*/}
            <Objects
              handleObjectClick={handleObjectClick}
              className={
                isEditMode ? "" : "hover:cursor-pointer hover:opacity-50"
              }
            />
            {/*Edges are the lines on the map aka the paths*/}
            <Paths />
            {/*Vertexes are the circles on the map aka the positions*/}
            <Positions
              positionRadius={positionRadius}
              handlePositionClick={handlePositionClick}
              className={
                isEditMode
                  ? "opacity-100 cursor-pointer hover:fill-[#488af4] "
                  : DEBUG_VERTICES
                  ? "opacity-100 cursor-pointer hover:fill-[#488af4]"
                  : "opacity-0"
              }
              navigation={navigation}
              debugMode={DEBUG_VERTICES}
            />
          </MapBackground>
        </TransformComponent>
        <Controls />
      </TransformWrapper>
    </div>
  );
}
export default IndoorMapWrapper;
