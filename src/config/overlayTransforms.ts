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
  // Approximate scaling derived from sample point mapping:
  // bathroom1 center ~ (141.62, 1041.75) -> clicked ~ (1738, 12774)
  // scale ≈ 12.27; start with no translation and adjust if needed
  F1: { scaleX: 12.27, scaleY: 12.27, translateX: 0, translateY: 0 },
  F2: { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 },
};

export default overlayTransforms;
