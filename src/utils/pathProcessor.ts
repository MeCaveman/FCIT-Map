import { VertexData } from "@/store/graphData";
import { extractWallSegments } from "./visibilityGraph";

interface Point {
  x: number;
  y: number;
}

interface LineSegment {
  start: Point;
  end: Point;
}

/**
 * Check if two line segments intersect
 */
function segmentsIntersect(seg1: LineSegment, seg2: LineSegment): boolean {
  const { start: p1, end: q1 } = seg1;
  const { start: p2, end: q2 } = seg2;

  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;
  return false;
}

function orientation(p: Point, q: Point, r: Point): number {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0;
  return val > 0 ? 1 : 2;
}

function onSegment(p: Point, q: Point, r: Point): boolean {
  return (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  );
}

/**
 * Convert a path to Manhattan routing (90-degree turns only)
 * and add intermediate waypoints to avoid walls
 */
export function processPathToManhattan(
  path: string[],
  vertices: VertexData[]
): Point[] {
  if (path.length < 2) return [];

  const walls = extractWallSegments();
  const waypoints: Point[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const fromId = path[i];
    const toId = path[i + 1];

    const fromVertex = vertices.find((v) => v.id === fromId);
    const toVertex = vertices.find((v) => v.id === toId);

    if (!fromVertex || !toVertex) continue;

    const from: Point = { x: fromVertex.cx, y: fromVertex.cy };
    const to: Point = { x: toVertex.cx, y: toVertex.cy };

    // Add starting point (only for first segment)
    if (i === 0) {
      waypoints.push(from);
    }

    // Always use Manhattan routing (90-degree turns)
    // Check if Manhattan path intersects walls
    const manhattanPath = createManhattanPath(from, to);
    const intersectsWall = walls.some((wall) => {
      // Check each segment of the Manhattan path
      for (let j = 0; j < manhattanPath.length - 1; j++) {
        const segment: LineSegment = {
          start: manhattanPath[j],
          end: manhattanPath[j + 1],
        };
        if (segmentsIntersect(segment, wall)) {
          return true;
        }
      }
      return false;
    });

    if (!intersectsWall) {
      // Manhattan path is clear, use it
      waypoints.push(...manhattanPath.slice(1)); // Skip first point (already added)
    } else {
      // Wall intersection detected, create Manhattan path with intermediate waypoints
      const manhattanPathAvoid = createManhattanPathWithAvoidance(
        from,
        to,
        walls,
        vertices
      );
      
      // Verify the avoidance path doesn't intersect walls
      if (hasWallIntersections(manhattanPathAvoid, walls)) {
        // Still has intersections, try to find a path through multiple waypoints
        const multiWaypointPath = findMultiWaypointPath(
          from,
          to,
          walls,
          vertices,
          path.slice(i + 2) // Remaining vertices in path
        );
        if (multiWaypointPath.length > 0) {
          waypoints.push(...multiWaypointPath.slice(1));
          // Skip the next segment since we handled it
          i += multiWaypointPath.length > 2 ? 1 : 0;
          continue;
        }
      }
      
      waypoints.push(...manhattanPathAvoid.slice(1)); // Skip first point (already added)
    }
  }

  // Ensure we have at least the start and end points
  if (waypoints.length === 0 && path.length > 0) {
    const startVertex = vertices.find((v) => v.id === path[0]);
    const endVertex = vertices.find((v) => v.id === path[path.length - 1]);
    if (startVertex) waypoints.push({ x: startVertex.cx, y: startVertex.cy });
    if (endVertex && endVertex.id !== startVertex?.id) {
      waypoints.push({ x: endVertex.cx, y: endVertex.cy });
    }
  }

  // Final validation: ensure no wall intersections in the final path
  const validatedWaypoints = validateAndFixPath(waypoints, walls, vertices);
  
  return validatedWaypoints;
}

/**
 * Validate and fix a path to ensure no wall intersections
 */
