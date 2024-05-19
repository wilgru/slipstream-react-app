import { Pencil, Trash } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
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
  const [selectedTopicIds, setSelectedTopicIds] = useAtom(selectedTopicIdsAtom);
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
              onClick={() => onClickEdit(topic)}
              icon={() => <Pencil size={16} weight="bold" />}
            />
            <Button
              styleType="icon"
              onClick={() => onClickDelete(topic)}
              icon={() => <Trash size={16} weight="bold" />}
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
