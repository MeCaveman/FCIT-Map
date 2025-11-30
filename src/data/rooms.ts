// Room definitions mapped to vertices
export interface Room {
  uniqueId: string;
  name: string;
  vertexId?: string; // If the room maps directly to a vertex
  description?: string;
}

const rooms: Room[] = [
  // Entrances
  { uniqueId: "E1", name: "Entrance 1", vertexId: "v1", description: "Main entrance" },
  { uniqueId: "Ent1", name: "Entrance 1", vertexId: "v1", description: "Main entrance" },
  { uniqueId: "E2", name: "Entrance 2", vertexId: "v10", description: "Side entrance" },
  { uniqueId: "E3", name: "Entrance 3", vertexId: "v11", description: "Back entrance" },

  // Main Hallways
  { uniqueId: "H1", name: "Main Hallway", vertexId: "v8", description: "Main central hallway" },
  { uniqueId: "H2", name: "Main Hall", vertexId: "v28", description: "Lower main hall" },
  { uniqueId: "H3", name: "Lab Hallway 1", vertexId: "v57", description: "Lab hallway" },

  // Bathrooms
  { uniqueId: "B1", name: "Bathroom 1", vertexId: "v45", description: "Lower left bathroom" },
  { uniqueId: "B2", name: "Bathroom 2", vertexId: "v36", description: "Right bathroom" },
  { uniqueId: "B3", name: "Bathroom 3", vertexId: "v25", description: "Left bathroom" },
  { uniqueId: "B4", name: "Bathroom 4", vertexId: "v31", description: "Upper left bathroom" },

  // Add more rooms as needed based on your facility
];

export default rooms;
