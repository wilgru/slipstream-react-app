import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListItemProps = {
  topic: Topic;
  onClickEdit: (topic: Topic) => void;
  onClickDelete: (topic: Topic) => void;
};

export const TopicListItem = ({
  topic,
  onClickEdit,
  onClickDelete,
}: TopicsListItemProps) => {
  const [deleteBtnVisible, setDeleteBtnVisible] = useState<boolean>(false);

  return (
    <div
      className="flex justify-between items-center"
      onMouseOver={() => setDeleteBtnVisible(true)}
      onMouseLeave={() => setDeleteBtnVisible(false)}
    >
      <TopicPill name={topic.name} />

      <div className="flex gap-2">
        {deleteBtnVisible && (
          <>
            <Button
              styleType="icon"
              icon="pencil"
              iconSize="small"
              onClick={() => onClickEdit(topic)}
            />
            <Button
              styleType="icon"
              icon="close"
              iconSize="small"
              onClick={() => onClickDelete(topic)}
            />
          </>
        )}
        <p className="text-xs text-stone-500 w-2 text-center">
          {topic.slipCount}
        </p>
      </div>
    </div>
  );
};
