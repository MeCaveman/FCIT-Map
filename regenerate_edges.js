/**
 * Regenerate edges using visibility graph algorithm
 * This script uses the visibility graph generator to create edges
 * that don't clip through room walls
 * 
 * Usage: node regenerate_edges.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read graphData.ts to extract vertices
const graphDataPath = join(__dirname, 'src', 'store', 'graphData.ts');
const graphDataContent = readFileSync(graphDataPath, 'utf-8');

// Extract vertices array from the file
const verticesMatch = graphDataContent.match(/vertices:\s*\[([\s\S]*?)\],\s*edges:/);
if (!verticesMatch) {
  console.error('❌ Could not find vertices array in graphData.ts');
  process.exit(1);
}

// Parse vertices (simplified parsing for this script)
const verticesStr = verticesMatch[1];
const vertexMatches = [...verticesStr.matchAll(/\{\s*id:\s*"([^"]+)",\s*objectName:\s*([^,]+),\s*cx:\s*([\d.]+),\s*cy:\s*([\d.]+)\s*\}/g)];

const vertices = vertexMatches.map(match => ({
  id: match[1],
  objectName: match[2].trim() === 'null' ? null : match[2].replace(/"/g, '').trim(),
  cx: parseFloat(match[3]),
  cy: parseFloat(match[4])
}));

console.log(`📊 Loaded ${vertices.length} vertices from graphData.ts`);

// Read clickables.ts to extract wall segments
const clickablesPath = join(__dirname, 'src', 'data', 'clickables.ts');
const clickablesContent = readFileSync(clickablesPath, 'utf-8');

// Extract clickables array
const clickablesMatch = clickablesContent.match(/export const clickables[^=]*=\s*\[([\s\S]*?)\];/);
if (!clickablesMatch) {
  console.error('❌ Could not find clickables array');
  process.exit(1);
}

const clickablesStr = clickablesMatch[1];
const clickableMatches = [...clickablesStr.matchAll(/\{\s*roomId:\s*"([^"]+)",\s*d:\s*"([^"]+)"\s*\}/g)];

const clickables = clickableMatches.map(match => ({
  roomId: match[1],
  d: match[2]
}));

console.log(`🏢 Loaded ${clickables.length} room geometries`);

// ==================== Visibility Graph Algorithm ====================

function parseSVGPath(pathD) {
  const segments = [];
  const commands = pathD.match(/[MLZ][^MLZ]*/g);
  
  if (!commands) return segments;

  let currentPoint = null;
  let firstPoint = null;

  commands.forEach((cmd) => {
    const type = cmd[0];
    const coords = cmd
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(parseFloat)
      .filter((n) => !isNaN(n));

    if (type === 'M') {
      currentPoint = { x: coords[0], y: coords[1] };
      firstPoint = { ...currentPoint };
    } else if (type === 'L' && currentPoint) {
      const newPoint = { x: coords[0], y: coords[1] };
      segments.push({
        start: { ...currentPoint },
        end: { ...newPoint }
      });
      currentPoint = newPoint;
    } else if (type === 'Z' && currentPoint && firstPoint) {
      segments.push({
        start: { ...currentPoint },
        end: { ...firstPoint }
      });
      currentPoint = firstPoint;
    }
  });

  return segments;
}

function extractWallSegments(clickables) {
  const allWalls = [];
  clickables.forEach((clickable) => {
    const roomSegments = parseSVGPath(clickable.d);
    allWalls.push(...roomSegments);
  });
  return allWalls;
}

