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
import { graphData } from "@/store/graphData";
import { graphDataF2 } from "@/store/graphDataF2";

import Controls from "./MapControls";
import ObjectDetailsModal from "./Modals/ObjectDetailsModal";
import { toast } from "react-toastify";

// Quick dev toggle to log SVG coordinates on click for alignment debugging
const DEV_LOG_COORDS = false;
// Debug mode to show all vertices with labels and click feedback
const DEBUG_VERTICES = true;
const FLOOR_CENTERS: Record<string, { x: number; y: number }> = {
  F1: { x: 2531.52, y: 5327.52 },
  F2: { x: 2262.3716, y: 3366.75585 },
};

function IndoorMapWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState<ObjectItem>({} as ObjectItem);
  const [clickedVertex, setClickedVertex] = useState<string | null>(null);
  const transformRef = useRef<any>(null);
  const positionRadius = isMobile ? 80 : 60;
  const minZoomLevel = isMobile ? 2.5 : 2.0;
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
      const centerMapToFloor = () => {
        const floorCenter = FLOOR_CENTERS[currentFloor] || FLOOR_CENTERS.F1;
        transformRef.current?.setTransform(
          -floorCenter.x * minZoomLevel + (isMobile ? window.innerWidth / 2 : window.innerWidth / 3),
          -floorCenter.y * minZoomLevel + window.innerHeight / 2,
          minZoomLevel,
          0
        );
      };

      if (previousFloorRef.current !== currentFloor) {
        centerMapToFloor();
        previousFloorRef.current = currentFloor;
        return;
      }

      const currentGraphData = currentFloor === "F2" ? graphDataF2 : graphData;
      const userVertex = currentGraphData.vertices.find(
        (v) => v.id === navigation.start
      );

      if (userVertex) {
        // Center on user position with zoom level
        transformRef.current.setTransform(
          -userVertex.cx * defaultZoomLevel + (isMobile ? window.innerWidth / 2 : window.innerWidth / 3),
          -userVertex.cy * defaultZoomLevel + window.innerHeight / 2,
          defaultZoomLevel,
          0
        );
      } else {
        // Fall back to floor center when user vertex isn't on this floor
        centerMapToFloor();
      }
    }
  }, [navigation.start, isEditMode, currentFloor]);
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
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white rounded-lg px-6 py-3 text-lg font-bold shadow-lg">
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
