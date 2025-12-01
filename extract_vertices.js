import { readFileSync } from 'fs';

// Read the SVG file
const svgContent = readFileSync('e:/FCITMap/src/assets/img/EntireF1v2.svg', 'utf8');

// Extract all circle paths with gray fill
const circlePattern = /path d="M\s+([\d.]+)\s+([\d.]+)\s+C[^"]*"\s+style="fill: rgb\(216, 216, 216\)/g;
const matches = [...svgContent.matchAll(circlePattern)];

console.log(`Found ${matches.length} vertices\n`);

// Convert to graph coordinates with BoxySVG offset
// Offset: Raw SVG coords need +1467.86 X and +3792.60 Y to match BoxySVG/map coords
const offsetX = 1467.86;
const offsetY = 3792.60;
const scale = 12.27;

const vertices = matches.map((match, index) => {
  const rawX = parseFloat(match[1]);
  const rawY = parseFloat(match[2]);
  
  // Apply offset to match BoxySVG coordinates
  const svgX = rawX + offsetX;
  const svgY = rawY + offsetY;
  
  // Convert to graph coordinates
  const graphX = Math.round((svgX / scale) * 100) / 100;
  const graphY = Math.round((svgY / scale) * 100) / 100;
  
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
    seen.has(key);
    uniqueVertices.push(v);
    seen.add(key);
  }
}

// Re-assign IDs after deduplication (v1-v110)
const finalVertices = uniqueVertices.slice(0, 110).map((v, i) => ({
  ...v,
  id: `v${i + 1}`
}));

console.log(`\nAfter removing duplicates: ${uniqueVertices.length} unique vertices`);
console.log(`Using first 110 for v1-v110\n`);

// Generate the TypeScript code
console.log('  vertices: [');
finalVertices.forEach((v, i) => {
  const comma = i < 109 ? ',' : '';
  console.log(`    { id: "${v.id}", objectName: ${v.objectName}, cx: ${v.cx}, cy: ${v.cy} }${comma}`);
});
console.log('  ],');

console.log(`\n\nFirst 5 vertices:`);
console.log(finalVertices.slice(0, 5));
console.log(`\nLast 5 vertices:`);
console.log(finalVertices.slice(105, 110));