function crossProduct(O, A, B) {
  return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

function onSegment(A, P, B) {
  return (
    P.x <= Math.max(A.x, B.x) &&
    P.x >= Math.min(A.x, B.x) &&
    P.y <= Math.max(A.y, B.y) &&
    P.y >= Math.min(A.y, B.y)
  );
}

function segmentsIntersect(seg1, seg2) {
  const p1 = seg1.start;
  const q1 = seg1.end;
  const p2 = seg2.start;
  const q2 = seg2.end;

  const o1 = crossProduct(p1, q1, p2);
  const o2 = crossProduct(p1, q1, q2);
  const o3 = crossProduct(p2, q2, p1);
  const o4 = crossProduct(p2, q2, q1);

  if (o1 * o2 < 0 && o3 * o4 < 0) {
    return true;
  }

  const epsilon = 1e-10;
  
  if (Math.abs(o1) < epsilon && onSegment(p1, p2, q1)) return true;
  if (Math.abs(o2) < epsilon && onSegment(p1, q2, q1)) return true;
  if (Math.abs(o3) < epsilon && onSegment(p2, p1, q2)) return true;
  if (Math.abs(o4) < epsilon && onSegment(p2, q1, q2)) return true;

  return false;
}

function calculateDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function isLineVisible(v1, v2, walls) {
  const edgeSegment = {
    start: { x: v1.cx, y: v1.cy },
    end: { x: v2.cx, y: v2.cy }
  };

  for (const wall of walls) {
    if (segmentsIntersect(edgeSegment, wall)) {
      return false;
    }
  }

  return true;
}

// Calculate average nearest neighbor distance for adaptive threshold
console.log('📐 Calculating distance threshold...');
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
// Balanced threshold: allow connections but prefer grid-like paths
const maxDistance = avgNearestDist * 5; // 5x average - ensures full connectivity across long corridors

console.log(`📊 Average nearest neighbor distance: ${Math.round(avgNearestDist)}`);
console.log(`📏 Maximum edge distance: ${Math.round(maxDistance)}`);

// Extract wall segments
console.log('🧱 Extracting wall segments...');
const walls = extractWallSegments(clickables);
console.log(`✅ Extracted ${walls.length} wall segments`);

// Generate visibility graph
console.log('\n🔍 Generating visibility graph...');
const edges = [];
let edgeId = 1;
let checkedPairs = 0;
let validEdges = 0;
let skippedByDistance = 0;
let skippedByWalls = 0;

const totalPairs = (vertices.length * (vertices.length - 1)) / 2;
let lastProgressPercent = 0;

for (let i = 0; i < vertices.length; i++) {
  for (let j = i + 1; j < vertices.length; j++) {
    const v1 = vertices[i];
    const v2 = vertices[j];
    
    checkedPairs++;

    // Progress indicator
    const progressPercent = Math.floor((checkedPairs / totalPairs) * 100);
    if (progressPercent > lastProgressPercent && progressPercent % 10 === 0) {
      console.log(`  Progress: ${progressPercent}% (${checkedPairs}/${totalPairs} pairs)`);
      lastProgressPercent = progressPercent;
    }

    const dx = v2.cx - v1.cx;
    const dy = v2.cy - v1.cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > maxDistance) {
      skippedByDistance++;
      continue;
    }

    // Calculate angle to check if connection is horizontal, vertical, or diagonal
    const angle = Math.atan2(Math.abs(dy), Math.abs(dx)) * (180 / Math.PI);
    const TOLERANCE = 20; // degrees - slightly relaxed for room entries
    const isHorizontal = angle < TOLERANCE;
    const isVertical = angle > (90 - TOLERANCE);
    const is90Degree = isHorizontal || isVertical;

    // Prefer 90-degree connections, but allow short diagonals for room transitions
    // Long diagonal connections (hallway shortcuts) are not allowed
    const SHORT_DIAGONAL_THRESHOLD = avgNearestDist * 2.2; // Allow short diagonals within ~2.2x nearest neighbor
    const LONG_DISTANCE_THRESHOLD = avgNearestDist * 3; // Long connections must be 90-degree aligned (corridors)
    
    if (!is90Degree && distance > SHORT_DIAGONAL_THRESHOLD) {
      // Diagonal connection that's too long - skip it
      skippedByDistance++;
      continue;
    }
    
    // For longer connections, strongly require 90-degree alignment (grid corridors)
    if (distance > LONG_DISTANCE_THRESHOLD && !is90Degree) {
      skippedByDistance++;
      continue;
    }

    if (isLineVisible(v1, v2, walls)) {
      edges.push({
        id: `e${edgeId}`,
        from: v1.id,
        to: v2.id
      });
      edgeId++;
      validEdges++;
    } else {
      skippedByWalls++;
    }
  }
}

console.log('\n✅ Visibility Graph Results:');
console.log(`  - Total pairs checked: ${checkedPairs}`);
console.log(`  - Valid edges (no wall clipping): ${validEdges}`);
console.log(`  - Skipped (too far): ${skippedByDistance}`);
console.log(`  - Skipped (wall collision): ${skippedByWalls}`);

// Format edges for graphData.ts
const edgesFormatted = edges.map(edge => {
  return `    { id: "${edge.id}", from: "${edge.from}", to: "${edge.to}" }`;
}).join(',\n');

// Read current graphData.ts
const currentContent = readFileSync(graphDataPath, 'utf-8');

// Replace edges array
const updatedContent = currentContent.replace(
  /edges:\s*\[[\s\S]*?\]/,
  `edges: [\n${edgesFormatted}\n  ]`
);

// Write updated content
writeFileSync(graphDataPath, updatedContent, 'utf-8');

console.log(`\n✨ Updated ${graphDataPath}`);
console.log(`📊 Generated ${edges.length} wall-aware edges`);
console.log('\n🎉 Edge regeneration complete!');
