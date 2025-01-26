import { useQuery } from "@tanstack/react-query";
import { pb } from "src/lib/pocketbase/pocketbase";
import { mapTopic } from "../utils/mapTopic";
import type { Topic } from "../types/Topic.type";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type UseGetTopicsResponse = {
  topics: Topic[];
  refetchTopics: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Topic[], Error>>;
};

export const useGetTopics = (): UseGetTopicsResponse => {
  const queryFn = async (): Promise<Topic[]> => {
    const rawTopics = await pb
      .collection("topicsWithSlipCounts")
      .getList(undefined, undefined);

    const mappedTopics = rawTopics.items.map(mapTopic);

    return mappedTopics;
  };

  // TODO: consider time caching for better performance
  const { data, refetch } = useQuery({
    queryKey: ["topics.list"],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { topics: data ?? [], refetchTopics: refetch };
};