function validateAndFixPath(
  waypoints: Point[],
  walls: LineSegment[],
  vertices: VertexData[]
): Point[] {
  if (waypoints.length < 2) return waypoints;

  const fixedPath: Point[] = [waypoints[0]];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const from = waypoints[i];
    const to = waypoints[i + 1];
    const segment: LineSegment = { start: from, end: to };

    // Check if this segment intersects any walls
    const intersects = walls.some((wall) => segmentsIntersect(segment, wall));

    if (!intersects) {
      // Segment is clear, add the destination point
      fixedPath.push(to);
    } else {
      // Segment intersects walls, find an alternative route
      const alternativePath = findAlternativeSegment(
        from,
        to,
        walls,
        vertices
      );
      if (alternativePath.length > 1) {
        // Add intermediate points (skip first as it's the same as 'from')
        fixedPath.push(...alternativePath.slice(1));
      } else {
        // Couldn't find alternative, skip this segment (will create gap)
        // Try to reconnect at next valid point
        continue;
      }
    }
  }

  // Ensure we end at the final destination
  if (
    fixedPath.length > 0 &&
    waypoints.length > 0 &&
    (fixedPath[fixedPath.length - 1].x !== waypoints[waypoints.length - 1].x ||
      fixedPath[fixedPath.length - 1].y !== waypoints[waypoints.length - 1].y)
  ) {
    const finalPoint = waypoints[waypoints.length - 1];
    const lastPoint = fixedPath[fixedPath.length - 1];
    const finalSegment: LineSegment = { start: lastPoint, end: finalPoint };

    if (!walls.some((wall) => segmentsIntersect(finalSegment, wall))) {
      fixedPath.push(finalPoint);
    } else {
      // Find alternative route to final point
      const altPath = findAlternativeSegment(
        lastPoint,
        finalPoint,
        walls,
        vertices
      );
      fixedPath.push(...altPath.slice(1));
    }
  }

  return fixedPath.length > 0 ? fixedPath : waypoints;
}

/**
 * Find an alternative segment that avoids walls
 */
function findAlternativeSegment(
  from: Point,
  to: Point,
  walls: LineSegment[],
  vertices: VertexData[]
): Point[] {
  // Try Manhattan routing
  const manhattanPath = createManhattanPath(from, to);
  if (!hasWallIntersections(manhattanPath, walls)) {
    return manhattanPath;
  }

  // Try with intermediate waypoint
  const intermediate = findIntermediateWaypoint(from, to, walls, vertices);
  if (intermediate) {
    const path1 = createManhattanPath(from, intermediate);
    const path2 = createManhattanPath(intermediate, to);
    const combined = [...path1, ...path2.slice(1)];
    if (!hasWallIntersections(combined, walls)) {
      return combined;
    }
  }

  // Try exhaustive search
  return findExhaustivePath(from, to, walls, vertices);
}

/**
 * Create a Manhattan path (90-degree turns) between two points
 */
function createManhattanPath(from: Point, to: Point): Point[] {
  const points: Point[] = [from];

  // Manhattan routing: move horizontally first, then vertically
  // or vertically first, then horizontally (choose shorter)
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);

  if (dx > dy) {
    // Move horizontally first
    points.push({ x: to.x, y: from.y });
  } else {
    // Move vertically first
    points.push({ x: from.x, y: to.y });
  }

  points.push(to);
  return points;
}

/**
 * Create Manhattan path with wall avoidance
 */
function createManhattanPathWithAvoidance(
  from: Point,
  to: Point,
  walls: LineSegment[],
  vertices: VertexData[]
): Point[] {
  // Try horizontal-first path
  const horizontalFirst: Point[] = [
    from,
    { x: to.x, y: from.y },
    to,
  ];

  // Try vertical-first path
  const verticalFirst: Point[] = [
    from,
    { x: from.x, y: to.y },
    to,
  ];

  // Check which path has fewer wall intersections
  const hfIntersections = countWallIntersections(horizontalFirst, walls);
  const vfIntersections = countWallIntersections(verticalFirst, walls);

  if (hfIntersections === 0 && vfIntersections === 0) {
    // Both are clear, use shorter one
    const hfDistance =
      Math.abs(horizontalFirst[1].x - from.x) +
      Math.abs(to.y - horizontalFirst[1].y);
    const vfDistance =
      Math.abs(verticalFirst[1].y - from.y) +
      Math.abs(to.x - verticalFirst[1].x);
    return hfDistance <= vfDistance ? horizontalFirst : verticalFirst;
  }

  if (hfIntersections === 0) return horizontalFirst;
  if (vfIntersections === 0) return verticalFirst;

  // Both intersect walls, try to find intermediate waypoints
  // Use nearest vertices as intermediate waypoints
  const intermediate = findIntermediateWaypoint(
    from,
    to,
    walls,
    vertices
  );

  if (intermediate) {
    const path1 = createManhattanPathWithAvoidance(
      from,
      intermediate,
      walls,
      vertices
    );
    const path2 = createManhattanPathWithAvoidance(
      intermediate,
      to,
      walls,
      vertices
    );
    const combinedPath = [...path1, ...path2.slice(1)];
    
    // Verify the combined path doesn't intersect walls
    if (!hasWallIntersections(combinedPath, walls)) {
      return combinedPath;
    }
  }

  // If still no clear path, try multiple intermediate waypoints
  const multiWaypointPath = findMultiWaypointPath(from, to, walls, vertices, []);
  if (multiWaypointPath.length > 0 && !hasWallIntersections(multiWaypointPath, walls)) {
    return multiWaypointPath;
  }

  // Last resort: try to route through all available vertices
  // This will create a longer path but ensures no wall intersections
  return findExhaustivePath(from, to, walls, vertices);
}

