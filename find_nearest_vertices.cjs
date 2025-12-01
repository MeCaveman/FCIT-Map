// Find nearest vertex with roomId for each clickable
const fs = require('fs');

// Read graphData
const graphDataContent = fs.readFileSync('./src/store/graphData.ts', 'utf8');
const verticesMatch = graphDataContent.match(/vertices:\s*\[([\s\S]*?)\],\s*edges:/);
const verticesText = verticesMatch[1];

// Parse vertices
const vertices = [];
const vertexRegex = /\{\s*id:\s*"([^"]+)",\s*objectName:\s*("([^"]+)"|null),\s*cx:\s*([\d.]+),\s*cy:\s*([\d.]+)\s*\}/g;
let match;
while ((match = vertexRegex.exec(verticesText)) !== null) {
  const objectName = match[3] || null;
  vertices.push({
    id: match[1],
    objectName: objectName,
    cx: parseFloat(match[4]),
    cy: parseFloat(match[5])
  });
}

console.log(`Found ${vertices.length} vertices`);
console.log(`Vertices with room IDs: ${vertices.filter(v => v.objectName).length}`);

// Read clickables
const clickablesContent = fs.readFileSync('./src/data/clickables.ts', 'utf8');
const clickableRegex = /\{\s*roomId:\s*"([^"]+)",\s*d:\s*"([^"]+)"\s*\}/g;
const clickables = [];
while ((match = clickableRegex.exec(clickablesContent)) !== null) {
  clickables.push({
    roomId: match[1],
    d: match[2]
  });
}

console.log(`Found ${clickables.length} clickables`);

// Calculate centroid of a clickable path
function getPathCentroid(d) {
  const coords = [];
  const parts = d.split(/[MLHVZ\s]+/).filter(x => x);
  
  for (let i = 0; i < parts.length; i += 2) {
    const x = parseFloat(parts[i]);
    const y = parseFloat(parts[i + 1]);
    if (!isNaN(x) && !isNaN(y)) {
      coords.push({ x, y });
    }
  }
  
  if (coords.length === 0) return null;
  
  const sumX = coords.reduce((sum, c) => sum + c.x, 0);
  const sumY = coords.reduce((sum, c) => sum + c.y, 0);
  
  return {
    x: sumX / coords.length,
    y: sumY / coords.length
  };
}

// Calculate distance
function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find nearest vertex with objectName for each clickable
const results = [];
const verticesWithRooms = vertices.filter(v => v.objectName);

clickables.forEach(clickable => {
  // Skip Floor 2 rooms (3-digit IDs)
  if (/^\d{3}$/.test(clickable.roomId)) {
    return;
  }
  
  // Skip placeholder rooms
  if (clickable.roomId.startsWith('placeholder')) {
    return;
  }
  
  const centroid = getPathCentroid(clickable.d);
  if (!centroid) {
    console.log(`Could not calculate centroid for ${clickable.roomId}`);
    return;
  }
  
  let nearestVertex = null;
  let minDistance = Infinity;
  
  verticesWithRooms.forEach(vertex => {
    const d = distance(centroid, { x: vertex.cx, y: vertex.cy });
    if (d < minDistance) {
      minDistance = d;
      nearestVertex = vertex;
    }
  });
  
  if (nearestVertex) {
    results.push({
      clickableRoomId: clickable.roomId,
      nearestVertexId: nearestVertex.id,
      nearestVertexRoomId: nearestVertex.objectName,
      distance: Math.round(minDistance),
      centroid: { x: Math.round(centroid.x), y: Math.round(centroid.y) }
    });
  }
});

// Sort by clickable room ID
results.sort((a, b) => a.clickableRoomId.localeCompare(b.clickableRoomId));

console.log('\n=== Floor 1 Clickables - Nearest Vertices ===\n');
results.forEach(r => {
  console.log(`Clickable: ${r.clickableRoomId.padEnd(15)} → Vertex: ${r.nearestVertexId.padEnd(6)} (${r.nearestVertexRoomId.padEnd(10)}) Distance: ${r.distance.toString().padStart(5)} px`);
});

// Save to file
fs.writeFileSync('./clickable_vertex_mapping.json', JSON.stringify(results, null, 2));
console.log(`\n✓ Results saved to clickable_vertex_mapping.json`);
