import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { Modal } from "src/common/components/Modal/Modal";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

type TopicsListItemProps = {
  topic: Topic;
  onClickDelete: (topic: Topic) => void;
};

const TopicListItem = ({ topic, onClickDelete }: TopicsListItemProps) => {
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
          <Button
            styleType="icon"
            icon="close"
            iconSize="small"
            onClick={() => onClickDelete(topic)}
          />
        )}
        <p className="text-xs text-stone-500 w-2 text-center">
          {topic.slipCount}
        </p>
      </div>
    </div>
  );
};

export const TopicList = ({ topics }: TopicsListProps): JSX.Element => {
  const [topicToDelete, setTopicToDelete] = useState<Topic | undefined>(
    undefined
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        {topics.map((topic) => (
          <TopicListItem
            topic={topic}
            onClickDelete={setTopicToDelete}
          ></TopicListItem>
        ))}
      </div>

      <Modal
        visible={!!topicToDelete}
        title={"Confirm delete topic"}
        closeButton={"Cancel"}
        saveButton={"Confirm"}
        onSave={() => setTopicToDelete(undefined)}
        onClose={() => setTopicToDelete(undefined)}
      >
        <p className="text-xs">
          Are you sure you want to delete '{topicToDelete?.name}'?
        </p>
      </Modal>
    </>
  );
};
