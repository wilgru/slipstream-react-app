import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { mapSlip } from "../utils/mapSlip";
import { useGetSlips } from "./useGetSlips";
import type { Slip } from "../types/Slip.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type UpdateSlipProps = {
  slipId: string;
  updateSlipData: Slip;
};

type UseDeleteSlipResponse = {
  updateSlip: UseMutateAsyncFunction<
    Slip | undefined,
    Error,
    UpdateSlipProps,
    unknown
  >;
};

export const useUpdateSlip = (): UseDeleteSlipResponse => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthentication();
  const { slips } = useGetSlips();
  const { refetchTopics } = useGetTopics();

  const selectedTopicIds = useAtomValue(selectedTopicIdsAtom);

  const updateSlip = async ({
    slipId,
    updateSlipData,
  }: UpdateSlipProps): Promise<Slip | undefined> => {
    const slipToUpdate = slips.find((slip) => slip.id === slipId);

    if (!slipToUpdate) {
      return;
    }

    const mappedTopics = updateSlipData.topics.map((topic) => topic.id);

    let updatedSlip;

    // if slip is a draft then its not actually in the db, so persist it
    if (slipToUpdate.isDraft) {
      updatedSlip = await pb.collection("slips").create(
        {
          ...updateSlipData,
          topics: mappedTopics,
          user: currentUser?.id,
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

  // TODO: modifying times not needed yet I dont think
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.update"],
    mutationFn: updateSlip,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["slips.list", selectedTopicIds],
        (currentSlips: Slip[]) => {
          if (!data) {
            return;
          }

          return currentSlips.map((currentSlip) =>
            currentSlip.id === data.id ? data : currentSlip
          );
        }
      );
    },
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { updateSlip: mutateAsync };
};
