import { cn } from "src/lib/utils/cn";
import type { Colour } from "src/lib/colour/types/Colour";

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
      style={{ backgroundColor: colour.backgroundClass }}
      className={cn(
        "h-8 w-8",
        colour.backgroundClass,
        selected && "border-2 border-orange-500"
      )}
    ></button>
  );
};
