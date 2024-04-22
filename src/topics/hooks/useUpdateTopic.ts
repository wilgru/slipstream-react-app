import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { mapTopic } from "../utils/mapTopic";
import type { Topic } from "../types/Topic.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Slip } from "src/slips/types/Slip.type";

type UpdateTopicProps = {
  topicId: string;
  updateTopicData: Topic;
};

type UseUpdateTopicResponse = {
  updateTopic: UseMutateAsyncFunction<
    Topic | undefined,
    Error,
    UpdateTopicProps,
    unknown
  >;
};

export const useUpdateTopic = (): UseUpdateTopicResponse => {
  const queryClient = useQueryClient();
  const { topics } = useGetTopics();

  const selectedTopicIds = useAtomValue(selectedTopicIdsAtom);

  const updateTopic = async ({
    topicId,
    updateTopicData,
  }: UpdateTopicProps): Promise<Topic | undefined> => {
    const topicToUpdate = topics.find((topic) => topic.id === topicId);

    if (!topicToUpdate) {
      return;
    }

    const rawUpdatedTopic = await pb
      .collection("topics")
      .update(topicId, { ...updateTopicData });

    return mapTopic(rawUpdatedTopic);
  };

  // TODO: modifying times not needed yet I dont think
  const { mutateAsync } = useMutation({
    mutationKey: ["topics.update"],
    mutationFn: updateTopic,
    onSuccess: (data) => {
      if (!data) {
        return;
      }

      queryClient.setQueryData(["topics.list"], (currentTopic: Topic[]) => {
        return currentTopic.map((currentTopic) =>
          currentTopic.id === data.id ? data : currentTopic
        );
      });

      // update topic in any slips that have it
      queryClient.setQueryData(
        ["slips.list", selectedTopicIds],
        (currentSlips: Slip[]) => {
          return currentSlips.map((currentSlip) => {
            const slipHasTopic = currentSlip.topics.find(
              (topic) => topic.id === data?.id
            );

            if (!slipHasTopic) {
              return currentSlip;
            }

            return {
              ...currentSlip,
              topics: currentSlip.topics.map((topic) =>
                topic.id === data.id ? data : topic
              ),
            };
          });
        }
      );
    },
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { updateTopic: mutateAsync };
};
