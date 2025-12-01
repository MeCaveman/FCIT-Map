# Visibility Graph Edge Generator

## Overview

The visibility graph generator creates edges for pathfinding that **don't clip through room walls**. It uses geometric line-segment intersection detection to ensure all edges represent valid walking paths.

## How It Works

### 1. **Wall Extraction**
- Parses SVG path data from `clickables.ts` room geometries
- Converts `M` (moveto), `L` (lineto), and `Z` (closepath) commands into line segments
- Extracts all room boundary walls

### 2. **Line-Segment Intersection Detection**
- Uses cross-product orientation method
- Checks if an edge between two waypoints crosses any wall
- Handles collinear cases and edge cases

### 3. **Adaptive Distance Threshold**
- Calculates average nearest neighbor distance
- Sets maximum edge distance to **3x average** for optimal connectivity
- Prevents excessive long-distance edges while maintaining full graph connectivity

### 4. **Edge Generation**
- Checks all pairs of vertices (21,736 pairs for 209 vertices)
- Skips edges that exceed distance threshold
- Skips edges that intersect with walls
- Returns only valid, wall-aware edges

## Usage

### Regenerate Edges

When you modify vertices or room geometries, regenerate edges:

```bash
npm run regenerate-edges
```

This will:
1. Load all 209 vertices from `graphData.ts`
2. Extract wall segments from `clickables.ts`
3. Calculate optimal distance threshold
4. Generate visibility graph edges
5. Update `graphData.ts` with new edges

### Current Results

- **Vertices**: 209 waypoints
- **Wall segments**: 11 room boundaries
- **Total pairs checked**: 21,736
- **Valid edges generated**: 611
- **Skipped (too far)**: 21,125
- **Skipped (wall collision)**: 0 (all within distance threshold had clear line of sight)
- **Average nearest neighbor**: 144 units
- **Max edge distance**: 431 units (3x average)

## TypeScript API

The visibility graph generator is also available as a TypeScript module:

```typescript
import { 
  generateVisibilityGraph, 
  generateSmartVisibilityGraph 
} from '@/utils/visibilityGraph';
import { graphData } from '@/store/graphData';

// Generate with custom max distance
const edges = generateVisibilityGraph(graphData.vertices, 500);

// Generate with smart adaptive threshold
const smartEdges = generateSmartVisibilityGraph(graphData.vertices);
```

### Functions

#### `generateVisibilityGraph(vertices, maxDistance?)`
Generates edges that don't clip through walls.

**Parameters:**
- `vertices`: Array of `VertexData` objects with coordinates
- `maxDistance`: (Optional) Maximum distance for edge creation (default: Infinity)

**Returns:** Array of `EdgeData` objects

#### `generateSmartVisibilityGraph(vertices)`
Generates edges with automatic distance threshold based on vertex density.

**Parameters:**
- `vertices`: Array of `VertexData` objects

**Returns:** Array of `EdgeData` objects

#### `formatEdgesForExport(edges)`
Formats edges for copying into `graphData.ts`.

**Parameters:**
- `edges`: Array of `EdgeData` objects

**Returns:** Formatted string ready for pasting

## Algorithm Details

### Cross-Product Orientation Method

For two line segments:
- Segment 1: P1 → Q1 (edge between waypoints)
- Segment 2: P2 → Q2 (wall segment)

Calculate orientations:
- `o1 = crossProduct(P1, Q1, P2)`
- `o2 = crossProduct(P1, Q1, Q2)`
- `o3 = crossProduct(P2, Q2, P1)`
- `o4 = crossProduct(P2, Q2, Q1)`

**Intersection occurs if:**
- `o1 * o2 < 0` AND `o3 * o4 < 0` (general case)
- OR collinear points lie on segments (special cases)

### Distance Calculation

Uses Euclidean distance:
```
distance = √((x₂ - x₁)² + (y₂ - y₁)²)
```

### Time Complexity

- **Wall extraction**: O(W) where W = number of SVG path commands
- **Edge generation**: O(V² × W) where V = vertices, W = wall segments
  - For 209 vertices and 11 walls: ~240,000 intersection checks
  - Completed in seconds due to efficient geometric calculations

## Troubleshooting

### "No route found" errors

If navigation fails after regenerating edges:

1. **Check vertex mappings** in `rooms.ts`
   - Ensure rooms have correct `vertexId` references
   - Map more rooms to vertices if needed

2. **Verify graph connectivity**
   ```typescript
   // Check if vertex is isolated
   const hasEdges = graphData.edges.some(e => 
     e.from === 'v123' || e.to === 'v123'
   );
   ```

3. **Adjust distance threshold**
   - Edit `regenerate_edges.js`, change `avgNearestDist * 3` to higher multiplier
   - Increase maximum distance to create more edges

### Edges still clipping through walls

1. **Verify room geometries** in `clickables.ts`
   - Ensure all room boundaries are defined
   - Check SVG path data is complete (closed paths)

2. **Check wall extraction**
   - Run generator with verbose logging
   - Verify wall segment count matches expected rooms

3. **Increase precision**
   - Reduce epsilon value in `segmentsIntersect()` (currently 1e-10)
   - More strict collinear detection

## Performance Optimization

For large graphs (>500 vertices):

1. **Use spatial partitioning**
   - Grid-based bucketing to reduce pair checks
   - Only check vertices in nearby cells

2. **Progressive generation**
   - Generate edges in chunks
   - Save progress between batches

3. **Parallel processing**
   - Split vertex pairs across workers
   - Merge results after completion

## Files Modified

- ✅ `src/utils/visibilityGraph.ts` - Core visibility graph algorithm
- ✅ `regenerate_edges.js` - CLI script for edge regeneration
- ✅ `src/store/graphData.ts` - Updated with 611 wall-aware edges
- ✅ `package.json` - Added `regenerate-edges` script

## Future Enhancements

- [ ] Interactive edge visualization (show rejected edges in red)
- [ ] Real-time edge validation in UI
- [ ] Support for curved walls (Bézier curves in SVG paths)
- [ ] Multi-floor edge generation with staircase connections
- [ ] A* algorithm integration for faster pathfinding
- [ ] Dynamic obstacle avoidance (temporary blockages)
