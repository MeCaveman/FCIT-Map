import { useContext, useMemo } from "react";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import { clickables } from "@/data/clickables";
import roomsCatalog from "@/data/roomsCatalog";
import overlayTransforms from "@/config/overlayTransforms";

interface ObjectsProps {
  handleObjectClick: (e: React.MouseEvent<SVGPathElement>) => void;
  className?: string;
}

function Objects({ handleObjectClick, className }: ObjectsProps) {
  const { currentFloor } = useContext(NavigationContext) as NavigationContextType;
  const t = overlayTransforms[(currentFloor as "F1" | "F2") || "F1"];

  const shapes = useMemo(() => {
    return clickables
      .map((g) => {
        const room = roomsCatalog.find((r) => r.id === g.roomId);
        if (!room) return null;
        return { ...g, room };
      })
      .filter((x): x is { roomId: string; d: string; room: typeof roomsCatalog[number] } => !!x)
      .filter((x) => x.room.floor === currentFloor);
  }, [currentFloor]);

  return (
    <g id="Objects" transform={`translate(${t.translateX} ${t.translateY}) scale(${t.scaleX} ${t.scaleY})`}>
      {shapes.map((c) => (
        <path
          key={c.roomId}
          id={c.room.name}
          className={`${className} object`}
          d={c.d}
          onClick={handleObjectClick}
        />
      ))}
    </g>
  );
}

export default Objects;