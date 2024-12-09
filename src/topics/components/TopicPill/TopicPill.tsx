import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { Icon } from "src/common/components/Icon/Icon";
import { customisationColours } from "src/common/constants/customisationColours";
import type { Topic } from "src/topics/types/Topic.type";

type TopicPillProps = {
  topic: Topic;
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  isSelected?: boolean;
  onClick?: (id: string) => void;
};

export const TopicPill = ({
  topic,
  size = "sm",
  closable = false,
  isSelected = false,
  onClick,
}: TopicPillProps): JSX.Element => {
  const [closeButtonVisible, setCloseButtonVisible] = useState<boolean>(false);

  const topicCustomisationColour = customisationColours.find(
    (colour) => colour.name === topic.colour
  );

  const topicButtonColour = topicCustomisationColour
    ? topicCustomisationColour?.textClass
    : "text-stone-300";

  // TODO: make always closable?
  return (
    <div
      className="h-fit"
      onMouseOver={() => setCloseButtonVisible(true)}
      onMouseOut={() => setCloseButtonVisible(false)}
    >
      {closable ? (
        <Button
          variant="block"
          colour={topicButtonColour}
          size={size}
          onClick={() => onClick && onClick(topic.id)}
          iconName={closable && closeButtonVisible ? "x" : "ChatCircle"}
        >
          {topic.name}
        </Button>
      ) : (
        <Toggle.Root
          className=""
          onClick={() => onClick && onClick(topic.id)}
          pressed={isSelected}
        >
          <Icon iconName="ChatCircle" className={topicButtonColour} />
          {topic.name}
        </Toggle.Root>
      )}
    </div>
  );
};
