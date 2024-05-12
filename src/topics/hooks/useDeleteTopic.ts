import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import type { Topic } from "../types/Topic.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Slip } from "src/slips/types/Slip.type";

type UseDeleteTopicResponse = {
  deleteTopic: UseMutateAsyncFunction<
    string | undefined,
    Error,
    string,
    unknown
  >;
};

export const useDeleteTopic = (): UseDeleteTopicResponse => {
  const queryClient = useQueryClient();

  const selectedTopicIds = useAtomValue(selectedTopicIdsAtom);

  const mutationFn = async (topicId: string): Promise<string | undefined> => {
    const isTopicDeleted = await pb.collection("topics").delete(topicId);

    if (isTopicDeleted) {
      return topicId;
    }

    return undefined;
  };

  const onSuccess = (data: string | undefined) => {
    if (!data) {
      return;
    }

    queryClient.setQueryData(["topics.list"], (currentTopics: Topic[]) => {
      return currentTopics.filter((topic) => topic.id !== data);
    });

    // remove topic from any slips
    queryClient.setQueryData(
      ["slips.list", selectedTopicIds],
      (currentSlips: Slip[]) => {
        return currentSlips.map((currentSlip) => {
          const slipHasTopic = currentSlip.topics.find(
            (topic) => topic.id === data
          );

          if (!slipHasTopic) {
            return currentSlip;
          }

          return {
            ...currentSlip,
            topics: currentSlip.topics.filter((topic) => topic.id !== data),
          };
        });
      }
    );
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["topics.delete"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { deleteTopic: mutateAsync };
};
