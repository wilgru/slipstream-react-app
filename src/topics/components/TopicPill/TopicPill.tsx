import { useState } from "react";
import { Button } from "src/common/components/Button/Button";

type TopicPillProps = {
  size?: "medium";
  name: string;
  closable?: boolean;
  onClose?: () => void;
};

enum TopicPillSize {
  "medium" = "p-1",
}

export const TopicPill = ({
  size = "medium",
  name,
  closable = false,
  onClose,
}: TopicPillProps): JSX.Element => {
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

  const topicPillBaseStyle =
    "flex items-center gap-1 border border-stone-700 bg-stone-300 text-stone-700 text-xs";
  const topicPillSize = TopicPillSize[size];

  const topicPillStyles = [topicPillBaseStyle, topicPillSize].join(" ");

  return (
    <div
      className={topicPillStyles}
      onMouseOver={() => setCloseBtnVisible(true)}
      onMouseOut={() => setCloseBtnVisible(false)}
    >
      {name}
      {closable && closeBtnVisible && (
        <Button
          styleType="icon"
          icon="close"
          iconSize="small"
          onClick={() => onClose && onClose()}
        />
      )}
    </div>
  );
};
