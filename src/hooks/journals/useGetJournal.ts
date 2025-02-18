import { useQuery } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { mapJournal } from "src/utils/journals/mapJournal";
import { groupSlips } from "src/utils/slips/groupSlips";
import { mapSlip } from "src/utils/slips/mapSlip";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { TableOfContentsItem } from "src/components/TableOfContents/TableOfContents";
import type { Journal } from "src/types/Journal.type";
import type { Slip, SlipsGroupDividedByTitle } from "src/types/Slip.type";

type UseJournalResponse = {
  journal: Journal | undefined;
  slipGroups: SlipsGroupDividedByTitle[];
  tableOfContentItems: TableOfContentsItem[];
  refetchJournal: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        journal: Journal;
        slipGroups: SlipsGroupDividedByTitle[];
      },
      Error
    >
  >;
};

export const useGetJournal = (journalId: string): UseJournalResponse => {
  const queryFn = async (): Promise<{
    journal: Journal;
    slipGroups: SlipsGroupDividedByTitle[];
    tableOfContentItems: TableOfContentsItem[];
  }> => {
    const rawJournal = await pb.collection("journals").getOne(journalId, {
      expand: "slips_via_journals, slips_via_journals.journals",
    });

    const journal: Journal = mapJournal({
      ...rawJournal,
      totalSlips: rawJournal.expand?.slips_via_journals?.length ?? 0,
    });

    const rawSlips = rawJournal.expand?.slips_via_journals ?? [];
    const slips: Slip[] = rawSlips.map(mapSlip);

    const groupedSlips: SlipsGroupDividedByTitle[] = groupSlips(
      slips,
      journal.groupBy,
      true
    );

    const tableOfContentItems: TableOfContentsItem[] = groupedSlips.map(
      (slipGroup) => {
        const mappedSlipsWithNoTitle = slipGroup.slipsWithNoTitle.map(
          (slipWithNoTitle) => {
            const title = slipWithNoTitle.content.ops[0].insert;

            return {
              title: typeof title === "string" ? title : "No title",
              navigationId: slipWithNoTitle.id,
              italic: true,
              subItems: [],
            };
          }
        );

        const mappedSlipsWithTitle = slipGroup.slipsWithTitle.map(
          (slipWithTitle) => ({
            title: slipWithTitle.title ?? "", // this should never fallback to empty string as empty titles are filtered beforehand
            navigationId: slipWithTitle.id,
            subItems: [],
          })
        );

        return {
          title: slipGroup.title,
          navigationId: null,
          subItems: [...mappedSlipsWithNoTitle, ...mappedSlipsWithTitle],
        };
      }
    );

    return {
      journal,
      slipGroups: groupedSlips,
      tableOfContentItems,
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
    slipGroups: data?.slipGroups ?? [],
    tableOfContentItems: data?.tableOfContentItems ?? [],
    refetchJournal: refetch,
  };
};
