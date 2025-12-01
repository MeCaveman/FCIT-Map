import { readFileSync } from 'fs';

// Read the BoxySVG file
const svgContent = readFileSync('e:/FCITMap/src/assets/img/BoxySvg.svg', 'utf8');

// Extract all circle paths from the Vertex group (gray fill)
// Pattern matches: <path d="M X Y C..." style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 25px;"/>
const circlePattern = /path d="M\s+([\d.]+)\s+([\d.]+)\s+[AC][^"]*"\s+style="fill:\s*rgb\(216,\s*216,\s*216\)[^>]*>/g;
const matches = [...svgContent.matchAll(circlePattern)];

console.log(`Found ${matches.length} vertices\n`);

// BoxySVG coordinates are directly usable - they are already in the SVG coordinate space
// We just need to scale them to match the graph coordinate system
const vertices = matches.map((match, index) => {
  const svgX = parseFloat(match[1]);
  const svgY = parseFloat(match[2]);
  
  // Use coordinates directly from SVG (already in correct space)
  const graphX = Math.round(svgX * 100) / 100;
  const graphY = Math.round(svgY * 100) / 100;
  
  return {
    id: `v${index + 1}`,
    objectName: null,
    cx: graphX,
    cy: graphY
  };
});

// Remove exact duplicates (keep first occurrence)
const uniqueVertices = [];
const seen = new Set();

for (const v of vertices) {
  const key = `${v.cx},${v.cy}`;
  if (!seen.has(key)) {
    uniqueVertices.push(v);
    seen.add(key);
  }
}

// Re-assign IDs after deduplication (v1-v211)
const finalVertices = uniqueVertices.map((v, i) => ({
  ...v,
  id: `v${i + 1}`
}));

console.log(`\nAfter removing duplicates: ${uniqueVertices.length} unique vertices`);
console.log(`Using all ${finalVertices.length} vertices\n`);

// Generate the TypeScript code
console.log('  vertices: [');
finalVertices.forEach((v, i) => {
  const comma = i < finalVertices.length - 1 ? ',' : '';
  console.log(`    { id: "${v.id}", objectName: ${v.objectName}, cx: ${v.cx}, cy: ${v.cy} }${comma}`);
});
console.log('  ],');

console.log(`\n\nFirst 5 vertices:`);
console.log(finalVertices.slice(0, 5));
console.log(`\nLast 5 vertices:`);
console.log(finalVertices.slice(-5));
