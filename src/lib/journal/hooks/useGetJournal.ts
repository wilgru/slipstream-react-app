import { useQuery } from "@tanstack/react-query";
import { pb } from "src/pocketbase/pocketbase";
import { mapSlip } from "src/lib/slip/utils/mapSlip";
import { mapJournal } from "../utils/mapJournal";
import type { Journal } from "../types/Journal.type";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { Slip } from "src/lib/slip/types/Slip.type";

type UseJournalResponse = {
  journal: Journal | undefined;
  slips: Slip[];
  refetchJournal: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        journal: Journal;
        slips: Slip[];
      },
      Error
    >
  >;
};

export const useGetJournal = (journalId: string): UseJournalResponse => {
  const queryFn = async (): Promise<{
    journal: Journal;
    slips: Slip[];
  }> => {
    const rawJournal = await pb.collection("journals").getOne(journalId, {
      expand: "slips_via_journals, slips_via_journals.journals",
    });
    const rawSlips = rawJournal.expand?.slips_via_journals;

    const journal: Journal = mapJournal(rawJournal);
    const slips: Slip[] = rawSlips.map(mapSlip);

    return {
      journal,
      slips,
    };
  };

  // TODO: consider time caching for better performance
  const { data, refetch } = useQuery({
    queryKey: ["journals.get", journalId],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    journal: data?.journal,
    slips: data?.slips ?? [],
    refetchJournal: refetch,
  };
};
