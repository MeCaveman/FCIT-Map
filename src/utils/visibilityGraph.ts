import { VertexData, EdgeData } from "@/store/graphData";
import { clickables } from "@/data/clickables";

/**
 * Point interface for 2D coordinates
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Line segment interface
 */
interface LineSegment {
  start: Point;
  end: Point;
}

/**
 * Parse SVG path 'd' attribute to extract line segments (walls)
 * Supports M (moveto), L (lineto), Z (closepath) commands
 */
function parseSVGPath(pathD: string): LineSegment[] {
  const segments: LineSegment[] = [];
  const commands = pathD.match(/[MLZ][^MLZ]*/g);
  
  if (!commands) return segments;

  let currentPoint: Point | null = null;
  let firstPoint: Point | null = null;

  commands.forEach((cmd) => {
    const type = cmd[0];
    const coords = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(parseFloat)
      .filter((n) => !isNaN(n));

    if (type === "M") {
      // Move to - start new subpath
      currentPoint = { x: coords[0], y: coords[1] };
      firstPoint = { ...currentPoint };
    } else if (type === "L" && currentPoint) {
      // Line to - create segment from current point to new point
      const newPoint = { x: coords[0], y: coords[1] };
      segments.push({
        start: { ...currentPoint },
        end: { ...newPoint },
      });
      currentPoint = newPoint;
    } else if (type === "Z" && currentPoint && firstPoint) {
      // Close path - create segment back to first point
      segments.push({
        start: { ...currentPoint },
        end: { ...firstPoint },
      });
      currentPoint = firstPoint;
    }
  });

  return segments;
}

/**
 * Extract all wall segments from clickable room geometries
 */
function extractWallSegments(): LineSegment[] {
  const allWalls: LineSegment[] = [];

  clickables.forEach((clickable) => {
    const roomSegments = parseSVGPath(clickable.d);
    allWalls.push(...roomSegments);
  });

  return allWalls;
}

/**
 * Calculate the cross product of vectors OA and OB
 * Used to determine the orientation of three points
 */
