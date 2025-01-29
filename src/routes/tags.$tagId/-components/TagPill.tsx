import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { Button } from "src/components/Button/Button";
import { Icon } from "src/components/Icon/Icon";
import type { Journal } from "src/lib/journal/types/Journal.type";

type TagPillProps = {
  journal: Journal;
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  isSelected?: boolean;
  onClick?: (id: string) => void;
};

export const TagPill = ({
  journal,
  size = "sm",
  closable = false,
  isSelected = false,
  onClick,
}: TagPillProps): JSX.Element => {
  const [closeButtonVisible, setCloseButtonVisible] = useState<boolean>(false);

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
          colour={journal.colour}
          size={size}
          onClick={() => onClick && onClick(journal.id)}
          iconName={closable && closeButtonVisible ? "x" : "ChatCircle"}
        >
          {journal.name}
        </Button>
      ) : (
        <Toggle.Root
          className=""
          onClick={() => onClick && onClick(journal.id)}
          pressed={isSelected}
        >
          <Icon iconName="ChatCircle" className={journal.colour.text} />
          {journal.name}
        </Toggle.Root>
      )}
    </div>
  );
};
