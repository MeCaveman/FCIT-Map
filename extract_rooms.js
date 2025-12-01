/**
 * Extract all room/wall rectangles from BoxySvg.svg
 * This will extract rect elements that represent room boundaries
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read BoxySvg.svg
const svgPath = join(__dirname, 'src', 'assets', 'img', 'BoxySvg.svg');
const svgContent = readFileSync(svgPath, 'utf-8');

console.log('🔍 Extracting room boundaries from BoxySvg.svg...\n');

// Extract all rect elements (these are likely room boundaries)
const rectMatches = [...svgContent.matchAll(/<rect[^>]*>/g)];
console.log(`Found ${rectMatches.length} rectangles\n`);

// Extract rect attributes
const rectangles = rectMatches.map((match, index) => {
  const rectStr = match[0];
  
  // Extract attributes using regex
  const idMatch = rectStr.match(/id="([^"]+)"/);
  const xMatch = rectStr.match(/\sx="([^"]+)"/);
  const yMatch = rectStr.match(/\sy="([^"]+)"/);
  const widthMatch = rectStr.match(/width="([^"]+)"/);
  const heightMatch = rectStr.match(/height="([^"]+)"/);
  const fillMatch = rectStr.match(/fill="([^"]+)"/);
  
  return {
    id: idMatch ? idMatch[1] : `rect${index + 1}`,
    x: xMatch ? parseFloat(xMatch[1]) : 0,
    y: yMatch ? parseFloat(yMatch[1]) : 0,
    width: widthMatch ? parseFloat(widthMatch[1]) : 0,
    height: heightMatch ? parseFloat(heightMatch[1]) : 0,
    fill: fillMatch ? fillMatch[1] : 'none'
  };
});

// Filter out tiny rectangles (likely decorative elements)
const MIN_SIZE = 50; // minimum width or height to be considered a room
const rooms = rectangles.filter(r => r.width >= MIN_SIZE && r.height >= MIN_SIZE);

console.log(`Filtered to ${rooms.length} potential room boundaries (size >= ${MIN_SIZE})\n`);

// Convert rectangles to SVG path format (M L L L Z)
// Rectangle corners: top-left, top-right, bottom-right, bottom-left, close
const pathData = rooms.map(rect => {
  const x1 = rect.x;
  const y1 = rect.y;
  const x2 = rect.x + rect.width;
  const y2 = rect.y + rect.height;
  
  const path = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2} L ${x1} ${y2} Z`;
  
  return {
    roomId: rect.id,
    d: path,
    // For debugging
    debugInfo: `(${Math.round(x1)},${Math.round(y1)}) ${Math.round(rect.width)}×${Math.round(rect.height)}`
  };
});

console.log('Sample room paths:');
pathData.slice(0, 5).forEach(p => {
  console.log(`  ${p.roomId}: ${p.debugInfo}`);
});
console.log(`  ... and ${pathData.length - 5} more\n`);

// Generate TypeScript code for clickables.ts
const clickablesCode = pathData.map(p => {
  return `  { roomId: "${p.roomId}", d: "${p.d}" }`;
}).join(',\n');

const output = `// Clickable room geometry derived from rooms by ID.
// Keep names, floors, and descriptions in roomsCatalog; this file defines only the shapes (coordinates).
// Auto-generated from BoxySvg.svg rectangles

export interface ClickableGeometry {
  roomId: string; // must match an entry in roomsCatalog
  // geometry: direct SVG path \`d\` (extend to support rect/polygon if needed)
  d: string;
}

export const clickables: ClickableGeometry[] = [
${clickablesCode}
];

export default clickables;
`;

// Write to clickables.ts
const clickablesPath = join(__dirname, 'src', 'data', 'clickables.ts');
writeFileSync(clickablesPath, output, 'utf-8');

console.log(`✅ Updated ${clickablesPath}`);
console.log(`📊 Generated ${pathData.length} room boundaries`);
console.log('\n🎉 Room extraction complete!');
console.log('\n⚠️  Next steps:');
console.log('   1. Run: npm run regenerate-edges');
console.log('   2. This will regenerate edges with all room walls\n');
