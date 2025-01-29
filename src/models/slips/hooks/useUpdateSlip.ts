import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { useGetJournals } from "src/models/journals/hooks/useGetJournals";
import { useUser } from "src/models/users/hooks/useUser";
import { mapSlip } from "../utils/mapSlip";
import { useGetSlips } from "./useGetSlips";
import type { Slip } from "../Slip.type";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Journal } from "src/models/journals/Journal.type";

type UpdateSlipProps = {
  slipId: string;
  updateSlipData: Slip;
};

type UseUpdateSlipResponse = {
  updateSlip: UseMutateAsyncFunction<
    Slip | undefined,
    Error,
    UpdateSlipProps,
    unknown
  >;
};

export const useUpdateSlip = (
  journalToUpdateId?: string
): UseUpdateSlipResponse => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { slips } = useGetSlips();
  const { refetchJournals } = useGetJournals();

  const mutationFn = async ({
    slipId,
    updateSlipData,
  }: UpdateSlipProps): Promise<Slip | undefined> => {
    const slipToUpdate = slips.find((slip) => slip.id === slipId);
    const mappedJournals = updateSlipData.journals.map((journal) => journal.id);

    let updatedSlip;
    if (!slipToUpdate) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...slipData } = updateSlipData;

      // if slip is a draft then its not actually in the db, so persist it
      updatedSlip = await pb.collection("slips").create(
        {
          ...slipData,
          journals: mappedJournals,
          user: user?.id,
        },
        { expand: "journals" }
      );
    } else {
      updatedSlip = await pb
        .collection("slips")
        .update(
          slipId,
          { ...updateSlipData, journals: mappedJournals },
          { expand: "journals" }
        );
    }

    if (updateSlipData.journals.length !== slipToUpdate?.journals.length) {
      await refetchJournals();
    }

    return mapSlip(updatedSlip);
  };

  const onSuccess = (data: Slip | undefined) => {
    queryClient.setQueryData(["slips.list"], (currentSlips: Slip[]) => {
      if (!data) {
        return;
      }

      let hasNewSlipPinnedChanged = false;

      const mappedSlips = currentSlips.map((currentSlip) => {
        if (currentSlip.id === data.id) {
          hasNewSlipPinnedChanged = currentSlip.isPinned !== data.isPinned;

          return data;
        }

        return currentSlip;
      });

      if (!hasNewSlipPinnedChanged) {
        return mappedSlips;
      }

      return mappedSlips.sort((a, b) => {
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1;
        }

        return b.created.isBefore(a.created) ? 1 : -1;
      });
    });

    journalToUpdateId &&
      queryClient.setQueryData(
        ["journals.get", journalToUpdateId],
        (currentJournal: { journal: Journal; slips: Slip[] }) => {
          if (!data) {
            return;
          }

          const updatedSlips = slips.map((currentSlip) => {
            if (currentSlip.id === data.id) {
              return data;
            }

            return currentSlip;
          });

          return {
            journal: currentJournal.journal,
            slips: updatedSlips,
          };
        }
      );
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.update"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { updateSlip: mutateAsync };
};
