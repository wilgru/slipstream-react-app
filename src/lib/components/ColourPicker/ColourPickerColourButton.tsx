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
        "flex justify-center items-center h-6 w-6 rounded-full",
        colour.backgroundClass
      )}
    >
      {selected && <div className="h-2 w-2 rounded-full bg-white" />}
    </button>
  );
};
