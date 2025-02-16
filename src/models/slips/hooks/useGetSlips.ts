import { useQuery } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { mapSlip } from "src/models/slips/utils/mapSlip";
import { groupSlips } from "../utils/groupSlips";
import type { TableOfContentsItem } from "src/components/TableOfContents/TableOfContents";
import type { SlipsGroup } from "src/models/slips/Slip.type";

type UseGetSlipsResponse = {
  slipGroups: SlipsGroup[];
  tableOfContentItems: TableOfContentsItem[];
};

export const useGetSlips = (
  isFlagged: boolean = false
): UseGetSlipsResponse => {
  const queryFn = async (): Promise<{
    slipGroups: SlipsGroup[];
    tableOfContentItems: TableOfContentsItem[];
  }> => {
    const isFlaggedFilter = isFlagged ? "&& isFlagged = true" : "";

    const rawSlips = await pb
      .collection("slips")
      .getList(undefined, undefined, {
        filter: `deleted = null ${isFlaggedFilter}`,
        expand: "journals",
        sort: "-isPinned",
      });

    const mappedSlips = rawSlips.items.map(mapSlip);
    const groupedSlips = groupSlips(mappedSlips, "created");

    const tableOfContentItems = mappedSlips.reduce(
      (acc: TableOfContentsItem[], slip) => {
        const monthTitle = slip.created.format("MMMM YYYY");
        const existingMonth = acc.find((item) => item.title === monthTitle);

        if (!existingMonth) {
          acc.push({
            title: monthTitle,
            navigationId: null,
            subItems: [
              {
                title: slip.created.format("dddd D"),
                navigationId: slip.created.format("ddd D MMMM YYYY"),
                subItems: [],
              },
            ],
          });

          return acc;
        }

        const dayTitle = slip.created.format("dddd D");
        const existingDay = existingMonth.subItems.find(
          (item) => item.title === dayTitle
        );

        if (!existingDay) {
          existingMonth.subItems.push({
            title: slip.created.format("dddd D"),
            navigationId: slip.created.format("ddd D MMMM YYYY"),
            subItems: [],
          });
        }

        return acc;
      },
      []
    );

    return { slipGroups: groupedSlips, tableOfContentItems };
  };

  // TODO: consider time caching for better performance
  const { data } = useQuery({
    queryKey: ["slips.list"],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    slipGroups: data?.slipGroups ?? [],
    tableOfContentItems: data?.tableOfContentItems ?? [],
  };
};
