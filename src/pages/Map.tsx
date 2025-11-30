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
          <div className="flex bg-gray-100 text-gray-800 relative overflow-hidden w-full h-screen">
            {isDesktop && <Sidebar />}
            <main
              className={`flex w-full ${isDesktop && "-ml-96"} justify-center flex-grow flex-col md:p-10 p-2 transition-all duration-150 ease-in lg:ml-0`}
            >
              <Toolbar />
              <div className="center w-full h-full">
                <IndoorMapWrapper />
              </div>
            </main>
            {navigation.end && isMobile && <MobileRouteDetails />}
            <WhereAreYouModal 
              open={modalState.open}
              onClose={() => setModalState({ open: false, targetObjectName: "" })}
              targetObjectName={modalState.targetObjectName}
            />
          </div>
        </WhereAreYouModalContext.Provider>
      </NavigationContext.Provider>
    </MapDataContext.Provider>
  );
}

export default Map;
