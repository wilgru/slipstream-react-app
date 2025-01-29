import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Delta from "quill-delta";
import { generateId } from "src/utils/generateId";
import { useGetSlips } from "./useGetSlips";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Slip } from "src/lib/slips/types/Slip.type";

type UseCreateSlipResponse = {
  createSlip: UseMutateAsyncFunction<Slip | undefined, Error, void, unknown>;
};

export const useCreateSlip = (): UseCreateSlipResponse => {
  const queryClient = useQueryClient();
  const { slips } = useGetSlips();

  const mutationFn = async (): Promise<Slip | undefined> => {
    const existingDraftSlip = slips.find((slip) => slip.isDraft);

    if (existingDraftSlip) {
      return undefined;
    }

    const slipId = generateId();
    const slipDraft: Slip = {
      id: slipId,
      isDraft: true,
      title: null,
      content: new Delta(),
      isPinned: false,
      isFlagged: false,
      journals: [],
      tags: [],
      deleted: null,
      created: dayjs(),
      updated: dayjs(),
    };

    return slipDraft;
  };

  const onSuccess = (data: Slip | undefined) => {
    if (!data) {
      return;
    }

    queryClient.setQueryData(["slips.list"], (currentSlips: Slip[]) => [
      ...currentSlips,
      data,
    ]);
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.create"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { createSlip: mutateAsync };
};
