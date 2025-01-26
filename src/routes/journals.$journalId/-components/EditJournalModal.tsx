import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "src/lib/components/Button/Button";
import { ColourPicker } from "src/lib/components/ColourPicker/ColourPicker";
import { Input } from "src/lib/components/Input/Input";
import { useUpdateTopic } from "src/topics/hooks/useUpdateTopic";
import type { Topic } from "src/topics/types/Topic.type";

type EditJournalModalProps = {
  topic: Topic;
};

export const EditJournalModal = ({ topic }: EditJournalModalProps) => {
  const [editedTopic, setEditedTopic] = useState<Topic>(topic);
  const { updateTopic } = useUpdateTopic();

  const onSaveEdit = async () => {
    if (topic?.id) {
      updateTopic({ topicId: editedTopic.id, updateTopicData: editedTopic });
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
      <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] p-4 focus:outline-none bg-stone-100 border border-stone-700 rounded-md">
        <Dialog.Title className="mb-5">Edit journal</Dialog.Title>

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm">Name</p>
            <Input
              size="medium"
              id={topic.id}
              value={editedTopic.name}
              onChange={(e) =>
                setEditedTopic((currentTopicToEdit) => {
                  return { ...currentTopicToEdit, name: e.target.value };
                })
              }
            />
          </div>

          <div>
            <p className="text-sm">Colour</p>
            <ColourPicker
              selectedColourName={editedTopic.colour}
              onSelectColour={(colour) => {
                setEditedTopic((currentTopicToEdit) => {
                  return { ...currentTopicToEdit, colour: colour.name };
                });
              }}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Dialog.Close asChild>
            <Button aria-label="Close" size="sm" variant="ghost">
              Discard
            </Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button aria-label="Confirm" size="sm" onClick={onSaveEdit}>
              Save
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
