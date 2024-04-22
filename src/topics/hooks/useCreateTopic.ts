import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { generateId } from "src/pocketbase/utils/generateId";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { mapTopic } from "../utils/mapTopic";
import type { Topic } from "../types/Topic.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type UseCreateTopicResponse = {
  createTopic: UseMutateAsyncFunction<Topic, Error, string, unknown>;
};

export const useCreateTopic = (): UseCreateTopicResponse => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthentication();

  const createTopic = async (topicName: string): Promise<Topic> => {
    const topicId = generateId();

    const newTopic = await pb
      .collection("topics")
      .create({ id: topicId, name: topicName, user: currentUser?.id });

    const mappedNewTopic = mapTopic(newTopic);

    return mappedNewTopic;
  };

  // TODO: modifying times not needed yet I dont think
  const { mutateAsync } = useMutation({
    mutationKey: ["topics.create"],
    mutationFn: createTopic,
    onSuccess: (data) => {
      queryClient.setQueryData(["topics.list"], (currentTopics: Topic[]) => [
        ...currentTopics,
        data,
      ]);
    },
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { createTopic: mutateAsync };
};
