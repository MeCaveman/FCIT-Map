// Central room catalog: id, name, floor, category, optional description
// Add/edit your rooms here — Sidebar/SearchBar will reflect floors when available.
export type FloorId = "F1" | "F2";

export interface RoomRecord {
  id: string; // stable ID used by backend/db
  name: string; // display name (should match SVG clickable id for consistency)
  floor: FloorId; // "F1" | "F2"
  categoryId: string; // maps to categories
  desc?: string;
}

export const roomsCatalog: RoomRecord[] = [
  // F1 examples (aligning with db.json names and categories)
{ id: "15E36", name: "Bathroom - 15E36", floor: "F1", categoryId: "Bathroom", desc: "Bathroom" },
{ id: "15I04-A", name: "Bathroom - 15I04-A", floor: "F1", categoryId: "Bathroom", desc: "Bathroom" },
{ id: "15I04-B", name: "Bathroom - 15I04-B", floor: "F1", categoryId: "Bathroom", desc: "Bathroom" },
{ id: "15F22", name: "Bathroom - 15F22", floor: "F1", categoryId: "Bathroom", desc: "Bathroom" },

{ id: "15F32", name: "Electrical room - 15F32", floor: "F1", categoryId: "Facilities", desc: "Electrical room" },
{ id: "15FI05", name: "Lockers - 15FI05", floor: "F1", categoryId: "Facilities", desc: "Lockers" },
{ id: "15F34", name: "Lockers - 15F34", floor: "F1", categoryId: "Facilities", desc: "Lockers" },
{ id: "15F27", name: "Server - 15F27", floor: "F1", categoryId: "Facilities", desc: "Server room" },
{ id: "15F26", name: "Utilities - 15F26", floor: "F1", categoryId: "Facilities", desc: "Utilities room" },
{ id: "15FS03", name: "Stair - 15FS03", floor: "F1", categoryId: "Facilities", desc: "Staircase" },
{ id: "15F23", name: "Janitor - 15F23", floor: "F1", categoryId: "Facilities", desc: "Janitor room" },
{ id: "15F21", name: "Electronic library - 15F21", floor: "F1", categoryId: "Facilities", desc: "Electronic library" },
{ id: "15F33", name: "Seminar - 15F33", floor: "F1", categoryId: "Facilities", desc: "Seminar room" },
{ id: "15FI6", name: "Lockers - 15FI6", floor: "F1", categoryId: "Facilities", desc: "Lockers" },
{ id: "15F15", name: "Lockers - 15F15", floor: "F1", categoryId: "Facilities", desc: "Lockers" },

{ id: "15F30-A", name: "L1-11 (first door) - 15F30-A", floor: "F1", categoryId: "Labs", desc: "Lab L1-11 first entrance" },
{ id: "15F30-B", name: "L1-11 (second door) - 15F30-B", floor: "F1", categoryId: "Labs", desc: "Lab L1-11 second entrance" },
{ id: "v1", name: "v1", floor: "F1", categoryId: "Other", desc: "Position v1" },
{ id: "15F29-A", name: "L1-10 (first door) - 15F29-A", floor: "F1", categoryId: "Labs", desc: "Lab L1-10 first entrance" },
{ id: "15F29-B", name: "L1-10 (second door) - 15F29-B", floor: "F1", categoryId: "Labs", desc: "Lab L1-10 second entrance" },
{ id: "15F20", name: "L1-9 - 15F20", floor: "F1", categoryId: "Labs", desc: "Lab L1-9" },
{ id: "15F19", name: "L1-8 - 15F19", floor: "F1", categoryId: "Labs", desc: "Lab L1-8" },
{ id: "15F18", name: "L1-7 - 15F18", floor: "F1", categoryId: "Labs", desc: "Lab L1-7" },
{ id: "15F17", name: "L1-6 - 15F17", floor: "F1", categoryId: "Labs", desc: "Lab L1-6" },

{ id: "15FS04-A", name: "Stair - 15FS04-A", floor: "F1", categoryId: "Other", desc: "Staircase" },
{ id: "15FS04-B", name: "Stair - 15FS04-B", floor: "F1", categoryId: "Other", desc: "Staircase" },
{ id: "Ent1", name: "Entrance 1 - Ent1", floor: "F1", categoryId: "Other", desc: "Entrance" },


  // F2 examples (duplicate names are allowed across floors if IDs differ)
  // Adjust IDs if your backend distinguishes floors per object; names can be same across floors.
  { id: "f2_e1", name: "Entrance 1 - f2_e1", floor: "F2", categoryId: "Other", desc: "Main entrance - F2" },
  { id: "f2_e2", name: "Entrance 2 - f2_e2", floor: "F2", categoryId: "Other", desc: "Side entrance - F2" },
  { id: "f2_e3", name: "Entrance 3 - f2_e3", floor: "F2", categoryId: "Other", desc: "Back entrance - F2" },
  { id: "f2_mainhall", name: "Main Hall - f2_mainhall", floor: "F2", categoryId: "Other", desc: "Lower main hall - F2" },
  { id: "f2_mainhallway", name: "Main Hallway - f2_mainhallway", floor: "F2", categoryId: "Other", desc: "Main central hallway - F2" },
  { id: "f2_labhallway1", name: "Lab Hallway 1 - f2_labhallway1", floor: "F2", categoryId: "Lab", desc: "Lab hallway - F2" },
  { id: "f2_bath1", name: "Bathroom 1 - f2_bath1", floor: "F2", categoryId: "Bathroom", desc: "Lower left bathroom - F2" },
  { id: "f2_bath2", name: "Bathroom 2 - f2_bath2", floor: "F2", categoryId: "Bathroom", desc: "Right bathroom - F2" },
  { id: "f2_bath3", name: "Bathroom 3 - f2_bath3", floor: "F2", categoryId: "Bathroom", desc: "Left bathroom - F2" },
  { id: "f2_bath4", name: "Bathroom 4 - f2_bath4", floor: "F2", categoryId: "Bathroom", desc: "Upper left bathroom - F2" },
];

export default roomsCatalog;
