import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import { isDesktop } from "react-device-detect";
import DesktopRouteDetails from "./DesktopRouteDetails";
import FloorSwitcher from "./FloorSwitcher";
import SearchBar from "./SearchBar";
import { SidebarTrigger } from "./ui/sidebar";

function Toolbar() {
  const { navigation, currentFloor } = useContext(NavigationContext) as NavigationContextType;
  const [floorToast, setFloorToast] = useState<string>("");
  
  const handleHomeClick = () => {
    window.location.href = "/";
  };
  


  useEffect(() => {
    const label = currentFloor === "F2" ? "Floor 2" : "Floor 1";
    setFloorToast(`Current floor: ${label}`);
    const t = setTimeout(() => setFloorToast(""), 2500);
    return () => clearTimeout(t);
  }, [currentFloor]);
  return (
    <>
      <div className="flex space-x-1 mb-4 h-12 relative z-30">
        {isDesktop && <SidebarTrigger className="mr-2" />}
        <button
          onClick={handleHomeClick}
          className="flex items-center justify-center px-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-colors font-semibold text-gray-700"
          aria-label="Return to home"
        >
          Home
        </button>
        <SearchBar />
        <FloorSwitcher />
        {navigation.end && isDesktop && <DesktopRouteDetails />}
      </div>
      {floorToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-700 text-white text-sm font-medium rounded-lg px-6 py-3 shadow-lg z-[9999]">
          {floorToast}
        </div>
      )}
    </>
  );
}

export default Toolbar;