import { Dispatch, SetStateAction } from "react";
import { graph } from "../algorithms/dijkstra";
import { Navigation, NavigationContextType } from "./types";
import { ObjectItem } from "./types";
import { graphData, VertexData } from "@/store/graphData";
import { toast } from "react-toastify";
export let routeLength = 0;

const findVertexByObjectId = (vertexId: string) =>
  graphData.vertices.find((v) => v.objectName === vertexId);

export function navigateToObject(
  selectedObjectId: string,
  navigation: NavigationContextType["navigation"],
  setNavigation: NavigationContextType["setNavigation"]
) {
  const target = findVertexByObjectId(selectedObjectId);
  if (!target) {
    console.error("Target not found");
    toast.error("Target not found");
    return;
  }

  const shortestPath = graph.calculateShortestPath(navigation.start, target.id);
  const pathString = shortestPath
    .slice(1)
    .map((vertexId) => {
      const vertex = graphData.vertices.find((v) => v.id === vertexId);
      return vertex ? `L${vertex.cx} ${vertex.cy}` : "";
    })
    .join(" ");

  const startVertex = graphData.vertices.find((v) => v.id === navigation.start);
  const navigationRoutePath = document.getElementById("navigation-route");
  if (navigationRoutePath && startVertex) {
    navigationRoutePath.setAttribute(
      "d",
      `M${startVertex.cx} ${startVertex.cy} ${pathString}`
    );
    console.log("navigationRoutePath", navigationRoutePath);
    navigationRoutePath.classList.remove("path-once", "path-active");
    navigationRoutePath.classList.add("path-once");
    navigationRoutePath.addEventListener(
      "animationend",
      () => {
        navigationRoutePath.classList.remove("path-once");
        navigationRoutePath.classList.add("path-active");
      },
      { once: true }
    );
  }

  setNavigation((prevNavigation) => ({
    ...prevNavigation,
    end: selectedObjectId,
  }));
}

export function resetEdges() {
  document.getElementById("navigation-route")?.setAttribute("d", "");
  graphData.edges.forEach((edge) => {
    const element = document.getElementById(edge.id);
    if (element) {
      element.classList.remove("path-active");
    }
  });
}

export function navigateWithDelay(
  objects: ObjectItem[],
  index: number,
  delay: number,
  navigation: Navigation,
  setNavigation: Dispatch<SetStateAction<Navigation>>
) {
  if (index < objects.length) {
    const obj = objects[index];
    navigateToObject(obj.name, navigation, setNavigation);

    setTimeout(() => {
      navigateWithDelay(objects, index + 1, delay, navigation, setNavigation);
    }, delay);
  }
}

function getVertexById(id: string): VertexData | undefined {
  return graphData.vertices.find((v) => v.id === id);
}

function calculateDistanceBetweenVertices(a: VertexData, b: VertexData): number {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  return Math.sqrt(dx * dx + dy * dy);
}

function calculatePathDistance(pathVertexIds: string[]): number {
  if (pathVertexIds.length < 2) return Infinity;
  let total = 0;
  for (let i = 0; i < pathVertexIds.length - 1; i++) {
    const from = getVertexById(pathVertexIds[i]);
    const to = getVertexById(pathVertexIds[i + 1]);
    if (!from || !to) return Infinity;
    total += calculateDistanceBetweenVertices(from, to);
  }
  return total;
}

export function findNearestObjectByCategory(
  categoryId: string,
  startVertexId: string,
  objects: ObjectItem[]
): ObjectItem | null {
  const candidates = objects.filter((o) => o.categoryId === categoryId);
  if (candidates.length === 0) return null;

  let best: { object: ObjectItem; distance: number } | null = null;
  const epsilon = 1e-6; // tolerance for nearly equal distances

  for (const obj of candidates) {
    const targetVertex = graphData.vertices.find((v) => v.objectName === obj.name);
    if (!targetVertex) continue;
    const path = graph.calculateShortestPath(startVertexId, targetVertex.id);
    if (!path || path.length === 0) continue;
    const distance = calculatePathDistance(path);
    // Debug: log candidate distances for inspection
    // eslint-disable-next-line no-console
    console.log(
      `[nearest] start=${startVertexId} -> ${obj.name} distance=${Math.round(distance)} (vertices=${path.length})`
    );
    if (!best || distance < best.distance - epsilon) {
      best = { object: obj, distance };
    } else if (best && Math.abs(distance - best.distance) <= epsilon) {
      // Tie-break: prefer lexicographically smaller name (e.g., Bathroom 1 before Bathroom 2)
      if (obj.name < best.object.name) {
        best = { object: obj, distance };
      }
    }
  }

  // eslint-disable-next-line no-console
  if (best) console.log(`[nearest] chosen=${best.object.name} distance=${Math.round(best.distance)}`);
  return best ? best.object : null;
}
