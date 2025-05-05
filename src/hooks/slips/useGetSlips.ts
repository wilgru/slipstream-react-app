import { useQuery } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { groupSlips } from "src/utils/slips/groupSlips";
import { mapSlip } from "src/utils/slips/mapSlip";
import type { TableOfContentsItem } from "src/components/TableOfContents/TableOfContents";
import type { SlipsGroup } from "src/types/Slip.type";

type UseGetSlipsResponse = {
  slipGroups: SlipsGroup[];
  tableOfContentItems: TableOfContentsItem[];
};

export const useGetSlips = ({
  isFlagged,
}: {
  isFlagged: boolean;
}): UseGetSlipsResponse => {
  const queryFn = async (): Promise<{
    slipGroups: SlipsGroup[];
    tableOfContentItems: TableOfContentsItem[];
  }> => {
    const filter = `deleted = null ${isFlagged ? "&& isFlagged = true" : ""}`;

    const rawSlips = await pb
      .collection("slips")
      .getList(undefined, undefined, {
        filter,
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
    queryKey: ["slips.list", isFlagged],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    slipGroups: data?.slipGroups ?? [],
    tableOfContentItems: data?.tableOfContentItems ?? [],
  };
};
