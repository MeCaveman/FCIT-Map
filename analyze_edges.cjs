const fs = require('fs');

// Read graphData.ts
const graphDataContent = fs.readFileSync('src/store/graphData.ts', 'utf-8');

// Extract vertices
const vertexPattern = /\{\s*id:\s*"(v\d+)",\s*objectName:\s*("[\w-]+"|null),\s*cx:\s*([\d.]+),\s*cy:\s*([\d.]+)\s*\}/g;
const vertices = [];
let match;

while ((match = vertexPattern.exec(graphDataContent)) !== null) {
  vertices.push({
    id: match[1],
    objectName: match[2] === 'null' ? null : match[2].replace(/"/g, ''),
    cx: parseFloat(match[3]),
    cy: parseFloat(match[4])
  });
}

// Extract edges
const edgePattern = /\{\s*id:\s*"(e\d+)",\s*from:\s*"(v\d+)",\s*to:\s*"(v\d+)"\s*\}/g;
const edges = [];

while ((match = edgePattern.exec(graphDataContent)) !== null) {
  edges.push({
    id: match[1],
    from: match[2],
    to: match[3]
  });
}

console.log(`Found ${vertices.length} vertices and ${edges.length} edges`);

// Identify problematic edges - those that cross large distances diagonally
const problematicEdges = [];

edges.forEach(edge => {
  const fromVertex = vertices.find(v => v.id === edge.from);
  const toVertex = vertices.find(v => v.id === edge.to);
  
  if (fromVertex && toVertex) {
    const dx = Math.abs(toVertex.cx - fromVertex.cx);
    const dy = Math.abs(toVertex.cy - fromVertex.cy);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If edge is diagonal (both dx and dy are significant) and long
    if (dx > 50 && dy > 50 && distance > 100) {
      problematicEdges.push({
        ...edge,
        from_name: fromVertex.objectName || fromVertex.id,
        to_name: toVertex.objectName || toVertex.id,
        distance: Math.round(distance),
        dx: Math.round(dx),
        dy: Math.round(dy)
      });
    }
  }
});

console.log(`\nFound ${problematicEdges.length} potentially problematic diagonal edges:`);
problematicEdges
  .sort((a, b) => b.distance - a.distance)
  .slice(0, 50)
  .forEach(edge => {
    console.log(`${edge.id}: ${edge.from} (${edge.from_name}) → ${edge.to} (${edge.to_name}) - distance: ${edge.distance}, dx: ${edge.dx}, dy: ${edge.dy}`);
  });

// Save to file
fs.writeFileSync('problematic_edges.txt', 
  problematicEdges
    .sort((a, b) => b.distance - a.distance)
    .map(e => `${e.id}: ${e.from} → ${e.to} (${e.from_name} → ${e.to_name}) - dist: ${e.distance}`)
    .join('\n')
);

console.log(`\nProblematic edges saved to problematic_edges.txt`);
