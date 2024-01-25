import { Modal } from "src/common/components/Modal/Modal";
import { useTopics } from "src/topics/hooks/useTopics";
import type { Topic } from "src/topics/types/Topic.type";

type TopicListDeleteModalProps = {
  topicToDelete: Topic;
  setTopicToDelete: React.Dispatch<React.SetStateAction<Topic | undefined>>;
};

export const TopicListDeleteModal = ({
  topicToDelete,
  setTopicToDelete,
}: TopicListDeleteModalProps) => {
  const { deleteTopic } = useTopics();

  const onConfirmDelete = async () => {
    if (topicToDelete) {
      deleteTopic(topicToDelete.id);
      setTopicToDelete(undefined);
    }
  };

  return (
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
  );
};
