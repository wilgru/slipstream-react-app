import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { useGetJournals } from "src/models/journals/hooks/useGetJournals";
import { mapJournal } from "../utils/mapJournal";
import type { Journal } from "../Journal.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { SlipsGroup } from "src/models/slips/Slip.type";

type UpdateJournalProps = {
  journalId: string;
  updateJournalData: Journal;
};

type UseUpdateJournalResponse = {
  updateJournal: UseMutateAsyncFunction<
    Journal | undefined,
    Error,
    UpdateJournalProps,
    unknown
  >;
};

export const useUpdateJournal = (): UseUpdateJournalResponse => {
  const queryClient = useQueryClient();
  const { journals } = useGetJournals();

  const mutationFn = async ({
    journalId,
    updateJournalData,
  }: UpdateJournalProps): Promise<Journal | undefined> => {
    // TODO: redundant?
    const journalToUpdate = journals.find(
      (journal) => journal.id === journalId
    );

    if (!journalToUpdate) {
      return;
    }

    const rawUpdatedJournal = await pb
      .collection("journals")
      .update(journalId, {
        ...updateJournalData,
        colour: updateJournalData.colour.name,
      });

    return mapJournal(rawUpdatedJournal);
  };

  const onSuccess = (data: Journal | undefined) => {
    if (!data) {
      return;
    }

    queryClient.setQueryData(
      ["journals.list"],
      (currentJournals: Journal[]) => {
        return currentJournals.map((currentJournal) =>
          currentJournal.id === data.id ? data : currentJournal
        );
      }
    );

    queryClient.setQueryData(
      ["journals.get", data.id],
      (currentJournal: { journal: Journal; slips: SlipsGroup[] }) => {
        return {
          journal: data,
          slips: currentJournal.slips,
        };
      }
    );

    // update journal in any slips that have it
    queryClient.setQueryData(
      ["slips.list"],
      (currentSlipGroups: SlipsGroup[]) => {
        return currentSlipGroups.map((currentSlipGroup) => {
          return currentSlipGroup.slips.map((slip) => {
            return slip.journals.map((journal) => {
              if (journal.id === data.id) {
                return data;
              }

              return journal;
            });
          });
        });
      }
    );
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["journals.update"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { updateJournal: mutateAsync };
};
