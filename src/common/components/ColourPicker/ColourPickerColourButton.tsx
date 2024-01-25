import type { Colour } from "src/common/types/Colour";

type ColourButtonProps = {
  colour: Colour;
  selected: boolean;
  onClick: (colour: Colour) => void;
};

export const ColourPickerColourButton = ({
  colour,
  selected,
  onClick,
}: ColourButtonProps) => {
  return (
    <button
      onClick={() => onClick(colour)}
      style={{ backgroundColor: colour.primary }}
      className={`h-8 w-8 ${selected && "border-2 border-orange-500"} bg-${
        colour.primary
      }`}
    ></button>
  );
};
