import { readFileSync, writeFileSync } from 'fs';

// Read the current graphData to get vertices
const graphDataContent = readFileSync('e:/FCITMap/src/store/graphData.ts', 'utf8');

// Extract vertices from the file
const verticesMatch = graphDataContent.match(/vertices: \[([\s\S]*?)\],\s*edges:/);
if (!verticesMatch) {
  console.error('Could not find vertices in graphData.ts');
  process.exit(1);
}

// Parse vertices
const verticesText = verticesMatch[1];
const vertexMatches = [...verticesText.matchAll(/\{\s*id:\s*"(v\d+)",\s*objectName:\s*(\w+|null),\s*cx:\s*([\d.]+),\s*cy:\s*([\d.]+)\s*\}/g)];

const vertices = vertexMatches.map(match => ({
  id: match[1],
  objectName: match[2] === 'null' ? null : match[2],
  cx: parseFloat(match[3]),
  cy: parseFloat(match[4])
}));

console.log(`Found ${vertices.length} vertices`);

// Function to calculate distance between two vertices
function distance(v1, v2) {
  const dx = v1.cx - v2.cx;
  const dy = v1.cy - v2.cy;
  return Math.sqrt(dx * dx + dy * dy);
}

// Group vertices by proximity zones (by Y coordinate primarily, then X)
// This helps us create logical corridor connections
const sortedByY = [...vertices].sort((a, b) => a.cy - b.cy);

// Create edges based on proximity
const edges = [];
const edgeSet = new Set(); // To avoid duplicates
let edgeId = 1;

function addEdge(from, to) {
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  if (!edgeSet.has(key1) && !edgeSet.has(key2)) {
    edges.push({ id: `e${edgeId++}`, from, to });
    edgeSet.add(key1);
  }
}

// Strategy 1: Connect each vertex to its nearest neighbors
vertices.forEach((v, idx) => {
  const distances = vertices
    .map((other, otherIdx) => ({
      vertex: other,
      dist: distance(v, other),
      idx: otherIdx
    }))
    .filter(d => d.idx !== idx && d.dist > 0)
    .sort((a, b) => a.dist - b.dist);
  
  // Connect to 3-5 nearest neighbors (more in dense areas, fewer in sparse)
  const connectionCount = distances[0]?.dist < 100 ? 5 : 3;
  for (let i = 0; i < Math.min(connectionCount, distances.length); i++) {
    addEdge(v.id, distances[i].vertex.id);
  }
});

// Strategy 2: Create horizontal corridors (vertices with similar Y coordinates)
const yTolerance = 50; // Vertices within 50 units vertically are on same corridor
for (let i = 0; i < sortedByY.length; i++) {
  const current = sortedByY[i];
  const corridor = [current];
  
  // Find all vertices in the same horizontal corridor
  for (let j = i + 1; j < sortedByY.length; j++) {
    if (Math.abs(sortedByY[j].cy - current.cy) <= yTolerance) {
      corridor.push(sortedByY[j]);
    } else {
      break;
    }
  }
  
  // Sort corridor by X coordinate and connect sequentially
  if (corridor.length > 1) {
    corridor.sort((a, b) => a.cx - b.cx);
    for (let k = 0; k < corridor.length - 1; k++) {
      // Connect each to the next in the corridor
      addEdge(corridor[k].id, corridor[k + 1].id);
    }
  }
}

// Strategy 3: Create vertical connections (vertices with similar X coordinates)
const sortedByX = [...vertices].sort((a, b) => a.cx - b.cx);
const xTolerance = 50;
for (let i = 0; i < sortedByX.length; i++) {
  const current = sortedByX[i];
  const vertical = [current];
  
  for (let j = i + 1; j < sortedByX.length; j++) {
    if (Math.abs(sortedByX[j].cx - current.cx) <= xTolerance) {
      vertical.push(sortedByX[j]);
    } else {
      break;
    }
  }
  
  if (vertical.length > 1) {
    vertical.sort((a, b) => a.cy - b.cy);
    for (let k = 0; k < vertical.length - 1; k++) {
      addEdge(vertical[k].id, vertical[k + 1].id);
    }
  }
}

console.log(`Generated ${edges.length} edges`);

// Format edges for TypeScript
const edgesCode = edges.map((e, idx) => {
  const comma = idx < edges.length - 1 ? ',' : '';
  return `    { id: "${e.id}", from: "${e.from}", to: "${e.to}" }${comma}`;
}).join('\n');

// Write edges to a file
writeFileSync('e:/FCITMap/generated_edges.txt', `  edges: [\n${edgesCode}\n  ]\n`);

console.log('Edges written to generated_edges.txt');
console.log(`\nEdge statistics:`);
console.log(`- Total edges: ${edges.length}`);
console.log(`- Average connections per vertex: ${(edges.length * 2 / vertices.length).toFixed(2)}`);

// Check connectivity by finding connected components
function findConnectedComponents() {
  const adjacency = new Map();
  vertices.forEach(v => adjacency.set(v.id, []));
  
  edges.forEach(e => {
    adjacency.get(e.from).push(e.to);
    adjacency.get(e.to).push(e.from);
  });
  
  const visited = new Set();
  const components = [];
  
  function dfs(vertexId, component) {
    if (visited.has(vertexId)) return;
    visited.add(vertexId);
    component.push(vertexId);
    
    adjacency.get(vertexId).forEach(neighbor => {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    });
  }
  
  vertices.forEach(v => {
    if (!visited.has(v.id)) {
      const component = [];
      dfs(v.id, component);
      components.push(component);
    }
  });
  
  return components;
}

const components = findConnectedComponents();
console.log(`\nConnectivity analysis:`);
console.log(`- Number of connected components: ${components.length}`);
if (components.length === 1) {
  console.log('✓ All vertices are connected!');
} else {
  console.log('✗ Graph is not fully connected. Component sizes:');
  components.forEach((comp, idx) => {
    console.log(`  Component ${idx + 1}: ${comp.length} vertices`);
    if (comp.length <= 5) {
      console.log(`    Vertices: ${comp.join(', ')}`);
    }
  });
}
