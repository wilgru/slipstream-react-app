import { useQuery } from "@tanstack/react-query";
import { pb } from "src/config/pocketbase";
import { mapSlip } from "src/models/slip/utils/mapSlip";
import type { Journal } from "../types/Journal.type";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type UseJournalResponse = {
  journal: Journal | undefined;
  refetchJournal: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Journal, Error>>;
};

export const useJournal = (journalId: string): UseJournalResponse => {
  const queryFn = async (): Promise<Journal> => {
    const rawJournal = await pb.collection("topics").getOne(journalId, {
      expand: "slips_via_topics",
    });

    const rawSlips = rawJournal.expand?.slips_via_topics;

    const journal: Journal = {
      id: rawJournal.id,
      name: rawJournal.name,
      colour: rawJournal.colour,
      slips: rawSlips.map(mapSlip),
    };

    return journal;
  };

  // TODO: consider time caching for better performance
  const { data, refetch } = useQuery({
    queryKey: ["journal.get", journalId],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { journal: data, refetchJournal: refetch };
};
