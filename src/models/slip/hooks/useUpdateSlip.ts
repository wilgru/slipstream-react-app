import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "src/authentication/hooks/useUser";
import { pb } from "src/config/pocketbase";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { mapSlip } from "../utils/mapSlip";
import { useGetSlips } from "./useGetSlips";
import type { Slip } from "../types/Slip.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

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
  const { user } = useUser();
  const { slips } = useGetSlips();
  const { refetchTopics } = useGetTopics();

  const mutationFn = async ({
    slipId,
    updateSlipData,
  }: UpdateSlipProps): Promise<Slip | undefined> => {
    const slipToUpdate = slips.find((slip) => slip.id === slipId);
    const mappedTopics = updateSlipData.topics.map((topic) => topic.id);

    let updatedSlip;
    if (!slipToUpdate) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...slipData } = updateSlipData;

      // if slip is a draft then its not actually in the db, so persist it
      updatedSlip = await pb.collection("slips").create(
        {
          ...slipData,
          topics: mappedTopics,
          user: user?.id,
        },
        { expand: "topics" }
      );
    } else {
      updatedSlip = await pb
        .collection("slips")
        .update(
          slipId,
          { ...updateSlipData, topics: mappedTopics },
          { expand: "topics" }
        );
    }

    if (updateSlipData.topics.length !== slipToUpdate?.topics.length) {
      await refetchTopics();
    }

    return mapSlip(updatedSlip);
  };

  const onSuccess = (data: Slip | undefined) => {
    queryClient.setQueryData(["slips.list"], (currentSlips: Slip[]) => {
      if (!data) {
        return;
      }

      let hasNewSlipPinnedChanged = false;

      const mappedSlips = currentSlips.map((currentSlip) => {
        if (currentSlip.id === data.id) {
          hasNewSlipPinnedChanged = currentSlip.isPinned !== data.isPinned;

          return data;
        }

        return currentSlip;
      });

      if (!hasNewSlipPinnedChanged) {
        return mappedSlips;
      }

      return mappedSlips.sort((a, b) => {
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1;
        }

        return b.created.isBefore(a.created) ? 1 : -1;
      });
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
