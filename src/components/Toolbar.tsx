import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import { useContext } from "react";
import { isDesktop } from "react-device-detect";
import EditPositionButton from "./EditPositionButton";
import DesktopRouteDetails from "./DesktopRouteDetails";
import SearchBar from "./SearchBar";

function Toolbar() {
  const { navigation } = useContext(NavigationContext) as NavigationContextType;
  return (
    <div className="flex justify-between items-center mb-4 h-12 relative">
      <div className="flex space-x-1">
        <EditPositionButton />
        {navigation.end && isDesktop && <DesktopRouteDetails />}
      </div>
      {isDesktop && (
        <div className="absolute right-0">
          <SearchBar />
        </div>
      )}
    </div>
  );
}

export default Toolbar;
