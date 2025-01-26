import * as Toggle from "@radix-ui/react-toggle";
import { useState } from "react";
import { customisationColours } from "src/lib/colour/constants/customisationColours";
import { Button } from "src/lib/components/Button/Button";
import { Icon } from "src/lib/components/Icon/Icon";
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

  const journalCustomisationColour = customisationColours.find(
    (colour) => colour.name === journal.colour
  );

  const journalButtonColour = journalCustomisationColour
    ? journalCustomisationColour?.textClass
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
          colour={journalButtonColour}
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
          <Icon iconName="ChatCircle" className={journalButtonColour} />
          {journal.name}
        </Toggle.Root>
      )}
    </div>
  );
};
