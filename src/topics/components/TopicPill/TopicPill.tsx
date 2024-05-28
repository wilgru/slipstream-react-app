import { ChatCircle, X } from "@phosphor-icons/react";
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
  const [closeButtonVisible, setCloseButtonVisible] = useState<boolean>(false);

  const topicCustomisationColour = customisationColours.find(
    (colour) => colour.name === topic.colour
  );

  const topicButtonColour = topicCustomisationColour
    ? {
        border: "black",
        background: topicCustomisationColour.primary,
        text: "black",
      }
    : { border: "black", background: "stone-300", text: "black" };

  return (
    <div
      className="h-fit"
      onMouseOver={() => setCloseButtonVisible(true)}
      onMouseOut={() => setCloseButtonVisible(false)}
    >
      {closable ? (
        <Button
          styleType="block"
          colour={topicButtonColour}
          size={size}
          onClick={() => onClick && onClick(topic.id)}
          icon={() =>
            closable && closeButtonVisible ? (
              <X size={16} />
            ) : (
              <ChatCircle size={16} />
            )
          }
        >
          {topic.name}
        </Button>
      ) : (
        <Toggle
          styleType="block"
          colour={topicButtonColour}
          size={size}
          onClick={() => onClick && onClick(topic.id)}
          isToggled={isSelected}
          icon={() => <ChatCircle size={16} />}
        >
          {topic.name}
        </Toggle>
      )}
    </div>
  );
};
