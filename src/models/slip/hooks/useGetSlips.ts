import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { pb } from "src/config/pocketbase";
import { mapSlip } from "src/models/slip/utils/mapSlip";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import type { Slip } from "src/models/slip/types/Slip.type";

type UseGetSlipsResponse = { slips: Slip[] };

export const useGetSlips = (): UseGetSlipsResponse => {
  const selectedTopicIds = useAtomValue(selectedTopicIdsAtom);

  const queryFn = async (): Promise<Slip[]> => {
    // for some reason cant use && for the multiple topics filters, which is why slipsWithAllTopics and its logic exists
    const topicsFilter = selectedTopicIds.length
      ? "&& " +
        selectedTopicIds
          .map((topicId) => `topics.id ?= '${topicId}'`)
          .join(" || ")
      : "";

    const rawSlips = await pb
      .collection("slips")
      .getList(undefined, undefined, {
        filter: `deleted = null ${topicsFilter}`,
        expand: "topics",
        sort: "-isPinned",
      });

    const mappedSlips = rawSlips.items.map(mapSlip);

    const slipsWithAllTopics = mappedSlips.filter((mappedSlip) =>
      selectedTopicIds.every((topicId) =>
        mappedSlip.topics.some((topic) => topic.id === topicId)
      )
    );

    return slipsWithAllTopics;
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
