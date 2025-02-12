import { useQuery } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { groupSlips } from "src/models/slips/utils/groupSlips";
import { mapSlip } from "src/models/slips/utils/mapSlip";
import { mapJournal } from "../utils/mapJournal";
import type { Journal } from "../Journal.type";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { Slip, SlipGroupDividedByTitle } from "src/models/slips/Slip.type";

type UseJournalResponse = {
  journal: Journal | undefined;
  slips: SlipGroupDividedByTitle[];
  refetchJournal: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        journal: Journal;
        slips: SlipGroupDividedByTitle[];
      },
      Error
    >
  >;
};

export const useGetJournal = (journalId: string): UseJournalResponse => {
  const queryFn = async (): Promise<{
    journal: Journal;
    slips: SlipGroupDividedByTitle[];
  }> => {
    const rawJournal = await pb.collection("journals").getOne(journalId, {
      expand: "slips_via_journals, slips_via_journals.journals",
    });
    const journal: Journal = mapJournal({
      ...rawJournal,
      totalSlips: rawJournal.expand?.slips_via_journals.length ?? 0,
    });

    const rawSlips = rawJournal.expand?.slips_via_journals;
    const slips: Slip[] = rawSlips.map(mapSlip);

    const groupedSlips = groupSlips(slips, journal.groupBy);

    const groupedSlipsDividedByTitle = groupedSlips.map((groupedSlip) => {
      const slipsWithTitles: Slip[] = [];
      const slipsWithNoTitle: Slip[] = [];

      groupedSlip.slips.forEach((slip) => {
        if (slip.title) {
          slipsWithTitles.push(slip);
        } else {
          slipsWithNoTitle.push(slip);
        }
      });

      return {
        title: groupedSlip.title,
        value: groupedSlip.value,
        slips: slipsWithTitles,
        slipsWithNoTitle,
      };
    });

    return {
      journal,
      slips: groupedSlipsDividedByTitle,
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
