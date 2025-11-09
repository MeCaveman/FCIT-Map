interface ObjectsProps {
  handleObjectClick: (e: React.MouseEvent<SVGPathElement>) => void;
  className?: string;
}

function Objects({ handleObjectClick, className }: ObjectsProps) {
  return (
    <g id="Objects">
      <path
        id="Bathroom 4"
        className={`${className} object`}
        d="M 537.036 187.95 H 596.642 V 234.963 H 537.036 V 187.95 Z"
        onClick={handleObjectClick}
      />
      <path
        id="Bathroom 3"
        className={`${className} object`}
        d="M 140.78 560.699 H 186.954 V 639.614 H 140.78 V 560.699 Z"
        onClick={handleObjectClick}
      />
      <path
        id="Bathroom 1"
        className={`${className} object`}
        d="M 118.952 1003.13 H 164.286 V 1080.366 H 118.952 V 1003.13 Z"
        onClick={handleObjectClick}
      />
      <path
        id="Bathroom 2"
        className={`${className} object`}
        d="M 765.807 473.389 H 849.34 V 528.378 H 765.807 V 473.389 Z"
        onClick={handleObjectClick}
      />
    </g>
  );
}

export default Objects;