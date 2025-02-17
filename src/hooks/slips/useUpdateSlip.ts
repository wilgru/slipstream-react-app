import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { mapSlip } from "src/utils/slips/mapSlip";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Slip } from "src/types/Slip.type";

type UpdateSlipProps = {
  slipId: string;
  updateSlipData: Slip;
};

type UseUpdateSlipResponse = {
  updateSlip: UseMutateAsyncFunction<
    Slip | undefined,
    Error,
    UpdateSlipProps,
    unknown
  >;
};

export const useUpdateSlip = (): UseUpdateSlipResponse => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    slipId,
    updateSlipData,
  }: UpdateSlipProps): Promise<Slip | undefined> => {
    const journalIds = updateSlipData.journals.map((journal) => journal.id);

    const updatedSlip = await pb
      .collection("slips")
      .update(
        slipId,
        { ...updateSlipData, journals: journalIds },
        { expand: "journals" }
      );

    return mapSlip(updatedSlip);
  };

  const onSuccess = (data: Slip | undefined) => {
    if (!data) {
      return;
    }

    queryClient.refetchQueries({
      queryKey: ["slips.list"],
    });

    queryClient.refetchQueries({
      queryKey: ["journals.get"],
    });
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.update"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { updateSlip: mutateAsync };
};
