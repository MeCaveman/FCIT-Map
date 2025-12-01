import { useContext } from "react";
import { graphData } from "@/store/graphData";
import { graphDataF2 } from "@/store/graphDataF2";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import overlayTransforms from "@/config/overlayTransforms";

interface PositionsProps {
  positionRadius: number;
  handlePositionClick: (e: React.MouseEvent<SVGPathElement>) => void;
  className: string;
  navigation?: NavigationContextType["navigation"];
  debugMode?: boolean;
}
function Positions({
  positionRadius,
  handlePositionClick,
  className,
  navigation,
  debugMode = false,
}: PositionsProps) {
  const { currentFloor } = useContext(NavigationContext) as NavigationContextType;
  const currentGraphData = currentFloor === "F2" ? graphDataF2 : graphData;
  const t = overlayTransforms[(currentFloor as "F1" | "F2") || "F1"];
  const positionBackgroundColor = "#4285f4";
  // Scale radius inversely so it appears consistent size across floors
  const scaledRadius = positionRadius / t.scaleX;
  const positionBackgroundRadius = scaledRadius + (7 / t.scaleX);
  const positonBackgroundOpacity = 0.2;
  const startVertex = currentGraphData.vertices.find(
    (v) => v.id === navigation?.start
  );

  function isActivePosition(vertexId: string) {
    return navigation?.start === vertexId;
  }
  return (
    <g id="Vertexes" transform={`translate(${t.translateX} ${t.translateY}) scale(${t.scaleX} ${t.scaleY})`}>
      {/* Background circle for Google Maps like look */}
      <circle
        id="background-circle"
        cx={startVertex?.cx}
        cy={startVertex?.cy}
        fill={positionBackgroundColor}
        opacity={positonBackgroundOpacity}
        r={positionBackgroundRadius}
      />
      {currentGraphData.vertices.map((vertex) => (
        <g key={vertex.id}>
          <circle
            // only allow click on positions that are not referring to an object
            onClick={debugMode ? handlePositionClick : (vertex.objectName ? () => {} : handlePositionClick)}
            id={vertex.id}
            // show only positions that are not referring to an object (e.g. shops, restrooms, etc.)
            className={`position ${vertex.objectName ? "opacity-0" : className} ${isActivePosition(vertex.id) && "position-active opacity-100"}`}
            cx={vertex.cx}
            cy={vertex.cy}
            r={scaledRadius}
          />
          {debugMode && (
            <text
              x={vertex.cx}
              y={vertex.cy - scaledRadius - 5}
              fontSize={120 / t.scaleX}
              fill="#000"
              textAnchor="middle"
              pointerEvents="none"
              className="select-none font-mono font-bold"
              style={{ textShadow: "0 0 5px white, 0 0 5px white, 0 0 5px white" }}
            >
              {vertex.id}
            </text>
          )}
        </g>
      ))}
      {/* Circle animation */}
      <circle
        id="circle-animation"
        cx={startVertex?.cx}
        cy={startVertex?.cy}
        fill="none"
        stroke="white"
        strokeWidth={2 / t.scaleX}
        r={scaledRadius}
      >
        <animate
          attributeName="stroke-width"
          values="1;3;1"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

export default Positions;
