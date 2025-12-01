import IndoorMapWrapper from "@/components/IndoorMapWrapper";
import MobileRouteDetails from "@/components/MobileRouteDetails";
import Toolbar from "@/components/Toolbar";
import useMapData from "@/hooks/useMapData";
import { createContext, useEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useSearchParams } from "react-router-dom";
import {
  MapDataContextType,
  Navigation,
  NavigationContextType,
} from "../utils/types";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import WhereAreYouModal from "@/components/Modals/WhereAreYouModal";
import Loading from "./Loading";

export const NavigationContext = createContext<NavigationContextType | null>(
  null
);
export const MapDataContext = createContext<MapDataContextType | null>(null);

export interface WhereAreYouModalState {
  open: boolean;
  targetObjectName: string;
}

export const WhereAreYouModalContext = createContext<{
  modalState: WhereAreYouModalState;
  setModalState: React.Dispatch<React.SetStateAction<WhereAreYouModalState>>;
} | null>(null);
function Map() {
  let [searchParams, setSearchParams] = useSearchParams();
  const defaultPosition = "v1";
  const startPosition = searchParams.get("position") || defaultPosition;
  const [navigation, setNavigation] = useState<Navigation>({
    start: startPosition,
    end: "",
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentFloor, setCurrentFloor] = useState<string>("F1");
  const [modalState, setModalState] = useState<WhereAreYouModalState>({
    open: false,
    targetObjectName: "",
  });
  
  const navigationValue: NavigationContextType = {
    navigation,
    setNavigation,
    isEditMode,
    setIsEditMode,
    currentFloor,
    setCurrentFloor,
  };

  useEffect(() => {
    setSearchParams({ position: navigation.start });
  }, [navigation.start]);

  const mapData = useMapData();
  
  if (mapData.isLoading) {
    return <Loading />;
  }

  return (
    <MapDataContext.Provider value={mapData}>
      <NavigationContext.Provider value={navigationValue}>
        <WhereAreYouModalContext.Provider value={{ modalState, setModalState }}>
          <SidebarProvider defaultOpen={isDesktop}>
            <div className={`flex text-gray-800 relative overflow-hidden w-full h-screen ${isDesktop ? 'bg-gray-100' : 'bg-white'}`}>
              {isDesktop && <Sidebar />}
              <SidebarInset className="flex flex-col w-full h-full overflow-hidden bg-white">
                <Toolbar />
                <div className="w-full flex-1 overflow-hidden p-0">
                  <IndoorMapWrapper />
                </div>
              </SidebarInset>
              {navigation.end && isMobile && <MobileRouteDetails />}
              <WhereAreYouModal 
                open={modalState.open}
                onClose={() => setModalState({ open: false, targetObjectName: "" })}
                targetObjectName={modalState.targetObjectName}
              />
            </div>
          </SidebarProvider>
        </WhereAreYouModalContext.Provider>
      </NavigationContext.Provider>
    </MapDataContext.Provider>
  );
}

export default Map;
