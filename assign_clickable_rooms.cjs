const fs = require('fs');

// Read graphData to get vertices with objectName (room IDs)
const graphDataContent = fs.readFileSync('./src/store/graphData.ts', 'utf8');
const verticesMatch = graphDataContent.match(/vertices: \[([\s\S]*?)\]/);
const verticesStr = verticesMatch[1];

// Parse vertices
const vertices = [];
const lines = verticesStr.split('\n');
for (const line of lines) {
  const match = line.match(/\{ id: "(v\d+)", objectName: "([^"]+)", cx: ([\d.]+), cy: ([\d.]+) \}/);
  if (match) {
    const [, id, roomId, cx, cy] = match;
    vertices.push({
      id,
      roomId,
      cx: parseFloat(cx),
      cy: parseFloat(cy)
    });
  }
}

console.log(`Found ${vertices.length} vertices with room IDs`);

// Read clickables
const clickablesContent = fs.readFileSync('./src/data/clickables.ts', 'utf8');
const clickableMatches = clickablesContent.matchAll(/\{ roomId: "([^"]+)", d: "([^"]+)" \}/g);

const clickables = [];
for (const match of clickableMatches) {
  const [, roomId, path] = match;
  clickables.push({ roomId, path });
}

console.log(`Found ${clickables.length} clickables`);

// Function to calculate centroid from SVG path
function getCentroid(pathD) {
  // Extract coordinates from path
  const coords = [];
  const matches = pathD.matchAll(/([\d.]+)\s+([\d.]+)/g);
  for (const match of matches) {
    coords.push({ x: parseFloat(match[1]), y: parseFloat(match[2]) });
  }
  
  if (coords.length === 0) return { x: 0, y: 0 };
  
  const sumX = coords.reduce((sum, p) => sum + p.x, 0);
  const sumY = coords.reduce((sum, p) => sum + p.y, 0);
  
  return {
    x: sumX / coords.length,
    y: sumY / coords.length
  };
}

// Function to calculate distance
function distance(p1, p2) {
  const dx = p1.x - p2.cx;
  const dy = p1.y - p2.cy;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find nearest vertex for each clickable
const assignments = [];
for (const clickable of clickables) {
  const centroid = getCentroid(clickable.path);
  
  let nearestVertex = null;
  let minDistance = Infinity;
  
  for (const vertex of vertices) {
    const dist = distance(centroid, vertex);
    if (dist < minDistance) {
      minDistance = dist;
      nearestVertex = vertex;
    }
  }
  
  if (nearestVertex) {
    assignments.push({
      clickableId: clickable.roomId,
      currentRoomId: clickable.roomId,
      nearestVertex: nearestVertex.id,
      nearestRoomId: nearestVertex.roomId,
      distance: Math.round(minDistance),
      centroid: { x: Math.round(centroid.x), y: Math.round(centroid.y) }
    });
  }
}

// Sort by clickable room ID
assignments.sort((a, b) => a.clickableId.localeCompare(b.clickableId));

// Output results
console.log('\nClickable Room ID -> Nearest Vertex Room ID Assignments:');
console.log('===========================================================');
for (const assign of assignments) {
  console.log(`${assign.clickableId.padEnd(20)} -> ${assign.nearestRoomId.padEnd(15)} (vertex: ${assign.nearestVertex}, distance: ${assign.distance})`);
}

// Create the replacement mappings
const replacements = assignments
  .filter(a => a.clickableId !== a.nearestRoomId) // Only rooms that need updating
  .map(a => ({
    oldRoomId: a.clickableId,
    newRoomId: a.nearestRoomId
  }));

console.log(`\n\nFound ${replacements.length} clickables that need room ID updates:`);
replacements.forEach(r => {
  console.log(`  ${r.oldRoomId} -> ${r.newRoomId}`);
});

// Write output to file
fs.writeFileSync('./clickable_assignments.json', JSON.stringify(assignments, null, 2));
console.log('\nFull assignment details written to clickable_assignments.json');
