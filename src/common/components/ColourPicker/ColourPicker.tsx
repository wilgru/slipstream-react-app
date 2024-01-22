import { type Colour } from "src/common/components/types/Colour";

// these colours are manually included with the build via the tailwind.config.js
const customisationColours: Colour[] = [
  { name: "red", primary: "red-500", secondary: "" },
  { name: "orange", primary: "orange-500", secondary: "" },
  { name: "yellow", primary: "yellow-300", secondary: "" },
  { name: "lime", primary: "lime-300", secondary: "" },
  { name: "green", primary: "green-500", secondary: "" },
  { name: "blue", primary: "blue-500", secondary: "" },
  { name: "cyan", primary: "cyan-300", secondary: "" },
  { name: "pink", primary: "pink-300", secondary: "" },
  { name: "purple", primary: "purple-500", secondary: "" },
  { name: "brown", primary: "amber-700", secondary: "" },
  { name: "grey", primary: "gray-500", secondary: "" },
  { name: "default", primary: "stone-700", secondary: "" },
];

const ColourBtn = ({
  colour,
  selected,
  onClick,
}: {
  colour: Colour;
  selected: boolean;
  onClick: (colour: Colour) => void;
}) => {
  return (
    <button
      onClick={() => onClick(colour)}
      style={{ backgroundColor: colour.primary }}
      className={`h-8 w-8 ${selected && "border-2 border-stone-700"} bg-${
        colour.primary
      }`}
    ></button>
  );
};

export const ColourPicker = ({
  selectedColourName,
  onSelectColour,
}: {
  selectedColourName: string;
  onSelectColour: (colour: Colour) => void;
}) => {
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
