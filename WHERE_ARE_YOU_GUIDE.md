# Where Are You? Modal - User & Developer Guide

## User Guide

### How to Use
1. Search for your destination using the SearchBar
2. The "Where are you now?" modal will pop up
3. Enter your current location using one of these formats:
   - **Door ID**: `1`, `v1`, `V1`, `door 1`
   - **Room ID**: `H1`, `E1`, `B2`
   - **Room Name**: `Main Hallway`, `Bathroom 1`
4. Select from autocomplete suggestions as you type
5. Press Enter or click "Confirm" to start navigation
6. Click "Cancel" to close without navigating

### Supported Locations

#### Entrances
- E1 or "Entrance 1" (v1)
- E2 or "Entrance 2" (v10)
- E3 or "Entrance 3" (v11)

#### Main Hallways
- H1 or "Main Hallway" (v8)
- H2 or "Main Hall" (v28)
- H3 or "Lab Hallway 1" (v57)

#### Bathrooms
- B1 or "Bathroom 1" (v45)
- B2 or "Bathroom 2" (v36)
- B3 or "Bathroom 3" (v25)
- B4 or "Bathroom 4" (v31)

### Tips
- Autocomplete suggestions appear as you type
- First suggestion is auto-selected on Enter key press
- You can click any suggestion to select it
- All matching suggestions are removed for duplicates

---

## Developer Guide

### Architecture

The feature uses React Context for state management across components:

```
Map.tsx (provides WhereAreYouModalContext)
  └── SearchBar.tsx (triggers modal)
      └── WhereAreYouModal.tsx (handles user input)
          └── navigateToObject() (performs navigation)
```

### Key Files

| File | Purpose |
|------|---------|
| `src/data/rooms.ts` | Room/location data definitions |
| `src/components/Modals/WhereAreYouModal.tsx` | Modal component |
| `src/pages/Map.tsx` | Modal state & context provider |
| `src/components/SearchBar.tsx` | Modal trigger integration |
| `src/utils/types.ts` | TypeScript interfaces |

### Adding New Rooms

Edit `src/data/rooms.ts`:

```typescript
const rooms: Room[] = [
  {
    uniqueId: "R101",
    name: "Room 101",
    vertexId: "v42", // Map to corresponding vertex
    description: "First floor room"
  },
  // ... more rooms
];
```

Then rebuild to see the changes in autocomplete.

### Integration Points

1. **SearchBar** triggers modal by calling `setModalState()`
2. **Modal context** provides state to all child components
3. **WhereAreYouModal** validates input and calls `navigateToObject()`
4. **navigateToObject()** handles the actual pathfinding

### Context API Usage

```typescript
// In any component:
const { modalState, setModalState } = useContext(WhereAreYouModalContext);

// Open modal
setModalState({
  open: true,
  targetObjectName: "Room Name"
});

// Close modal
setModalState({ open: false, targetObjectName: "" });
```

### Input Validation

The modal supports flexible input parsing via `normalizeDoorInput()`:

```
Input → Normalized Format
"v1" → "v1"
"1" → "v1"
"V1" → "v1"
"door 1" → "v1"
"door v1" → "v1"
```

### Error Handling

Errors are displayed via toast notifications:
- "Please enter a door or room unique id..."
- "Door not found on the map..."
- "No match found for given input."
- "This door/room doesn't map to a location..."

### Extending the Feature

#### Add more input formats:
Edit `normalizeDoorInput()` in `WhereAreYouModal.tsx`

#### Add location history:
Store recent locations in localStorage and add to suggestions

#### Add BLE detection:
Integrate with beacon scanning to auto-populate starting location

#### Add favorites:
Add star icon to suggestions to save frequently used locations

---

## Technical Stack

- **React**: Components & hooks (useState, useContext)
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **react-toastify**: Notifications
- **pathfinding**: graph.calculateShortestPath()

## Performance Considerations

- Suggestions are built in real-time as user types
- Duplicate removal is O(n²) but acceptable for typical room counts
- Context updates only trigger modal re-renders
- Navigation happens after confirmation, not during typing

---

## Testing Checklist

- [ ] Autocomplete suggestions appear while typing
- [ ] Door ID formats (1, v1, V1, door 1) work
- [ ] Room IDs (E1, H1, B2) work
- [ ] Room names work
- [ ] Enter key selects first suggestion
- [ ] Click suggestion selects it
- [ ] Cancel button closes modal
- [ ] Invalid input shows error toast
- [ ] Valid selection starts navigation
- [ ] Navigation path displays correctly
- [ ] Modal closes after navigation