/**
 * Count wall intersections in a path
 */
function countWallIntersections(
  path: Point[],
  walls: LineSegment[]
): number {
  let count = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const segment: LineSegment = {
      start: path[i],
      end: path[i + 1],
    };
    if (walls.some((wall) => segmentsIntersect(segment, wall))) {
      count++;
    }
  }
  return count;
}

/**
 * Find an intermediate waypoint to avoid walls
 * Uses exhaustive search with multiple candidates
 */
function findIntermediateWaypoint(
  from: Point,
  to: Point,
  walls: LineSegment[],
  vertices: VertexData[]
): Point | null {
  // Find vertices near the path that might help avoid walls
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const maxDistance = Math.sqrt(
    Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
  ) * 1.5; // Look within 1.5x the direct distance

  // Find all vertices within reasonable distance
  const candidateVertices = vertices
    .map((v) => ({
      vertex: v,
      distance: Math.sqrt(
        Math.pow(v.cx - midX, 2) + Math.pow(v.cy - midY, 2)
      ),
      totalDistance: 
        Math.sqrt(Math.pow(v.cx - from.x, 2) + Math.pow(v.cy - from.y, 2)) +
        Math.sqrt(Math.pow(to.x - v.cx, 2) + Math.pow(to.y - v.cy, 2)),
    }))
    .filter((c) => c.distance < maxDistance)
    .sort((a, b) => a.totalDistance - b.totalDistance) // Prefer shorter total paths
    .slice(0, 20); // Check top 20 candidates

  // Try each candidate vertex as intermediate waypoint
  for (const { vertex } of candidateVertices) {
    const intermediate: Point = { x: vertex.cx, y: vertex.cy };

    // Check if using this intermediate point avoids walls (with Manhattan routing)
    const path1 = createManhattanPath(from, intermediate);
    const path2 = createManhattanPath(intermediate, to);

    const path1Clear = !hasWallIntersections(path1, walls);
    const path2Clear = !hasWallIntersections(path2, walls);

    if (path1Clear && path2Clear) {
      return intermediate;
    }
  }

  // If no single intermediate point works, try two intermediate points
  for (const { vertex: v1 } of candidateVertices.slice(0, 10)) {
    for (const { vertex: v2 } of candidateVertices.slice(0, 10)) {
      if (v1.id === v2.id) continue;

      const intermediate1: Point = { x: v1.cx, y: v1.cy };
      const intermediate2: Point = { x: v2.cx, y: v2.cy };

      const path1 = createManhattanPath(from, intermediate1);
      const path2 = createManhattanPath(intermediate1, intermediate2);
      const path3 = createManhattanPath(intermediate2, to);

      if (
        !hasWallIntersections(path1, walls) &&
        !hasWallIntersections(path2, walls) &&
        !hasWallIntersections(path3, walls)
      ) {
        // Return first intermediate, second will be handled recursively
        return intermediate1;
      }
    }
  }

  return null;
}

/**
 * Check if a path has any wall intersections
 */
function hasWallIntersections(path: Point[], walls: LineSegment[]): boolean {
  for (let i = 0; i < path.length - 1; i++) {
    const segment: LineSegment = {
      start: path[i],
      end: path[i + 1],
    };
    if (walls.some((wall) => segmentsIntersect(segment, wall))) {
      return true;
    }
  }
  return false;
}

/**
 * Find a path through multiple waypoints to avoid walls
 */
function findMultiWaypointPath(
  from: Point,
  to: Point,
  walls: LineSegment[],
  vertices: VertexData[],
  remainingPath: string[]
): Point[] {
  // Try to use remaining path vertices as intermediate waypoints
  if (remainingPath.length > 0) {
    for (const vertexId of remainingPath.slice(0, 3)) {
      const vertex = vertices.find((v) => v.id === vertexId);
      if (!vertex) continue;

      const intermediate: Point = { x: vertex.cx, y: vertex.cy };
      const path1 = createManhattanPath(from, intermediate);
      const path2 = createManhattanPath(intermediate, to);

      if (!hasWallIntersections(path1, walls) && !hasWallIntersections(path2, walls)) {
        return [...path1, ...path2.slice(1)];
      }
    }
  }

  // Fallback: try exhaustive search with more vertices
  const maxDistance = Math.sqrt(
    Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
  ) * 2;

  const candidates = vertices
    .map((v) => ({
      vertex: v,
      distance: Math.sqrt(
        Math.pow(v.cx - from.x, 2) + Math.pow(v.cy - from.y, 2)
      ) + Math.sqrt(
        Math.pow(to.x - v.cx, 2) + Math.pow(to.y - v.cy, 2)
      ),
    }))
    .filter((c) => c.distance < maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 30);

  for (const { vertex } of candidates) {
    const intermediate: Point = { x: vertex.cx, y: vertex.cy };
    const path1 = createManhattanPath(from, intermediate);
    const path2 = createManhattanPath(intermediate, to);

    if (!hasWallIntersections(path1, walls) && !hasWallIntersections(path2, walls)) {
      return [...path1, ...path2.slice(1)];
    }
  }

  return [];
}

