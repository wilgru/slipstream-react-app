import { useQuery } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { mapSlip } from "src/utils/slips/mapSlip";
import type { Slip } from "src/types/Slip.type";

type UseGetSlipsResponse = {
  slips: Slip[];
};

export const useGetSlips = ({
  isFlagged,
}: {
  isFlagged: boolean;
}): UseGetSlipsResponse => {
  const queryFn = async (): Promise<{
    slips: Slip[];
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

    return { slips: mappedSlips };
  };

  // TODO: consider time caching for better performance
  const { data } = useQuery({
    queryKey: ["slips.list", isFlagged],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    slips: data?.slips ?? [],
  };
};
