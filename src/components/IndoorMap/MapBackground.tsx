import floorplan from "@/assets/img/floorf1-entire-floor.svg";
import { ReactNode } from "react";

interface MapBackgroundProps {
  children: ReactNode;
}

function MapBackground({ children }: MapBackgroundProps) {
  return (
    <svg
      viewBox="0 0 5063.04 10655.04"
      className="lg:h-[85vh] lg:w-[75vw] h-[85dvh] w-full"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid meet"
    >
      <image 
        id="background" 
        x="0" 
        y="0" 
        width="5063.04" 
        height="10655.04" 
        href={floorplan}
        xlinkHref={floorplan}
        preserveAspectRatio="xMidYMid meet"
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