function crossProduct(O: Point, A: Point, B: Point): number {
  return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

/**
 * Check if point P lies on line segment AB
 */
function onSegment(A: Point, P: Point, B: Point): boolean {
  return (
    P.x <= Math.max(A.x, B.x) &&
    P.x >= Math.min(A.x, B.x) &&
    P.y <= Math.max(A.y, B.y) &&
    P.y >= Math.min(A.y, B.y)
  );
}

/**
 * Check if two line segments intersect
 * Uses the orientation method with cross products
 * 
 * @param seg1 First line segment (typically the edge between two waypoints)
 * @param seg2 Second line segment (typically a wall segment)
 * @returns true if segments intersect, false otherwise
 */
function segmentsIntersect(seg1: LineSegment, seg2: LineSegment): boolean {
  const p1 = seg1.start;
  const q1 = seg1.end;
  const p2 = seg2.start;
  const q2 = seg2.end;

  // Calculate orientations
  const o1 = crossProduct(p1, q1, p2);
  const o2 = crossProduct(p1, q1, q2);
  const o3 = crossProduct(p2, q2, p1);
  const o4 = crossProduct(p2, q2, q1);

  // General case: segments intersect if they have different orientations
  if (o1 * o2 < 0 && o3 * o4 < 0) {
    return true;
  }

  // Special cases: collinear points
  const epsilon = 1e-10;
  
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1
  if (Math.abs(o1) < epsilon && onSegment(p1, p2, q1)) return true;

  // p1, q1 and q2 are collinear and q2 lies on segment p1q1
  if (Math.abs(o2) < epsilon && onSegment(p1, q2, q1)) return true;

  // p2, q2 and p1 are collinear and p1 lies on segment p2q2
  if (Math.abs(o3) < epsilon && onSegment(p2, p1, q2)) return true;

  // p2, q2 and q1 are collinear and q1 lies on segment p2q2
  if (Math.abs(o4) < epsilon && onSegment(p2, q1, q2)) return true;

  return false;
}

/**
 * Calculate Euclidean distance between two points
 */
function calculateDistance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Check if a line between two waypoints is visible (doesn't intersect walls)
 * 
 * @param v1 First waypoint
 * @param v2 Second waypoint
 * @param walls Array of wall segments to check against
 * @returns true if the line is visible (no wall intersections), false otherwise
 */
function isLineVisible(
  v1: VertexData,
  v2: VertexData,
  walls: LineSegment[]
): boolean {
  const edgeSegment: LineSegment = {
    start: { x: v1.cx, y: v1.cy },
    end: { x: v2.cx, y: v2.cy },
  };

  // Check if the edge intersects any wall
  for (const wall of walls) {
    if (segmentsIntersect(edgeSegment, wall)) {
      return false; // Edge clips through a wall
    }
  }

  return true; // Edge is clear
}

/**
 * Generate visibility graph edges from waypoints
 * Only creates edges between waypoints that have clear line of sight (no wall intersections)
 * 
 * @param vertices Array of waypoint vertices
 * @param maxDistance Maximum distance to consider for edge creation (optional, for optimization)
 * @returns Array of edges that don't clip through walls
 */
export function generateVisibilityGraph(
  vertices: VertexData[],
  maxDistance: number = Infinity
): EdgeData[] {
  const edges: EdgeData[] = [];
  const walls = extractWallSegments();

  console.log(`🔍 Visibility Graph Generator:`);
  console.log(`  - Vertices: ${vertices.length}`);
  console.log(`  - Wall segments: ${walls.length}`);

  let edgeId = 1;
  let checkedPairs = 0;
  let validEdges = 0;
  let skippedByDistance = 0;
  let skippedByWalls = 0;

  // Check all pairs of vertices
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const v1 = vertices[i];
      const v2 = vertices[j];
      
      checkedPairs++;

      // Calculate distance between vertices
      const distance = calculateDistance(
        { x: v1.cx, y: v1.cy },
        { x: v2.cx, y: v2.cy }
      );

      // Skip if distance exceeds maximum (optimization)
      if (distance > maxDistance) {
        skippedByDistance++;
        continue;
      }

      // Check if line is visible (doesn't intersect walls)
      if (isLineVisible(v1, v2, walls)) {
        edges.push({
          id: `e${edgeId}`,
          from: v1.id,
          to: v2.id,
        });
        edgeId++;
        validEdges++;
      } else {
        skippedByWalls++;
      }
    }
  }

  console.log(`✅ Visibility Graph Results:`);
  console.log(`  - Checked pairs: ${checkedPairs}`);
  console.log(`  - Valid edges: ${validEdges}`);
  console.log(`  - Skipped (distance): ${skippedByDistance}`);
  console.log(`  - Skipped (walls): ${skippedByWalls}`);

  return edges;
}

/**
 * Generate visibility graph with smart distance thresholds
 * Uses adaptive distance based on vertex density to avoid too many long edges
 * 
 * @param vertices Array of waypoint vertices
 * @returns Array of edges that don't clip through walls
 */
export function generateSmartVisibilityGraph(vertices: VertexData[]): EdgeData[] {
  // Calculate average nearest neighbor distance
  let totalNearestDist = 0;
  vertices.forEach((v1) => {
    let minDist = Infinity;
    vertices.forEach((v2) => {
      if (v1.id !== v2.id) {
        const dist = calculateDistance(
          { x: v1.cx, y: v1.cy },
          { x: v2.cx, y: v2.cy }
        );
        minDist = Math.min(minDist, dist);
      }
    });
    totalNearestDist += minDist;
  });

  const avgNearestDist = totalNearestDist / vertices.length;
  // Set max distance to 3x the average nearest neighbor distance
  // This creates a good balance between connectivity and avoiding excessive long edges
  const maxDistance = avgNearestDist * 3;

  console.log(`📊 Smart threshold: ${Math.round(maxDistance)} units (avg nearest: ${Math.round(avgNearestDist)})`);

  return generateVisibilityGraph(vertices, maxDistance);
}

/**
 * Utility: Export edges in format ready for graphData.ts
 */
export function formatEdgesForExport(edges: EdgeData[]): string {
  const formatted = edges.map((edge) => {
    return `    { id: "${edge.id}", from: "${edge.from}", to: "${edge.to}" }`;
  });
  return `edges: [\n${formatted.join(",\n")}\n  ]`;
}
