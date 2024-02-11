import { useContext, useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { context } from "src/common/context/context";
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
  const { selectedTopicIds, setSelectedTopicIds } = useContext(context);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onClickTopicPill = (topicId: string) => {
    setSelectedTopicIds((currentSelectedTopicIds) => {
      if (currentSelectedTopicIds.includes(topicId)) {
        return currentSelectedTopicIds.filter(
          (selectedTopicId) => selectedTopicId !== topicId
        );
      } else {
        return [...currentSelectedTopicIds, topicId];
      }
    });
  };

  return (
    <div
      className="flex justify-between items-center"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TopicPill
        topic={topic}
        onClick={onClickTopicPill}
        isSelected={selectedTopicIds.includes(topic.id)}
      />

      <div className="flex gap-2">
        {isHovered && (
          <>
            <Button
              styleType="icon"
              icon="pencil"
              iconSize="small"
              onClick={() => onClickEdit(topic)}
            />
            <Button
              styleType="icon"
              icon="bin"
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
