// Script to match clickables to nearest vertices and rooms
const fs = require('fs');

// Parse clickables from clickables.ts
const clickablesContent = fs.readFileSync('./src/data/clickables.ts', 'utf8');
const clickableMatches = [...clickablesContent.matchAll(/{ roomId: "(.*?)", d: "(.*?)" }/g)];
const clickables = clickableMatches.map(match => ({
  roomId: match[1],
  d: match[2]
}));

// Parse vertices from graphData.ts
const graphDataContent = fs.readFileSync('./src/store/graphData.ts', 'utf8');
const vertexMatches = [...graphDataContent.matchAll(/{ id: "(.*?)", objectName: (.*?), cx: ([\d.]+), cy: ([\d.]+) }/g)];
const vertices = vertexMatches.map(match => ({
  id: match[1],
  objectName: match[2] === 'null' ? null : match[2].replace(/"/g, ''),
  cx: parseFloat(match[3]),
  cy: parseFloat(match[4])
}));

// Parse rooms from roomsCatalog.ts
const roomsContent = fs.readFileSync('./src/data/roomsCatalog.ts', 'utf8');
const roomMatches = [...roomsContent.matchAll(/{ id: "(.*?)", name: "(.*?)", floor: "(.*?)", categoryId: "(.*?)"(?:, desc: "(.*?)")?(?:, vertexId: "(.*?)")? }/g)];
const rooms = roomMatches.map(match => ({
  id: match[1],
  name: match[2],
  floor: match[3],
  categoryId: match[4],
  desc: match[5] || '',
  vertexId: match[6] || null
}));

// Function to get center of clickable path
function getClickableCenter(d) {
  const coords = d.match(/[\d.]+/g).map(Number);
  // For rectangle: M x1 y1 H x2 V y2 H x1 V y1 Z
  const x1 = coords[0];
  const y1 = coords[1];
  const x2 = coords[2];
  const y2 = coords[3];
  return {
    cx: (x1 + x2) / 2,
    cy: (y1 + y2) / 2
  };
}

// Function to calculate distance between two points
function distance(p1, p2) {
  return Math.sqrt(Math.pow(p1.cx - p2.cx, 2) + Math.pow(p1.cy - p2.cy, 2));
}

// Match each clickable to nearest vertex
const results = [];
clickables.forEach((clickable, index) => {
  const center = getClickableCenter(clickable.d);
  
  // Find nearest vertex
  let nearestVertex = null;
  let minDistance = Infinity;
  
  vertices.forEach(vertex => {
    const dist = distance(center, vertex);
    if (dist < minDistance) {
      minDistance = dist;
      nearestVertex = vertex;
    }
  });
  
  // Find rooms with this vertexId
  const matchingRooms = rooms.filter(room => room.vertexId === nearestVertex.id);
  
  // If vertex has objectName, try to find room by name
  let matchedRoom = null;
  if (matchingRooms.length > 0) {
    matchedRoom = matchingRooms[0];
  } else if (nearestVertex.objectName) {
    matchedRoom = rooms.find(room => 
      room.name.includes(nearestVertex.objectName) || 
      room.id === nearestVertex.objectName
    );
  }
  
  results.push({
    placeholderId: clickable.roomId,
    clickableCenter: center,
    nearestVertex: nearestVertex.id,
    nearestVertexName: nearestVertex.objectName,
    distance: Math.round(minDistance),
    matchedRoom: matchedRoom ? {
      id: matchedRoom.id,
      name: matchedRoom.name,
      floor: matchedRoom.floor,
      categoryId: matchedRoom.categoryId
    } : null
  });
});

// Print results
console.log('\n=== Clickable to Room Mapping Results ===\n');
results.forEach(result => {
  console.log(`${result.placeholderId}:`);
  console.log(`  Center: (${Math.round(result.clickableCenter.cx)}, ${Math.round(result.clickableCenter.cy)})`);
  console.log(`  Nearest Vertex: ${result.nearestVertex} (${result.nearestVertexName || 'unnamed'}) - Distance: ${result.distance}`);
  if (result.matchedRoom) {
    console.log(`  ✓ Matched Room: ${result.matchedRoom.id} - ${result.matchedRoom.name}`);
  } else {
    console.log(`  ✗ No matching room found`);
  }
  console.log('');
});

// Generate updated clickables array
console.log('\n=== Updated Clickables Array ===\n');
console.log('export const clickables: ClickableGeometry[] = [');
results.forEach((result, index) => {
  const roomId = result.matchedRoom ? result.matchedRoom.id : result.placeholderId;
  const clickable = clickables[index];
  console.log(`  { roomId: "${roomId}", d: "${clickable.d}" },`);
});
console.log('];');

// Save mapping to file
fs.writeFileSync('./clickable_mapping_results.json', JSON.stringify(results, null, 2));
console.log('\n✓ Results saved to clickable_mapping_results.json');
