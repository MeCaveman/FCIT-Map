import boxySvg from "@/assets/img/BoxySvg.svg";
import entireF2 from "@/assets/img/EntireF2.svg";
import { ReactNode, useContext } from "react";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
// overlayTransforms used previously for global overlays; now applied per-layer

const DEV_LOG_COORDS = true;

interface MapBackgroundProps {
  children: ReactNode;
}

function MapBackground({ children }: MapBackgroundProps) {
  const { currentFloor } = useContext(NavigationContext) as NavigationContextType;
  
  // Map floor to corresponding SVG file and viewBox
  const floorConfigMap: Record<string, { svg: string; viewBox: string }> = {
    F1: { svg: boxySvg, viewBox: "0 0 5063.04 10655.04" },
    F2: { svg: entireF2, viewBox: "0 0 4524.7432 6733.5117" },
  };

  const floorConfig = floorConfigMap[currentFloor] || floorConfigMap["F1"];
  const [minX, minY, width, height] = floorConfig.viewBox.split(" ").map(Number);
  
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!DEV_LOG_COORDS) return;
    const svg = e.currentTarget as unknown as SVGSVGElement;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const cursor = pt.matrixTransform(ctm.inverse());
      // eslint-disable-next-line no-console
      console.log("SVG coords:", Math.round(cursor.x), Math.round(cursor.y));
    }
  };

  return (
    <svg
      key={currentFloor}
      viewBox={floorConfig.viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="lg:h-[85vh] lg:w-[75vw] h-[85dvh] w-auto"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={handleSvgClick}
    >
      <image 
        id="background" 
        x={minX}
        y={minY}
        width={width} 
        height={height} 
        xlinkHref={floorConfig.svg}
        preserveAspectRatio="none"
      />
      {children}
    </svg>
  );
}

export default MapBackground;
//! Dont delete bc might be useful sometime
/*
  const getMousePositionSVG = (event: MouseEvent) => {
    const point = svgRef.current?.createSVGPoint();
    if (point) {
      point.x = event.clientX;
      point.y = event.clientY;
      const transformedPoint = point.matrixTransform(
        svgRef.current?.getScreenCTM()?.inverse()
      );
      console.log(transformedPoint.x, transformedPoint.y);
    }
  };
  useEffect(() => {
    svgRef.current?.addEventListener("click", getMousePositionSVG);
    console.log(svgRef.current?.getBoundingClientRect());
  }, []);
  */
