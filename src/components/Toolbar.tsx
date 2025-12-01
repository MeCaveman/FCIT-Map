import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import { isDesktop } from "react-device-detect";
import DesktopRouteDetails from "./DesktopRouteDetails";
import FloorSwitcher from "./FloorSwitcher";
import SearchBar from "./SearchBar";
import { SidebarTrigger } from "./ui/sidebar";
import fcitMapLogo from "@/assets/img/FCITMapLogo.svg";

function Toolbar() {
  const { navigation, currentFloor } = useContext(NavigationContext) as NavigationContextType;
  const [floorToast, setFloorToast] = useState<string>("");
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate("/");
  };
  


  useEffect(() => {
    const label = currentFloor === "F2" ? "Floor 2" : "Floor 1";
    setFloorToast(`Current floor: ${label}`);
    const t = setTimeout(() => setFloorToast(""), 2500);
    return () => clearTimeout(t);
  }, [currentFloor]);
  return (
    <>
      <div className="flex space-x-1 mb-4 h-12 relative z-30 items-center">
        {isDesktop && <SidebarTrigger className="mr-2" />}
        <img 
          src={fcitMapLogo} 
          alt="FCIT Map Logo" 
          className="h-10 w-10 object-contain mx-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        />
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