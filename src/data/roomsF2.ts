// Room definitions for F2 floor mapped to vertices
export interface Room {
  uniqueId: string;
  name: string;
  vertexId?: string; // If the room maps directly to a vertex
  description?: string;
}

const roomsF2: Room[] = [
  // Entrances
  { uniqueId: "F2_E1", name: "Entrance 1", vertexId: "f2_v1", description: "Main entrance - F2" },
  { uniqueId: "F2_E2", name: "Entrance 2", vertexId: "f2_v10", description: "Side entrance - F2" },
  { uniqueId: "F2_E3", name: "Entrance 3", vertexId: "f2_v11", description: "Back entrance - F2" },

  // Main Hallways
  { uniqueId: "F2_H1", name: "Main Hallway", vertexId: "f2_v8", description: "Main central hallway - F2" },
  { uniqueId: "F2_H2", name: "Main Hall", vertexId: "f2_v28", description: "Lower main hall - F2" },
  { uniqueId: "F2_H3", name: "Lab Hallway 1", vertexId: "f2_v57", description: "Lab hallway - F2" },

  // Bathrooms
  { uniqueId: "F2_B1", name: "Bathroom 1", vertexId: "f2_v45", description: "Lower left bathroom - F2" },
  { uniqueId: "F2_B2", name: "Bathroom 2", vertexId: "f2_v36", description: "Right bathroom - F2" },
  { uniqueId: "F2_B3", name: "Bathroom 3", vertexId: "f2_v25", description: "Left bathroom - F2" },
  { uniqueId: "F2_B4", name: "Bathroom 4", vertexId: "f2_v31", description: "Upper left bathroom - F2" },

  // Add more rooms as needed based on your F2 facility layout
];

export default roomsF2;
