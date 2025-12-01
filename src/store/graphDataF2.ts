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

// F2 Floor Graph Data - Similar structure to F1 but with F2-specific vertices and paths
export const graphDataF2: GraphData = {
  vertices: [],
  edges: [],
};
