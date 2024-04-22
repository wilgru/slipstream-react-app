import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { useGetSlips } from "./useGetSlips";
import type { Slip } from "../types/Slip.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type deleteSlipProps = {
  slipId: string;
  hardDelete?: boolean;
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
  const { slips } = useGetSlips();
  const { refetchTopics } = useGetTopics();

  const selectedTopicIds = useAtomValue(selectedTopicIdsAtom);

  const deleteSlip = async ({
    slipId,
    hardDelete = false,
  }: deleteSlipProps): Promise<string | undefined> => {
    const slipToDelete = slips.find((slip) => slip.id === slipId);

    if (!slipToDelete) {
      return;
    }

    // instead of delete from db, again because its not in the db just remove it from the slips array state
    if (slipToDelete.isDraft) {
      return slipId;
    }

    if (hardDelete) {
      await pb.collection("slips").delete(slipId);
    } else {
      await pb
        .collection("slips")
        .update(slipId, { ...slipToDelete, deleted: dayjs() });
    }

    if (slipToDelete.topics.length) {
      refetchTopics();
    }

    return slipId;
  };

  // TODO: modifying times not needed yet I dont think
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.delete"],
    mutationFn: deleteSlip,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["slips.list", selectedTopicIds],
        (currentSlips: Slip[]) =>
          data
            ? currentSlips.filter((currentSlip) => currentSlip.id !== data)
            : currentSlips
      );
    },
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { deleteSlip: mutateAsync };
};
