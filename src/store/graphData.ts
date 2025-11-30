export interface VertexData {
  id: string;
  objectName: string | null;
  cx: number;
  cy: number;
}

export interface EdgeData {
  id: string;
  from: string;
  to: string;
}

export interface GraphData {
  vertices: VertexData[];
  edges: EdgeData[];
}

// Ensure every edge is bidirectional and all vertices are connected to their neighbors in both directions.
export const graphData: GraphData = {
  vertices: [
    { id: "v1", objectName: null, cx: 666.218, cy: 1030.99 },
    { id: "v2", objectName: null, cx: 666.462, cy: 950.029 },
    { id: "v5", objectName: null, cx: 665.592, cy: 795.222 },
    { id: "v6", objectName: null, cx: 659.958, cy: 699.447 },
    { id: "v7", objectName: "Entrance 2", cx: 449.966, cy: 480.407 },
    { id: "v8", objectName: null, cx: 662.224, cy: 472.784 },
    { id: "v9", objectName: "Entrance 3", cx: 874.482, cy: 472.382 }
  ],
  edges: [
    // v1 <-> v2
    { id: "v1_to_v2", from: "v1", to: "v2" },
    { id: "v2_to_v1", from: "v2", to: "v1" },

    // v2 <-> v5
    { id: "v2_to_v5", from: "v2", to: "v5" },
    { id: "v5_to_v2", from: "v5", to: "v2" },

    // v5 <-> v6
    { id: "v5_to_v6", from: "v5", to: "v6" },
    { id: "v6_to_v5", from: "v6", to: "v5" },

    

    // v7 <-> v8
    { id: "v7_to_v8", from: "v7", to: "v8" },
    { id: "v8_to_v7", from: "v8", to: "v7" },

    // v8 <-> v9
    { id: "v8_to_v9", from: "v8", to: "v9" },
    { id: "v9_to_v8", from: "v9", to: "v8" },

    // v6 <-> v8 (connect v6 directly to v8 for more path options)
    { id: "v6_to_v8", from: "v6", to: "v8" },
    { id: "v8_to_v6", from: "v8", to: "v6" },

    // v5 <-> v8 (connect v5 directly to v8 for more path options)
    { id: "v5_to_v8", from: "v5", to: "v8" },
    { id: "v8_to_v5", from: "v8", to: "v5" },

    // v2 <-> v6 (connect v2 directly to v6 for more path options)
    { id: "v2_to_v6", from: "v2", to: "v6" },
    { id: "v6_to_v2", from: "v6", to: "v2" }
  ],
};