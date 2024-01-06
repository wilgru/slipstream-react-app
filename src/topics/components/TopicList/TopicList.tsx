import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

type TopicsListItemProps = {
  topic: Topic;
};

const TopicListItem = ({ topic }: TopicsListItemProps) => {
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

  return (
    <div
      className="flex justify-between items-center"
      onMouseOver={() => setCloseBtnVisible(true)}
      onMouseLeave={() => setCloseBtnVisible(false)}
    >
      <TopicPill name={topic.name} />

      {closeBtnVisible ? (
        <Button styleType="icon" icon="close" iconSize="small" />
      ) : (
        <p className="text-xs text-stone-500 w-2 text-center">
          {topic.slipCount}
        </p>
      )}
    </div>
  );
};

export const TopicList = ({ topics }: TopicsListProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      {topics.map((topic) => (
        <TopicListItem topic={topic}></TopicListItem>
      ))}
    </div>
  );
};
