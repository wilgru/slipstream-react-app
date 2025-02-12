import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { useUser } from "src/models/users/hooks/useUser";
import { mapJournal } from "../utils/mapJournal";
import type { Journal } from "../Journal.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type UseCreateJournalResponse = {
  createJournal: UseMutateAsyncFunction<Journal, Error, string, unknown>;
};

export const useCreateJournal = (): UseCreateJournalResponse => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutationFn = async (journalName: string): Promise<Journal> => {
    const newJournal = await pb.collection("journals").create({
      name: journalName,
      colour: "orange",
      icon: "book",
      user: user?.id,
    });

    const mappedNewJournal = mapJournal({ ...newJournal, totalSlips: 0 });

    return mappedNewJournal;
  };

  const onSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ["journals.list"],
    });
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
