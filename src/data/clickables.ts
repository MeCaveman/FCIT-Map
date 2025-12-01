// Clickable room geometry derived from rooms by ID.
// Keep names, floors, and descriptions in roomsCatalog; this file defines only the shapes (coordinates).
// Auto-generated from BoxySvg.svg rectangles

export interface ClickableGeometry {
  roomId: string; // must match an entry in roomsCatalog
  // geometry: direct SVG path `d` (extend to support rect/polygon if needed)
  d: string;
}

export const clickables: ClickableGeometry[] = [

];

export default clickables;
