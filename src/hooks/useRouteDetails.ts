import { useContext, useEffect, useState } from "react";
import { MapDataContext, NavigationContext } from "@/pages/Map";
import {
  MapDataContextType,
  NavigationContextType,
  ObjectItem,
} from "@/utils/types";
import { resetEdges } from "@/utils/navigationHelper";

export function useRouteDetails() {
  const { objects } = useContext(MapDataContext) as MapDataContextType;
  const { navigation, setNavigation } = useContext(
    NavigationContext
  ) as NavigationContextType;
  const [object, setObject] = useState<ObjectItem | null>(null);
  const [routeDetails, setRouteDetails] = useState({
    routeLength: 0,
    walkingTime: 0,
    walkingTimeFormatted: "0 sec",
    rightRouteLength: 0,
  });

  useEffect(() => {
    const fetchObject = async () => {
      try {
        if (!navigation.end) return;
        objects.forEach((obj) => {
          if (obj.name === navigation.end) {
            setObject(obj);
          }
        });
      } catch (error) {
        console.error(`Error fetching object by ID: ${navigation.end}`, error);
      }
    };

    const calculateRouteDetails = () => {
      const navigationRoutePath = document.getElementById(
        "navigation-route"
      ) as SVGPathElement | null;
      const routeLength = navigationRoutePath?.getTotalLength() || 0;
      
      // Conversion: 1 SVG point = 0.95 cm = 0.0095 m
      const POINTS_TO_METERS = 0.0095; // 0.95 cm per point
      const WALKING_SPEED = 1.4; // m/s (average walking speed)
      
      // Convert SVG path length (in points) to real-world distance (in meters)
      const rightRouteLength = Math.round((routeLength * POINTS_TO_METERS) * 10) / 10;
      
      // Calculate walking time in seconds using average walking speed (1.4 m/s)
      const walkingTimeSeconds = Math.round(rightRouteLength / WALKING_SPEED);
      
      // Format time as "X min Y sec" or "X sec"
      let walkingTimeFormatted: string;
      if (walkingTimeSeconds >= 60) {
        const minutes = Math.floor(walkingTimeSeconds / 60);
        const seconds = walkingTimeSeconds % 60;
        walkingTimeFormatted = seconds > 0 
          ? `${minutes} min ${seconds} sec`
          : `${minutes} min`;
      } else {
        walkingTimeFormatted = `${walkingTimeSeconds} sec`;
      }

      setRouteDetails({ 
        routeLength, 
        walkingTime: walkingTimeSeconds, 
        walkingTimeFormatted,
        rightRouteLength 
      });
    };

    fetchObject();
    calculateRouteDetails();
  }, [navigation.end]);

  function handleLeave() {
    resetEdges();
    setNavigation((prevNavigation) => ({
      ...prevNavigation,
      end: "",
    }));
  }

  return { object, ...routeDetails, handleLeave };
}
