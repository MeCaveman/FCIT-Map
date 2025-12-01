import { useContext } from "react";
import { graphData } from "@/store/graphData";
import { graphDataF2 } from "@/store/graphDataF2";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import overlayTransforms from "@/config/overlayTransforms";

function Paths() {
  const { currentFloor } = useContext(NavigationContext) as NavigationContextType;
  const currentGraphData = currentFloor === "F2" ? graphDataF2 : graphData;
  const t = overlayTransforms[(currentFloor as "F1" | "F2") || "F1"];
  return (
    <g id="Edges" transform={`translate(${t.translateX} ${t.translateY}) scale(${t.scaleX} ${t.scaleY})`}>
      {currentGraphData.edges.map((edge) => {
        const { id, from, to } = edge;
        const fromVertex = currentGraphData.vertices.find(
          (vertex) => vertex.id === from
        );
        const toVertex = currentGraphData.vertices.find((vertex) => vertex.id === to);
        if (fromVertex && toVertex) {
          const pathClassName = "path";
          const pathD = `M${fromVertex.cx} ${fromVertex.cy}L${toVertex.cx} ${toVertex.cy}`;
          return <path key={id} id={id} className={pathClassName} d={pathD} />;
        }
        return null;
      })}
      <path id="navigation-route" className="path navigation-route" d="" fill="none" />
    </g>
  );
}

export default Paths;
