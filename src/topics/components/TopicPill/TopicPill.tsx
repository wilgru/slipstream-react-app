import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { Toggle } from "src/common/components/Toggle/Toggle";

type TopicPillProps = {
  id: string;
  name: string;
  size?: "small";
  closable?: boolean;
  isSelected: boolean;
  onClick?: (id: string) => void;
};

export const TopicPill = ({
  id,
  name,
  size = "small",
  closable = false,
  isSelected,
  onClick,
}: TopicPillProps): JSX.Element => {
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

  return (
    <div
      onMouseOver={() => setCloseBtnVisible(true)}
      onMouseOut={() => setCloseBtnVisible(false)}
    >
      {closable ? (
        <Button
          styleType="block-outline"
          size={size}
          icon={closable && closeBtnVisible ? "close" : ""}
          iconSize={size}
          onClick={() => onClick && onClick(id)}
        >
          {name}
        </Button>
      ) : (
        <Toggle
          styleType="block"
          size={size}
          iconSize={size}
          onClick={() => onClick && onClick(id)}
          isToggled={isSelected}
        >
          {name}
        </Toggle>
      )}
    </div>
  );
};
