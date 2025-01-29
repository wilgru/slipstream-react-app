import { type Colour } from "src/models/colours/Colour.type";
import { getAllColours } from "src/models/colours/getColour";
import { ColourPickerColourButton } from "./ColourPickerColourButton";

type ColourPickerProps = {
  selectedColourName: string;
  onSelectColour: (colour: Colour) => void;
};

export const ColourPicker = ({
  selectedColourName,
  onSelectColour,
}: ColourPickerProps) => {
  const colours = getAllColours();

  return (
    <div className="flex flex-wrap gap-2">
      {colours.map((colour) => (
        <ColourPickerColourButton
          colour={colour}
          selected={selectedColourName === colour.name}
          onClick={onSelectColour}
        />
      ))}
    </div>
  );
};
