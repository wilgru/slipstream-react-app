import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { pb } from "src/connection/pocketbase";
import { selectedJournalIdsAtom } from "src/lib/journals/atoms/selectedJournalIdsAtom";
import type { Journal } from "../types/Journal.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Slip } from "src/lib/slips/types/Slip.type";

type UseDeleteJournalResponse = {
  deleteJournal: UseMutateAsyncFunction<
    string | undefined,
    Error,
    string,
    unknown
  >;
};

export const useDeleteJournal = (): UseDeleteJournalResponse => {
  const queryClient = useQueryClient();

  const selectedJournalIds = useAtomValue(selectedJournalIdsAtom);

  const mutationFn = async (journalId: string): Promise<string | undefined> => {
    const isJournalDeleted = await pb.collection("journals").delete(journalId);

    if (isJournalDeleted) {
      return journalId;
    }

    return undefined;
  };

  const onSuccess = (data: string | undefined) => {
    if (!data) {
      return;
    }

    queryClient.setQueryData(
      ["journals.list"],
      (currentJournals: Journal[]) => {
        return currentJournals.filter((journal) => journal.id !== data);
      }
    );

    // remove journal from any slips
    queryClient.setQueryData(
      ["slips.list", selectedJournalIds],
      (currentSlips: Slip[]) => {
        return currentSlips.map((currentSlip) => {
          const slipHasJournal = currentSlip.journals.find(
            (journal) => journal.id === data
          );

          if (!slipHasJournal) {
            return currentSlip;
          }

          return {
            ...currentSlip,
            journals: currentSlip.journals.filter(
              (journal) => journal.id !== data
            ),
          };
        });
      }
    );
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["journals.delete"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { deleteJournal: mutateAsync };
};
