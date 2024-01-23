import { customisationColours } from "src/common/constants/customisationColours";
import { type Colour } from "src/common/types/Colour";

type ColourBtnProps = {
  colour: Colour;
  selected: boolean;
  onClick: (colour: Colour) => void;
};

type ColourPickerProps = {
  selectedColourName: string;
  onSelectColour: (colour: Colour) => void;
};

const ColourBtn = ({ colour, selected, onClick }: ColourBtnProps) => {
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

export const ColourPicker = ({
  selectedColourName,
  onSelectColour,
}: ColourPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {customisationColours.map((customisationColour) => (
        <ColourBtn
          colour={customisationColour}
          selected={selectedColourName === customisationColour.name}
          onClick={onSelectColour}
        />
      ))}
    </div>
  );
};
