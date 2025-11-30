import { useContext } from "react";
import Tooltip from "@/components/ui/Tooltip";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";

function FloorSwitcher() {
  const { currentFloor, setCurrentFloor } = useContext(
    NavigationContext
  ) as NavigationContextType;

  const toggleFloor = () => {
    setCurrentFloor(currentFloor === "F1" ? "F2" : "F1");
  };

  return (
    <Tooltip content={`Switch to ${currentFloor === "F1" ? "F2" : "F1"}`} className="bg-blue-500">
      <button
        onClick={toggleFloor}
        className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg"
        aria-label="switch floor"
      >
        {currentFloor}
      </button>
    </Tooltip>
  );
}

export default FloorSwitcher;
