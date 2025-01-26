import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateId } from "src/lib/utils/generateId";
import { pb } from "src/lib/pocketbase/pocketbase";
import { useUser } from "src/lib/user/hooks/useUser";
import { mapTopic } from "../utils/mapTopic";
import type { Topic } from "../types/Topic.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type UseCreateTopicResponse = {
  createTopic: UseMutateAsyncFunction<Topic, Error, string, unknown>;
};

export const useCreateTopic = (): UseCreateTopicResponse => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutationFn = async (topicName: string): Promise<Topic> => {
    const topicId = generateId();

    const newTopic = await pb
      .collection("topics")
      .create({ id: topicId, name: topicName, user: user?.id });

    const mappedNewTopic = mapTopic(newTopic);

    return mappedNewTopic;
  };

  const onSuccess = (data: Topic) => {
    queryClient.setQueryData(["topics.list"], (currentTopics: Topic[]) => [
      ...currentTopics,
      data,
    ]);
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["topics.create"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { createTopic: mutateAsync };
};
