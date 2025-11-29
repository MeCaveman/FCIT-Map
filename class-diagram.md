# FCITMap Class Diagram

## PlantUML Format

The class diagram is available in `class-diagram.puml`. You can view it using:
- [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
- VS Code with PlantUML extension
- IntelliJ IDEA / WebStorm
- Any PlantUML-compatible tool

## Mermaid Format (Below)

```mermaid
classDiagram
    %% Core Data Types
    class ObjectItem {
        <<interface>>
        +string id
        +string name
        +string desc
        +string categoryId
        +string? categoryName
    }
    
    class Category {
        <<interface>>
        +string id
        +string name
    }
    
    class Beacon {
        <<interface>>
        +string _id
        +string beacon_id
        +number rssi
    }
    
    class BleBeacon {
        <<interface>>
        +string name
        +string id
        +number rssi
        +number txPower
        +string[] uuids
    }
    
    class Navigation {
        <<interface>>
        +string start
        +string? end
    }
    
    %% Graph Data Structures
    class VertexData {
        <<interface>>
        +string id
        +string? objectName
        +number cx
        +number cy
    }
    
    class EdgeData {
        <<interface>>
        +string id
        +string from
        +string to
    }
    
    class GraphData {
        <<interface>>
        +VertexData[] vertices
        +EdgeData[] edges
    }
    
    %% Context Types
    class NavigationContextType {
        <<interface>>
        +Navigation navigation
        +Dispatch setNavigation
        +boolean isEditMode
        +Dispatch setIsEditMode
    }
    
    class MapDataContextType {
        <<interface>>
        +ObjectItem[] objects
        +Category[] categories
        +Beacon[]? beacons
        +void refetchData()
    }
    
    class AdminContextType {
        <<interface>>
        +boolean isAdmin
        +Dispatch setIsAdmin
    }
    
    %% Algorithm Classes
    class PriorityQueue {
        -Node[] values
        +constructor()
        +void enqueue(id, priority)
        +Node dequeue()
        -void bubbleUp()
        -void sinkDown()
    }
    
    class DijkstraCalculator {
        -object adjacencyList
        +constructor()
        +void addVertex(vertex)
        +void addEdge(vertex1, vertex2, weight)
        +string[] calculateShortestPath(start, finish)
    }
    
    %% Component Props (Simplified)
    class MapBackgroundProps {
        <<interface>>
        +ReactNode children
    }
    
    class ObjectsProps {
        <<interface>>
        +function handleObjectClick
        +string? className
    }
    
    class PositionsProps {
        <<interface>>
        +number positionRadius
        +function handlePositionClick
        +string className
        +Navigation? navigation
    }
    
    class ObjectItemDetailsModalProps {
        <<interface>>
        +boolean open
        +function onClose
        +ObjectItem object
        +function objectNavigation
    }
    
    %% Relationships
    ObjectItem --> Category : uses (categoryId)
    GraphData *-- VertexData : contains
    GraphData *-- EdgeData : contains
    VertexData --> ObjectItem : references (objectName)
    NavigationContextType --> Navigation : uses
    MapDataContextType --> ObjectItem : uses
    MapDataContextType --> Category : uses
    MapDataContextType --> Beacon : uses
    DijkstraCalculator --> PriorityQueue : uses
    DijkstraCalculator --> VertexData : uses
    DijkstraCalculator --> EdgeData : uses
    ObjectsProps --> ObjectItem : uses
    PositionsProps --> Navigation : uses
    ObjectItemDetailsModalProps --> ObjectItem : uses
```

## Class Summary

### Core Classes
- **PriorityQueue**: Implements a min-heap priority queue for Dijkstra's algorithm
- **DijkstraCalculator**: Implements Dijkstra's shortest path algorithm for navigation

### Core Interfaces
- **ObjectItem**: Represents a location/object on the map (e.g., bathroom, entrance)
- **Category**: Represents a category of objects (e.g., "Bathroom", "Entrance")
- **Beacon**: Represents a BLE beacon for indoor positioning
- **BleBeacon**: Extended beacon information with UUIDs and transmission power
- **Navigation**: Represents navigation state (start and end points)

### Graph Structures
- **VertexData**: Represents a vertex/node in the graph with coordinates
- **EdgeData**: Represents an edge/connection between vertices
- **GraphData**: Container for the complete graph structure

### Context Types (React Contexts)
- **NavigationContextType**: Manages navigation state and edit mode
- **MapDataContextType**: Manages map data (objects, categories, beacons)
- **AdminContextType**: Manages admin authentication state

### Component Props
- Various prop interfaces for React components (MapBackground, Objects, Positions, Modals, etc.)

