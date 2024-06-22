import { ColourPicker } from "src/common/components/ColourPicker/ColourPicker";
import { Input } from "src/common/components/Input/Input";
import { Modal } from "src/common/components/Modal/Modal";
import { useUpdateTopic } from "src/topics/hooks/useUpdateTopic";
import type { Topic } from "src/topics/types/Topic.type";

type TopicListEditModalProps = {
  topicToEdit: Topic;
  setTopicToEdit: React.Dispatch<React.SetStateAction<Topic | undefined>>;
};

export const TopicListEditModal = ({
  topicToEdit,
  setTopicToEdit,
}: TopicListEditModalProps) => {
  const { updateTopic } = useUpdateTopic();

  const onSaveEdit = async () => {
    if (topicToEdit?.id) {
      updateTopic({ topicId: topicToEdit.id, updateTopicData: topicToEdit });
    }

    setTopicToEdit(undefined);
  };

  return (
    <Modal
      visible={!!topicToEdit}
      title={"Edit topic"}
      closeButton={"Cancel"}
      saveButton={"Save"}
      onSave={onSaveEdit}
      onClose={() => setTopicToEdit(undefined)}
    >
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm">Name</p>
          <Input
            size="medium"
            id={topicToEdit.id}
            value={topicToEdit.name}
            onChange={(e) =>
              setTopicToEdit((currentTopicToEdit) =>
                currentTopicToEdit
                  ? { ...currentTopicToEdit, name: e.target.value }
                  : undefined
              )
            }
          />
        </div>

        <div>
          <p className="text-sm">Colour</p>
          <ColourPicker
            selectedColourName={topicToEdit.colour}
            onSelectColour={(colour) => {
              setTopicToEdit((currentTopicToEdit) =>
                currentTopicToEdit
                  ? { ...currentTopicToEdit, colour: colour.name }
                  : undefined
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
