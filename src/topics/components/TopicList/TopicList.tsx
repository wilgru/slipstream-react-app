import { useState } from "react";
import { TopicListEditModal } from "src/topics/components/TopicList/subComponents/TopicListEditModal";
import { TopicListItem } from "src/topics/components/TopicList/subComponents/TopicListItem";
import { TopicListDeleteModal } from "./subComponents/TopicListDeleteModal";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

export const TopicList = ({ topics }: TopicsListProps): JSX.Element => {
  const [topicToEdit, setTopicToEdit] = useState<Topic | undefined>(undefined);
  const [topicToDelete, setTopicToDelete] = useState<Topic | undefined>(
    undefined
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        {topics.map((topic) => (
          <TopicListItem
            topic={topic}
            onClickEdit={setTopicToEdit}
            onClickDelete={setTopicToDelete}
          ></TopicListItem>
        ))}
      </div>

      {topicToEdit && (
        <TopicListEditModal
          topicToEdit={topicToEdit}
          setTopicToEdit={setTopicToEdit}
        />
      )}

      {topicToDelete && (
        <TopicListDeleteModal
          topicToDelete={topicToDelete}
          setTopicToDelete={setTopicToDelete}
        />
      )}
    </>
  );
};
