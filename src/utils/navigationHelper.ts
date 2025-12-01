import { Dispatch, SetStateAction } from "react";
import { graph } from "../algorithms/dijkstra";
import { Navigation, NavigationContextType } from "./types";
import { ObjectItem } from "./types";
import { graphData, VertexData } from "@/store/graphData";
import { toast } from "react-toastify";
import roomsCatalog from "@/data/roomsCatalog";
import { processPathToManhattan } from "./pathProcessor";
export let routeLength = 0;

const findVertexByObjectId = (vertexId: string) =>
  graphData.vertices.find((v) => v.objectName === vertexId);

const findVertexByRoomCatalog = (searchTerm: string): VertexData | undefined => {
  // Try to find room in catalog by ID or name (case-insensitive partial match)
  const searchLower = searchTerm.toLowerCase();
  const room = roomsCatalog.find((r) => 
    r.id === searchTerm || 
    r.id.toLowerCase() === searchLower ||
    r.name.toLowerCase().includes(searchLower)
  );
  
  if (room) {
    // Room found in catalog, now find the corresponding vertex
    return findVertexByObjectId(room.id);
  }
  return undefined;
};

const findNearestVertexByCategory = (
  categoryId: string,
  startVertexId: string
): VertexData | undefined => {
  // Find all rooms in the category that have vertices
  const roomsInCategory = roomsCatalog.filter((r) => r.categoryId === categoryId);
  const vertices = roomsInCategory
    .map((room) => findVertexByObjectId(room.id))
    .filter((v): v is VertexData => v !== undefined);
  
  if (vertices.length === 0) return undefined;
  
  // Find the nearest one using Dijkstra
  let nearest: VertexData | undefined;
  let shortestDistance = Infinity;
  
  for (const vertex of vertices) {
    const path = graph.calculateShortestPath(startVertexId, vertex.id);
    if (path && path.length > 0) {
      const distance = calculatePathDistance(path);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = vertex;
      }
    }
  }
  
  return nearest;
};

export function navigateToObject(
  selectedObjectId: string,
  navigation: NavigationContextType["navigation"],
  setNavigation: NavigationContextType["setNavigation"]
) {
  // Strategy 1: Try direct lookup by objectName in vertices (exact match)
  let target = findVertexByObjectId(selectedObjectId);
  
  // Strategy 2: Try roomsCatalog lookup (by ID or name)
  if (!target) {
    target = findVertexByRoomCatalog(selectedObjectId);
  }
  
  // Strategy 3: Try category search (e.g., "Bathroom" finds nearest bathroom)
  if (!target && navigation.start) {
    const categoryMatch = roomsCatalog.find((r) => 
      r.categoryId.toLowerCase() === selectedObjectId.toLowerCase()
    );
    if (categoryMatch) {
      target = findNearestVertexByCategory(categoryMatch.categoryId, navigation.start);
    }
  }
  
  if (!target) {
    console.error("Target not found:", selectedObjectId);
    toast.error(`Target "${selectedObjectId}" not found on the map. Please ensure it's mapped to a vertex.`);
    return;
  }

  if (!navigation.start) {
    console.error("No starting position set");
    toast.error("Please set your starting location first (Where are you?)");
    return;
  }

  const shortestPath = graph.calculateShortestPath(navigation.start, target.id);
  
  if (!shortestPath || shortestPath.length === 0) {
    console.error("No path found from", navigation.start, "to", target.id);
    toast.error("No route found. The destination might not be connected to the network yet.");
    return;
  }

  // Process path to Manhattan routing with wall avoidance
  const manhattanWaypoints = processPathToManhattan(shortestPath, graphData.vertices);

  // Build path string from waypoints
  const pathString = manhattanWaypoints
    .slice(1)
    .map((point) => `L${point.x} ${point.y}`)
    .join(" ");

  const startVertex = graphData.vertices.find((v) => v.id === navigation.start);
  const navigationRoutePath = document.getElementById("navigation-route");
  if (navigationRoutePath && startVertex && manhattanWaypoints.length > 0) {
    navigationRoutePath.setAttribute(
      "d",
      `M${manhattanWaypoints[0].x} ${manhattanWaypoints[0].y} ${pathString}`
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
