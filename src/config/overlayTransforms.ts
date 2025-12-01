export type FloorId = "F1" | "F2";

export interface OverlayTransform {
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
}

// Adjust these if your overlay coordinates (graphData, clickables) don't align
// with the background SVG viewBox. Defaults keep current behavior.
export const overlayTransforms: Record<FloorId, OverlayTransform> = {
  // BoxySvg.svg uses native SVG coordinates - no scaling needed
  // Vertices are positioned directly in the SVG coordinate space
  F1: { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 },
  F2: { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 },
};

export default overlayTransforms;
