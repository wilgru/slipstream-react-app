import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { selectedJournalIdsAtom } from "src/lib/journal/atoms/selectedJournalIdsAtom";
import { pb } from "src/connection/pocketbase";
import { mapSlip } from "src/lib/slip/utils/mapSlip";
import type { Slip } from "src/lib/slip/types/Slip.type";

type UseGetSlipsResponse = { slips: Slip[] };

export const useGetSlips = (): UseGetSlipsResponse => {
  const selectedJournalIds = useAtomValue(selectedJournalIdsAtom);

  const queryFn = async (): Promise<Slip[]> => {
    // for some reason cant use && for the multiple journals filters, which is why slipsWithAllJournals and its logic exists
    const journalsFilter = selectedJournalIds.length
      ? "&& " +
        selectedJournalIds
          .map((journalId) => `journals.id ?= '${journalId}'`)
          .join(" || ")
      : "";

    const rawSlips = await pb
      .collection("slips")
      .getList(undefined, undefined, {
        filter: `deleted = null ${journalsFilter}`,
        expand: "journals",
        sort: "-isPinned",
      });

    const mappedSlips = rawSlips.items.map(mapSlip);

    const slipsWithAllJournals = mappedSlips.filter((mappedSlip) =>
      selectedJournalIds.every((journalId) =>
        mappedSlip.journals.some((journal) => journal.id === journalId)
      )
    );

    return slipsWithAllJournals;
  };

  // TODO: consider time caching for better performance
  const { data } = useQuery({
    queryKey: ["slips.list"],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { slips: data ?? [] };
};
