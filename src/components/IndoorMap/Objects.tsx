interface ObjectsProps {
  handleObjectClick: (e: React.MouseEvent<SVGPathElement>) => void;
  className?: string;
}
function Objects({ handleObjectClick, className }: ObjectsProps) {
  return (
    <g id="Objects">
      <path
        id="Entrance 1"
        className={`${className} object`}
        d="M 584.383 1112.367 L 630.125 1052.181 L 699.941 1052.983 C 699.941 1052.983 740.065 1109.157 740.065 1110.762 C 740.065 1112.367 585.988 1110.762 584.383 1112.367 Z"
        onClick={handleObjectClick}
      />
      <path
        id="Entrance 2"
        className={`${className} object`}
        d="M 358.883 404.572 H 543.456 V 566.675 H 358.883 V 404.572 Z"
        onClick={handleObjectClick}
      />
      <path
        id="Entrance 3"
        className={`${className} object`}
        d="M 784.202 405.374 H 967.972 V 563.464 H 784.202 V 405.374 Z"
        onClick={handleObjectClick}
      />
    </g>
  );
}

export default Objects;
