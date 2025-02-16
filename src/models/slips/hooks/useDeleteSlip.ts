import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { useGetJournals } from "src/models/journals/hooks/useGetJournals";
import { useGetSlips } from "./useGetSlips";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type deleteSlipProps = {
  slipId: string;
};

type UseDeleteSlipResponse = {
  deleteSlip: UseMutateAsyncFunction<
    string | undefined,
    Error,
    deleteSlipProps,
    unknown
  >;
};

export const useDeleteSlip = (): UseDeleteSlipResponse => {
  const queryClient = useQueryClient();
  const { slipGroups } = useGetSlips({ isFlagged: false });
  const { refetchJournals } = useGetJournals();

  const mutationFn = async ({
    slipId,
  }: deleteSlipProps): Promise<string | undefined> => {
    const slipToDelete = slipGroups
      .flatMap((slipGroup) => slipGroup.slips)
      .find((slip) => slip.id === slipId);

    if (!slipToDelete) {
      return;
    }

    await pb.collection("slips").delete(slipId);

    if (slipToDelete.journals.length) {
      await refetchJournals();
    }

    return slipId;
  };

  const onSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ["slips.list"],
    });

    queryClient.refetchQueries({
      queryKey: ["journals.get"],
    });
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.delete"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { deleteSlip: mutateAsync };
};
