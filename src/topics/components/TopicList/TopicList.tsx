import { useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { Input } from "src/common/components/Input/Input";
import { Modal } from "src/common/components/Modal/Modal";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { useTopics } from "src/topics/hooks/useTopics";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

type TopicsListItemProps = {
  topic: Topic;
  onClickEdit: (topic: Topic) => void;
  onClickDelete: (topic: Topic) => void;
};

const TopicListItem = ({
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

export const TopicList = ({ topics }: TopicsListProps): JSX.Element => {
  const { deleteTopic } = useTopics();

  const [topicToEdit, setTopicToEdit] = useState<Topic | undefined>(undefined);
  const [topicToDelete, setTopicToDelete] = useState<Topic | undefined>(
    undefined
  );

  const onConfirmDelete = async () => {
    if (topicToDelete) {
      deleteTopic(topicToDelete.id);
      setTopicToDelete(undefined);
    }
  };

  const onSave = async () => {
    console.log(topicToEdit?.name);

    setTopicToEdit(undefined);
  };

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

      {/* edit topic modal */}
      <Modal
        visible={!!topicToEdit}
        title={"Edit topic"}
        closeButton={"Cancel"}
        saveButton={"Save"}
        onSave={onSave}
        onClose={() => setTopicToEdit(undefined)}
      >
        <>
          <p className="text-sm">Name</p>
          <Input
            size="medium"
            id={topicToEdit?.id ?? ""}
            value={topicToEdit?.name ?? ""}
            onChange={(e) =>
              setTopicToEdit((topic) =>
                topic ? { ...topic, name: e.target.value } : undefined
              )
            }
          />
        </>
      </Modal>

      {/* delete topic modal */}
      <Modal
        visible={!!topicToDelete}
        title={"Confirm delete topic"}
        closeButton={"Cancel"}
        saveButton={"Confirm"}
        onSave={onConfirmDelete}
        onClose={() => setTopicToDelete(undefined)}
      >
        <p className="text-sm">
          Are you sure you want to delete '{topicToDelete?.name}'?
        </p>
      </Modal>
    </>
  );
};
