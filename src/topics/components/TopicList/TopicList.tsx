import { TopicListItem } from "src/topics/components/TopicList/subComponents/TopicListItem";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

export const TopicList = ({ topics }: TopicsListProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {topics.map((topic) => (
          <TopicListItem topic={topic}></TopicListItem>
        ))}
      </div>
    </>
  );
};