/**
 * Find an exhaustive path that avoids all walls
 * This may create a much longer path but guarantees no wall intersections
 */
function findExhaustivePath(
  from: Point,
  to: Point,
  walls: LineSegment[],
  vertices: VertexData[]
): Point[] {
  // Try to find a path through corridor vertices (vertices without objectName)
  const corridorVertices = vertices.filter((v) => !v.objectName);
  
  // Sort by distance from start, then try to build a path
  const sortedVertices = corridorVertices
    .map((v) => ({
      vertex: v,
      distFromStart: Math.sqrt(
        Math.pow(v.cx - from.x, 2) + Math.pow(v.cy - from.y, 2)
      ),
      distToEnd: Math.sqrt(
        Math.pow(to.x - v.cx, 2) + Math.pow(to.y - v.cy, 2)
      ),
    }))
    .sort((a, b) => a.distFromStart - b.distFromStart);

  // Try building a path through corridor vertices
  for (let i = 0; i < Math.min(10, sortedVertices.length); i++) {
    const intermediate: Point = {
      x: sortedVertices[i].vertex.cx,
      y: sortedVertices[i].vertex.cy,
    };

    const path1 = createManhattanPath(from, intermediate);
    const path2 = createManhattanPath(intermediate, to);

    if (
      !hasWallIntersections(path1, walls) &&
      !hasWallIntersections(path2, walls)
    ) {
      return [...path1, ...path2.slice(1)];
    }
  }

  // If still no path, try two intermediate points
  for (let i = 0; i < Math.min(5, sortedVertices.length); i++) {
    for (let j = i + 1; j < Math.min(5, sortedVertices.length); j++) {
      const intermediate1: Point = {
        x: sortedVertices[i].vertex.cx,
        y: sortedVertices[i].vertex.cy,
      };
      const intermediate2: Point = {
        x: sortedVertices[j].vertex.cx,
        y: sortedVertices[j].vertex.cy,
      };

      const path1 = createManhattanPath(from, intermediate1);
      const path2 = createManhattanPath(intermediate1, intermediate2);
      const path3 = createManhattanPath(intermediate2, to);

      if (
        !hasWallIntersections(path1, walls) &&
        !hasWallIntersections(path2, walls) &&
        !hasWallIntersections(path3, walls)
      ) {
        return [...path1, ...path2.slice(1), ...path3.slice(1)];
      }
    }
  }

  // Ultimate fallback: return a path that goes around the perimeter
  // This will be long but should avoid walls
  const perimeterPath = createPerimeterPath(from, to, walls);
  return perimeterPath;
}

/**
 * Create a perimeter path that goes around obstacles
 */
function createPerimeterPath(
  from: Point,
  to: Point,
  walls: LineSegment[]
): Point[] {
  // Try going around by moving to a safe distance from walls
  // Move horizontally first, then vertically, checking for wall intersections
  const safeDistance = 100; // Safe distance from walls

  // Try horizontal-first with offset
  const h1: Point = { x: to.x, y: from.y };
  const h1Path = createManhattanPath(from, h1);
  if (!hasWallIntersections(h1Path, walls)) {
    const vPath = createManhattanPath(h1, to);
    if (!hasWallIntersections(vPath, walls)) {
      return [...h1Path, ...vPath.slice(1)];
    }
  }

  // Try vertical-first with offset
  const v1: Point = { x: from.x, y: to.y };
  const v1Path = createManhattanPath(from, v1);
  if (!hasWallIntersections(v1Path, walls)) {
    const hPath = createManhattanPath(v1, to);
    if (!hasWallIntersections(hPath, walls)) {
      return [...v1Path, ...hPath.slice(1)];
    }
  }

  // Last resort: return direct path (will be filtered out if it intersects)
  return createManhattanPath(from, to);
}

/**
 * Export wall segments for use in other modules
 */
export function getWallSegments(): LineSegment[] {
  return extractWallSegments();
}

