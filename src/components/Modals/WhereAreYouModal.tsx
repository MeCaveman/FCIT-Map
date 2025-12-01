import { useContext, useState } from "react";
import { Dialog, DialogBody, DialogHeader, DialogFooter } from "../ui/Dialog";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import roomsCatalog, { RoomRecord } from "@/data/roomsCatalog";
import { graphData } from "@/store/graphData";
import { toast } from "react-toastify";
import { navigateToObject } from "@/utils/navigationHelper";
import whereAreYouSvg from "@/assets/img/whereAreYou.svg";

interface WhereAreYouModalProps {
  open: boolean;
  onClose: () => void;
  targetObjectName: string; // original target selected
}

function WhereAreYouModal({ open, onClose, targetObjectName }: WhereAreYouModalProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{label:string, roomId:string, name:string}>>([]);
  const { navigation, setNavigation } = useContext(NavigationContext) as NavigationContextType;

  const findVertexForRoom = (room: RoomRecord) => {
    const normalizedId = room.id.toLowerCase();
    const normalizedName = room.name.toLowerCase();
    const normalizedVertexId = room.vertexId?.toLowerCase();
    return (
      graphData.vertices.find((v) => v.objectName?.toLowerCase() === normalizedId) ||
      graphData.vertices.find((v) => v.objectName?.toLowerCase() === normalizedName) ||
      (normalizedVertexId
        ? graphData.vertices.find((v) => v.id.toLowerCase() === normalizedVertexId)
        : undefined)
    );
  };

  function buildSuggestions(q: string) {
    if (!q || q.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const trimmed = q.trim().toLowerCase();
    
    // Search in roomsCatalog by ID or name
    const roomMatches = roomsCatalog.filter((r) =>
      r.id.toLowerCase().includes(trimmed) || 
      r.name.toLowerCase().includes(trimmed)
    );
    
    const merged: Array<{label:string, roomId:string, name:string}> = [];
    roomMatches.forEach((r) => merged.push({ 
      label: `${r.id} - ${r.name}`, 
      roomId: r.id, 
      name: r.name 
    }));
    
    // Remove duplicates
    const unique = merged.filter((v, i, arr) => arr.findIndex(a => a.label === v.label) === i);
    setSuggestions(unique);
  }

  function clearAndClose() {
    setQuery("");
    setSuggestions([]);
    onClose();
  }

  function handleSelectSuggestion(s: {label:string, roomId:string, name:string}) {
    const room = roomsCatalog.find((r) => r.id === s.roomId);
    if (!room) {
      toast.error(`"${s.roomId}" was removed from the catalog.`);
      return;
    }
    const vertex = findVertexForRoom(room);
    if (vertex) {
      setNavigation((prev) => ({ ...prev, start: vertex.id }));
      navigateToObject(targetObjectName, { ...navigation, start: vertex.id }, setNavigation);
      clearAndClose();
      return;
    }
    // If no vertex mapping exists yet, show a message
    toast.error(`"${s.roomId}" is not yet mapped to a location on the map. Please assign it to a vertex first.`);
  }

  function handleConfirm() {
    const q = query?.trim();
    if (!q) {
      // If no input, use current position (navigation.start) and navigate
      if (!navigation.start) {
        toast.error("No starting position set. Please enter your location.");
        return;
      }
      navigateToObject(targetObjectName, navigation, setNavigation);
      clearAndClose();
      return;
    }

    // Try to find room by ID or name in roomsCatalog
    const room = roomsCatalog.find((r) => 
      r.id.toLowerCase() === q.toLowerCase() || 
      r.name.toLowerCase() === q.toLowerCase() ||
      r.name.toLowerCase().includes(q.toLowerCase())
    );
    
    if (room) {
      const vertex = findVertexForRoom(room);
      if (vertex) {
        setNavigation((prev) => ({ ...prev, start: vertex.id }));
        navigateToObject(targetObjectName, { ...navigation, start: vertex.id }, setNavigation);
        clearAndClose();
        return;
      }
      // If no vertex mapping exists yet, show a message
      toast.error(`"${room.id}" is not yet mapped to a location on the map. Please assign it to a vertex first.`);
      return;
    }

    toast.error("No room found with that ID or name.");
  }

  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>
        <p>Where are you now?</p>
      </DialogHeader>
      <DialogBody>
        <div className="flex justify-center mb-4">
          <img 
            src={whereAreYouSvg} 
            alt="Where are you?" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <p className="mb-2 text-gray-700 text-sm text-center">
          Enter the room ID or name where you are currently located — suggestions will appear as you type.
        </p>
        <div className="mb-2">
          <label className="block mb-1 text-sm text-gray-700">Your Current Location</label>
          <input
            placeholder="e.g., 15F29-A or Entrance 1"
            value={query}
            onChange={(e) => { setQuery(e.target.value); buildSuggestions(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (suggestions.length > 0) {
                  handleSelectSuggestion(suggestions[0]);
                } else {
                  handleConfirm();
                }
              }
            }}
            className="w-full p-2 border rounded"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white border rounded max-h-40 overflow-auto">
              {suggestions.map((s, idx) => (
                <li key={idx} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelectSuggestion(s)}>
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button className="bg-teal-700 text-white px-4 py-2 rounded" onClick={handleConfirm}>
          Confirm
        </button>
      </DialogFooter>
    </Dialog>
  );
}

export default WhereAreYouModal;
