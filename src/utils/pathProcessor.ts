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

  return waypoints;
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
    return [...path1, ...path2.slice(1)];
  }

  // Fallback: use the path with fewer intersections
  return hfIntersections <= vfIntersections ? horizontalFirst : verticalFirst;
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
 */
function findIntermediateWaypoint(
  from: Point,
  to: Point,
  walls: LineSegment[],
  vertices: VertexData[]
): Point | null {
  // Find vertices near the midpoint that might help avoid walls
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  // Find nearest vertices to midpoint
  const nearbyVertices = vertices
    .map((v) => ({
      vertex: v,
      distance: Math.sqrt(
        Math.pow(v.cx - midX, 2) + Math.pow(v.cy - midY, 2)
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5); // Check top 5 nearest

  // Try each nearby vertex as intermediate waypoint
  for (const { vertex } of nearbyVertices) {
    const intermediate: Point = { x: vertex.cx, y: vertex.cy };

    // Check if using this intermediate point avoids walls
    const seg1: LineSegment = { start: from, end: intermediate };
    const seg2: LineSegment = { start: intermediate, end: to };

    const seg1Clear = !walls.some((wall) => segmentsIntersect(seg1, wall));
    const seg2Clear = !walls.some((wall) => segmentsIntersect(seg2, wall));

    if (seg1Clear && seg2Clear) {
      return intermediate;
    }
  }

  return null;
}

/**
 * Export wall segments for use in other modules
 */
export function getWallSegments(): LineSegment[] {
  return extractWallSegments();
}

