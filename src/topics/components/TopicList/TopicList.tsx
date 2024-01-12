import { useState } from "react";
import { Input } from "src/common/components/Input/Input";
import { Modal } from "src/common/components/Modal/Modal";
import { TopicListItem } from "src/topics/components/TopicList/TopicListItem";
import { useTopics } from "src/topics/hooks/useTopics";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

export const TopicList = ({ topics }: TopicsListProps): JSX.Element => {
  const { updateTopic, deleteTopic } = useTopics();

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

  const onSaveEdit = async () => {
    if (topicToEdit?.id) {
      updateTopic(topicToEdit.id, topicToEdit);
    }

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
        onSave={onSaveEdit}
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
