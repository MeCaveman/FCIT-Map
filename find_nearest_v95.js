/**
 * Find nearest neighbor for isolated vertex v95
 */

import { graphData } from './src/store/graphData.ts';

const v95 = graphData.vertices.find(v => v.id === 'v95');
console.log(`v95 coordinates: (${v95.cx}, ${v95.cy})\n`);

// Find nearest neighbors
const distances = [];
graphData.vertices.forEach(v => {
  if (v.id !== 'v95') {
    const dx = v.cx - v95.cx;
    const dy = v.cy - v95.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    distances.push({ id: v.id, cx: v.cx, cy: v.cy, distance: dist });
  }
});

distances.sort((a, b) => a.distance - b.distance);

console.log('10 Nearest neighbors to v95:');
distances.slice(0, 10).forEach((d, i) => {
  console.log(`${i + 1}. ${d.id} at (${d.cx}, ${d.cy}) - distance: ${Math.round(d.distance)} units`);
});
