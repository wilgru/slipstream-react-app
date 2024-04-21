import { useQuery } from "@tanstack/react-query";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
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
  const getTopics = async (): Promise<Topic[]> => {
    const rawTopics = await pb
      .collection("topicsWithSlipCounts")
      .getList(undefined, undefined);

    const mappedTopics = rawTopics.items.map(mapTopic);

    return mappedTopics;
  };

  // TODO: modifying times not needed yet I dont think
  const { data, refetch } = useQuery({
    queryKey: ["topics.list"],
    queryFn: getTopics,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { topics: data ?? [], refetchTopics: refetch };
};
