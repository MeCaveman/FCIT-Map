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

function IndoorMapWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState<ObjectItem>({} as ObjectItem);
  const transformRef = useRef<any>(null);
  const positionRadius = isMobile ? 80 : 60;
  const { navigation, setNavigation, isEditMode, setIsEditMode, currentFloor } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const { objects } = useContext(MapDataContext) as MapDataContextType;
  const { setModalState } = useContext(WhereAreYouModalContext) || {};

  // Get current user position and zoom to it
  useEffect(() => {
    if (transformRef.current && !isEditMode) {
      const currentGraphData = currentFloor === "F2" ? graphDataF2 : graphData;
      const userVertex = currentGraphData.vertices.find(
        (v) => v.id === navigation.start
      );

      if (userVertex) {
        // Center on user position with zoom level
        const zoomLevel = isMobile ? 3 : 2.5;
        transformRef.current.setTransform(
          -userVertex.cx * zoomLevel + (isMobile ? window.innerWidth / 2 : window.innerWidth / 3),
          -userVertex.cy * zoomLevel + window.innerHeight / 2,
          zoomLevel,
          0
        );
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
    if (isEditMode) {
      const vertexId = (e.target as HTMLElement).id;
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
      <ObjectDetailsModal
        open={modalOpen}
        object={object}
        onClose={() => setModalOpen((cur) => !cur)}
        objectNavigation={handleNavigationClick}
      />

      <TransformWrapper
        ref={transformRef}
        centerOnInit
        minScale={isMobile ? 2.5 : 2.0}
        maxScale={isMobile ? 5 : 6}
        doubleClick={{ mode: "reset" }}
        initialScale={isMobile ? 3 : 2.5}
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
                  : "opacity-0"
              }
              navigation={navigation}
            />
          </MapBackground>
        </TransformComponent>
        <Controls />
      </TransformWrapper>
    </div>
  );
}
export default IndoorMapWrapper;
