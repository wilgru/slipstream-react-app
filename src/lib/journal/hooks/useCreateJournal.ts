import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/pocketbase/pocketbase";
import { useUser } from "src/lib/user/hooks/useUser";
import { generateId } from "src/utils/generateId";
import { mapJournal } from "../utils/mapJournal";
import type { Journal } from "../types/Journal.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type UseCreateJournalResponse = {
  createJournal: UseMutateAsyncFunction<Journal, Error, string, unknown>;
};

export const useCreateJournal = (): UseCreateJournalResponse => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutationFn = async (journalName: string): Promise<Journal> => {
    const journalId = generateId();

    const newJournal = await pb
      .collection("journals")
      .create({ id: journalId, name: journalName, user: user?.id });

    const mappedNewJournal = mapJournal(newJournal);

    return mappedNewJournal;
  };

  const onSuccess = (data: Journal) => {
    queryClient.setQueryData(
      ["journals.list"],
      (currentJournals: Journal[]) => [...currentJournals, data]
    );
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["journals.create"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { createJournal: mutateAsync };
};
