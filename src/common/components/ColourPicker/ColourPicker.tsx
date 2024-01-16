import { TopicColour } from "src/topics/types/TopicColour.type";

const ColourBtn = ({
  colour,
  selected,
  onClick,
}: {
  colour: TopicColour;
  selected: boolean;
  onClick: (colour: TopicColour) => void;
}) => {
  return (
    <button
      onClick={() => onClick(colour)}
      style={{ backgroundColor: colour }}
      className={`h-8 w-8 ${selected && "border-2 border-stone-700"}`}
    ></button>
  );
};

export const ColourPicker = ({
  colours = [TopicColour["green"], TopicColour["red"]],
  selectedColour,
  onSelectColour,
}: {
  colours?: TopicColour[];
  selectedColour: TopicColour;
  onSelectColour: (colour: TopicColour) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colours.map((colour) => (
        <ColourBtn
          colour={colour}
          selected={selectedColour === colour}
          onClick={onSelectColour}
        />
      ))}
    </div>
  );
};
