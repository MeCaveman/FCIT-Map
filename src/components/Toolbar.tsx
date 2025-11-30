
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import { useContext } from "react";
import { isDesktop } from "react-device-detect";
import { Home } from "lucide-react";
import EditPositionButton from "./EditPositionButton";
import DesktopRouteDetails from "./DesktopRouteDetails";
import SearchBar from "./SearchBar";

function Toolbar() {
  const { navigation } = useContext(NavigationContext) as NavigationContextType;
  
  const handleHomeClick = () => {
    window.location.href = "/";
  };
  
  return (
    <div className="flex space-x-1 mb-4 h-12 relative">
      <button
        onClick={handleHomeClick}
        className="flex items-center justify-center px-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-colors"
        aria-label="Return to home"
      >
        <Home className="w-5 h-5 text-gray-700" />
      </button>
      <SearchBar />
      <EditPositionButton />
      {navigation.end && isDesktop && <DesktopRouteDetails />}
    </div>
  );
}

export default Toolbar;