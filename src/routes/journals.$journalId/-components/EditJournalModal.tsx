import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button/Button";
import { ColourPicker } from "src/components/ColourPicker/ColourPicker";
import IconPicker from "src/components/IconPicker/IconPicker";
import { Input } from "src/components/Input/Input";
import { useUpdateJournal } from "src/lib/journals/hooks/useUpdateJournal";
import type { Journal } from "src/lib/journals/Journal.type";

type EditJournalModalProps = {
  journal: Journal;
};

export const EditJournalModal = ({ journal }: EditJournalModalProps) => {
  console.log("journal", journal);

  const [editedJournal, setEditedJournal] = useState<Journal>(journal);
  const { updateJournal } = useUpdateJournal();

  // TODO: find better solution than using useEffect
  useEffect(() => {
    setEditedJournal(journal);
  }, [journal]);

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
      <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] p-4 focus:outline-none bg-stone-100 border border-stone-600 rounded-lg">
        <Dialog.Title className="mb-5">Edit journal</Dialog.Title>

        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-sm">Name</h3>
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
            <h3 className="text-sm">Colour</h3>
            <ColourPicker
              selectedColourName={editedJournal.colour.name}
              onSelectColour={(colour) => {
                setEditedJournal((currentJournalToEdit) => {
                  return { ...currentJournalToEdit, colour: colour };
                });
              }}
            />
          </div>

          <div>
            <h3 className="text-sm">Icon</h3>
            <IconPicker
              selectedIconName={editedJournal.icon}
              colour={editedJournal.colour}
              onSelectIcon={(iconName) => {
                setEditedJournal((currentJournalToEdit) => {
                  return { ...currentJournalToEdit, icon: iconName };
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
