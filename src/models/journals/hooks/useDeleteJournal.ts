import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

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

    queryClient.refetchQueries({
      queryKey: ["journals.list"],
    });

    // remove journal from any slips
    queryClient.refetchQueries({
      queryKey: ["slips.list"],
    });
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
