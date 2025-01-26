import { customisationColours } from "src/lib/colour/constants/customisationColours";
import { type Colour } from "src/lib/colour/types/Colour";
import { ColourPickerColourButton } from "./ColourPickerColourButton";

type ColourPickerProps = {
  selectedColourName: string;
  onSelectColour: (colour: Colour) => void;
};

export const ColourPicker = ({
  selectedColourName,
  onSelectColour,
}: ColourPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {customisationColours.map((customisationColour) => (
        <ColourPickerColourButton
          colour={customisationColour}
          selected={selectedColourName === customisationColour.name}
          onClick={onSelectColour}
        />
      ))}
    </div>
  );
};
