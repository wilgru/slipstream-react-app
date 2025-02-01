import { useQuery } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { mapSlip } from "src/models/slips/utils/mapSlip";
import { groupSlips } from "../utils/groupSlips";
import type { SlipsGroup } from "src/models/slips/Slip.type";

type UseGetSlipsResponse = { slips: SlipsGroup[] };

export const useGetSlips = (
  isFlagged: boolean = false
): UseGetSlipsResponse => {
  const queryFn = async (): Promise<SlipsGroup[]> => {
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

    return groupedSlips;
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
