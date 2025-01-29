import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "src/components/Button/Button";
import { useDeleteJournal } from "src/lib/journal/hooks/useDeleteJournal";
import type { Journal } from "src/lib/journal/types/Journal.type";

type DeleteJournalModalProps = {
  journal: Journal;
};

export const DeleteJournalModal = ({ journal }: DeleteJournalModalProps) => {
  const { deleteJournal } = useDeleteJournal();

  const onConfirmDelete = async () => {
    if (journal) {
      deleteJournal(journal.id);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
      <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] p-4 focus:outline-none bg-stone-100 border border-stone-700 rounded-md">
        <Dialog.Title className="mb-5">Confirm delete journal</Dialog.Title>
        <Dialog.Description className="mb-5">
          <p className="text-sm">
            Are you sure you want to delete '{journal?.name}'?
          </p>
        </Dialog.Description>

        <div className="flex gap-2 justify-end">
          <Dialog.Close asChild>
            <Button aria-label="Close">Cancel</Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button aria-label="Confirm" onClick={onConfirmDelete}>
              Confirm
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
