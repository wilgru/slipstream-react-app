import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "src/lib/components/Button/Button";
import { ColourPicker } from "src/lib/components/ColourPicker/ColourPicker";
import { Input } from "src/lib/components/Input/Input";
import { useUpdateJournal } from "src/lib/journal/hooks/useUpdateJournal";
import type { Journal } from "src/lib/journal/types/Journal.type";

type EditJournalModalProps = {
  journal: Journal;
};

export const EditJournalModal = ({ journal }: EditJournalModalProps) => {
  const [editedJournal, setEditedJournal] = useState<Journal>(journal);
  const { updateJournal } = useUpdateJournal();

  const onSaveEdit = async () => {
    if (journal?.id) {
      updateJournal({
        journalId: editedJournal.id,
        updateJournalData: editedJournal,
      });
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
              id={journal.id}
              value={editedJournal.name}
              onChange={(e) =>
                setEditedJournal((currentJournalToEdit) => {
                  return { ...currentJournalToEdit, name: e.target.value };
                })
              }
            />
          </div>

          <div>
            <p className="text-sm">Colour</p>
            <ColourPicker
              selectedColourName={editedJournal.colour}
              onSelectColour={(colour) => {
                setEditedJournal((currentJournalToEdit) => {
                  return { ...currentJournalToEdit, colour: colour.name };
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
