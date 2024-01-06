import { useState } from "react";
import { Button } from "src/common/components/Button/Button";

type TopicPillProps = {
  size?: "small";
  name: string;
  closable?: boolean;
  onClick?: () => void;
};

export const TopicPill = ({
  size = "small",
  name,
  closable = false,
  onClick,
}: TopicPillProps): JSX.Element => {
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

  return (
    <div
      onMouseOver={() => setCloseBtnVisible(true)}
      onMouseOut={() => setCloseBtnVisible(false)}
    >
      <Button
        styleType="block-outline"
        size={size}
        icon={closable && closeBtnVisible ? "close" : ""}
        iconSize={size}
        onClick={() => onClick && onClick()}
      >
        {name}
      </Button>
    </div>
  );
};
