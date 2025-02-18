import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "src/components/Button/Button";
import { colours } from "src/constants/colours.constant";
import { useDeleteJournal } from "src/hooks/journals/useDeleteJournal";
import type { Journal } from "src/types/Journal.type";

type DeleteJournalModalProps = {
  journal: Journal;
};

export const DeleteJournalModal = ({ journal }: DeleteJournalModalProps) => {
  const { deleteJournal } = useDeleteJournal();

  const onConfirmDelete = async () => {
    if (journal) {
      await deleteJournal(journal.id);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
      <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] p-4 focus:outline-none bg-stone-100 border border-stone-700 rounded-lg">
        <Dialog.Title className="mb-5">Confirm delete journal</Dialog.Title>
        <Dialog.Description className="mb-5">
          <p className="text-sm">
            Are you sure you want to delete '{journal?.name}'?
          </p>
        </Dialog.Description>

        <div className="flex gap-2 justify-end">
          <Dialog.Close asChild>
            <Button variant="ghost">Cancel</Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button colour={colours.red} onClick={onConfirmDelete}>
              Confirm
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
