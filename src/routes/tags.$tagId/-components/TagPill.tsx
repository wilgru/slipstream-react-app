import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { customisationColours } from "src/lib/colour/constants/customisationColours";
import { Button } from "src/lib/components/Button/Button";
import { Icon } from "src/lib/components/Icon/Icon";
import type { Topic } from "src/topics/types/Topic.type";

type TagPillProps = {
  topic: Topic;
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  isSelected?: boolean;
  onClick?: (id: string) => void;
};

export const TagPill = ({
  topic,
  size = "sm",
  closable = false,
  isSelected = false,
  onClick,
}: TagPillProps): JSX.Element => {
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
