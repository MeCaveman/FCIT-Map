/**
 * Test path from entrance to bathroom
 */

import { graphData } from './src/store/graphData.ts';

console.log('Testing path from Entrance (v1) to Bathroom (v33 = 15F07)\n');

// Check if v1 and v33 exist
const v1 = graphData.vertices.find(v => v.id === 'v1');
const v33 = graphData.vertices.find(v => v.id === 'v33');

console.log(`v1 (Entrance): ${v1 ? `(${v1.cx}, ${v1.cy})` : 'NOT FOUND'}`);
console.log(`v33 (Bathroom 15F07): ${v33 ? `(${v33.cx}, ${v33.cy})` : 'NOT FOUND'}`);
console.log('');

// Check edges from v1
const v1Edges = graphData.edges.filter(e => e.from === 'v1' || e.to === 'v1');
console.log(`Edges connected to v1: ${v1Edges.length}`);
v1Edges.forEach(e => console.log(`  ${e.id}: ${e.from} → ${e.to}`));
console.log('');

// Check edges from v33
const v33Edges = graphData.edges.filter(e => e.from === 'v33' || e.to === 'v33');
console.log(`Edges connected to v33: ${v33Edges.length}`);
v33Edges.forEach(e => console.log(`  ${e.id}: ${e.from} → ${e.to}`));
console.log('');

// Try to find a path manually by checking connectivity
function findPath(start, end, maxDepth = 10) {
  const visited = new Set();
  const queue = [[start]];
  
  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    
    if (current === end) {
      return path;
    }
    
    if (path.length > maxDepth) continue;
    if (visited.has(current)) continue;
    visited.add(current);
    
    // Find neighbors
    const neighbors = graphData.edges
      .filter(e => e.from === current || e.to === current)
      .map(e => e.from === current ? e.to : e.from);
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push([...path, neighbor]);
      }
    }
  }
  
  return null;
}

const path = findPath('v1', 'v33');
if (path) {
  console.log(`✅ Path found (${path.length} steps):`);
  console.log(`   ${path.join(' → ')}`);
} else {
  console.log(`❌ No path found between v1 and v33`);
}
