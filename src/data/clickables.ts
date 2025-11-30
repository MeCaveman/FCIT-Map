// Clickable room geometry derived from rooms by ID.
// Keep names, floors, and descriptions in roomsCatalog; this file defines only the shapes (coordinates).

export interface ClickableGeometry {
  roomId: string; // must match an entry in roomsCatalog
  // geometry: direct SVG path `d` (extend to support rect/polygon if needed)
  d: string;
}

export const clickables: ClickableGeometry[] = [
  // F1 geometry (roomId references roomsCatalog entries)
  { roomId: "15F29-A", d: "M 2215.59 8560.3 L 2206.25 9463.12 L 2038.14 9466.24 L 2035.03 9556.52 L 1328.33 9540.95 L 1331.45 9469.35 L 1210.03 9460.01 L 1197.58 9559.63 L 1129.09 9540.95 L 1147.77 8563.42 L 2215.59 8560.3 Z" },

  // F2 geometry (add as available)
  // { roomId: "f2_bath4", d: "..." },
];

export default clickables;
