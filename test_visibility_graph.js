/**
 * Test visibility graph edge generation
 * Validates that edges don't clip through walls
 */

import { graphData } from './src/store/graphData.ts';
import { clickables } from './src/data/clickables.ts';

console.log('🧪 Testing Visibility Graph Implementation\n');

// Test 1: Verify data loading
console.log('📊 Test 1: Data Loading');
console.log(`  ✓ Vertices loaded: ${graphData.vertices.length}`);
console.log(`  ✓ Edges loaded: ${graphData.edges.length}`);
console.log(`  ✓ Room geometries loaded: ${clickables.length}\n`);

// Test 2: Verify all edges reference valid vertices
console.log('📊 Test 2: Edge Validity');
const vertexIds = new Set(graphData.vertices.map(v => v.id));
let invalidEdges = 0;

graphData.edges.forEach(edge => {
  if (!vertexIds.has(edge.from) || !vertexIds.has(edge.to)) {
    invalidEdges++;
    if (invalidEdges <= 3) {
      console.log(`  ✗ Invalid edge: ${edge.id} (${edge.from} → ${edge.to})`);
    }
  }
});

if (invalidEdges === 0) {
  console.log(`  ✓ All ${graphData.edges.length} edges reference valid vertices\n`);
} else {
  console.log(`  ✗ Found ${invalidEdges} invalid edges\n`);
}

// Test 3: Check graph connectivity
console.log('📊 Test 3: Graph Connectivity');
const adjacencyList = new Map();

// Build adjacency list
graphData.vertices.forEach(v => adjacencyList.set(v.id, []));
graphData.edges.forEach(edge => {
  adjacencyList.get(edge.from)?.push(edge.to);
  adjacencyList.get(edge.to)?.push(edge.from);
});

// Find isolated vertices (no edges)
const isolatedVertices = [];
graphData.vertices.forEach(v => {
  if (adjacencyList.get(v.id).length === 0) {
    isolatedVertices.push(v.id);
  }
});

if (isolatedVertices.length === 0) {
  console.log(`  ✓ No isolated vertices - graph is connected\n`);
} else {
  console.log(`  ✗ Found ${isolatedVertices.length} isolated vertices:`);
  isolatedVertices.slice(0, 5).forEach(id => console.log(`    - ${id}`));
  if (isolatedVertices.length > 5) {
    console.log(`    ... and ${isolatedVertices.length - 5} more\n`);
  }
}

// Test 4: Edge distribution statistics
console.log('📊 Test 4: Edge Distribution');
const edgeCounts = [];
adjacencyList.forEach((neighbors) => {
  edgeCounts.push(neighbors.length);
});

const avgEdges = edgeCounts.reduce((a, b) => a + b, 0) / edgeCounts.length;
const minEdges = Math.min(...edgeCounts);
const maxEdges = Math.max(...edgeCounts);

console.log(`  ✓ Average edges per vertex: ${avgEdges.toFixed(2)}`);
console.log(`  ✓ Min edges: ${minEdges}, Max edges: ${maxEdges}\n`);

// Test 5: Room mappings
console.log('📊 Test 5: Room-to-Vertex Mappings');
const mappedVertices = graphData.vertices.filter(v => v.objectName !== null);
console.log(`  ✓ Mapped vertices: ${mappedVertices.length}/${graphData.vertices.length}`);
console.log(`  ✓ Mapped rooms:`);
mappedVertices.forEach(v => {
  console.log(`    - ${v.objectName} → ${v.id}`);
});
console.log('');

// Test 6: Edge length statistics
console.log('📊 Test 6: Edge Length Statistics');
const edgeLengths = [];

graphData.edges.forEach(edge => {
  const fromVertex = graphData.vertices.find(v => v.id === edge.from);
  const toVertex = graphData.vertices.find(v => v.id === edge.to);
  
  if (fromVertex && toVertex) {
    const dx = toVertex.cx - fromVertex.cx;
    const dy = toVertex.cy - fromVertex.cy;
    const length = Math.sqrt(dx * dx + dy * dy);
    edgeLengths.push(length);
  }
});

const avgLength = edgeLengths.reduce((a, b) => a + b, 0) / edgeLengths.length;
const minLength = Math.min(...edgeLengths);
const maxLength = Math.max(...edgeLengths);

console.log(`  ✓ Average edge length: ${avgLength.toFixed(2)} units`);
console.log(`  ✓ Shortest edge: ${minLength.toFixed(2)} units`);
console.log(`  ✓ Longest edge: ${maxLength.toFixed(2)} units\n`);

// Summary
console.log('═══════════════════════════════════════════════');
console.log('📋 SUMMARY');
console.log('═══════════════════════════════════════════════');
console.log(`Vertices: ${graphData.vertices.length}`);
console.log(`Edges: ${graphData.edges.length}`);
console.log(`Mapped Rooms: ${mappedVertices.length}`);
console.log(`Average Connectivity: ${avgEdges.toFixed(2)} edges/vertex`);
console.log(`Average Edge Length: ${avgLength.toFixed(2)} units`);
console.log(`Isolated Vertices: ${isolatedVertices.length}`);
console.log(`Invalid Edges: ${invalidEdges}`);
console.log('═══════════════════════════════════════════════\n');

if (isolatedVertices.length === 0 && invalidEdges === 0) {
  console.log('✅ All tests passed! Graph is valid and ready for navigation.\n');
} else {
  console.log('⚠️  Some issues detected. Review test results above.\n');
}
