import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { customisationColours } from "src/common/constants/customisationColours";
import type { Topic } from "src/topics/types/Topic.type";

type TopicPillProps = {
  topic: Topic;
  size?: "small";
  closable?: boolean;
  isSelected?: boolean;
  onClick?: (id: string) => void;
};

export const TopicPill = ({
  topic,
  size = "small",
  closable = false,
  isSelected = false,
  onClick,
}: TopicPillProps): JSX.Element => {
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

  const topicColour = customisationColours.find(
    (colour) => colour.name === topic.colour
  );

  const buttonColour = topicColour
    ? {
        border: topicColour.primary,
        background: topicColour.secondary,
        text: topicColour.lightText ? "stone-100" : "stone-700",
      }
    : { border: "stone-700", background: "stone-300", text: "stone-700" };

  return (
    <div
      onMouseOver={() => setCloseBtnVisible(true)}
      onMouseOut={() => setCloseBtnVisible(false)}
    >
      {closable ? (
        <Button
          styleType="block"
          colour={buttonColour}
          size={size}
          icon={closable && closeBtnVisible ? "close" : ""}
          iconSize={size}
          onClick={() => onClick && onClick(topic.id)}
        >
          {topic.name}
        </Button>
      ) : (
        <Toggle
          styleType="block"
          colour={buttonColour}
          size={size}
          iconSize={size}
          onClick={() => onClick && onClick(topic.id)}
          isToggled={isSelected}
        >
          {topic.name}
        </Toggle>
      )}
    </div>
  );
};
