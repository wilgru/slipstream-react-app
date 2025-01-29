import { useQuery } from "@tanstack/react-query";
import { pb } from "src/pocketbase/pocketbase";
import { mapJournal } from "../utils/mapJournal";
import type { Journal } from "../types/Journal.type";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type UseGetJournalsResponse = {
  journals: Journal[];
  refetchJournals: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Journal[], Error>>;
};

export const useGetJournals = (): UseGetJournalsResponse => {
  const queryFn = async (): Promise<Journal[]> => {
    const rawJournals = await pb
      .collection("journalsWithSlipCounts")
      .getList(undefined, undefined);

    const mappedJournals = rawJournals.items.map(mapJournal);

    return mappedJournals;
  };

  // TODO: consider time caching for better performance
  const { data, refetch } = useQuery({
    queryKey: ["journals.list"],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { journals: data ?? [], refetchJournals: refetch };
};
