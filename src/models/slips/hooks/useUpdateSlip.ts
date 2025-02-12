import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { mapSlip } from "../utils/mapSlip";
import type { Slip, SlipsGroup } from "../Slip.type";
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

  const mutationFn = async ({
    slipId,
    updateSlipData,
  }: UpdateSlipProps): Promise<Slip | undefined> => {
    const journalIds = updateSlipData.journals.map((journal) => journal.id);

    const updatedSlip = await pb
      .collection("slips")
      .update(
        slipId,
        { ...updateSlipData, journals: journalIds },
        { expand: "journals" }
      );

    return mapSlip(updatedSlip);
  };

  const onSuccess = (data: Slip | undefined) => {
    if (!data) {
      return;
    }

    queryClient.setQueryData(
      ["slips.list"],
      (currentSlipGroups: SlipsGroup[]) => {
        let hasNewSlipPinnedChanged = false;

        const mappedSlipGroups = currentSlipGroups.map((currentSlipGroup) => {
          const updatedSlips = currentSlipGroup.slips.map((currentSlip) => {
            if (currentSlip.id === data.id) {
              hasNewSlipPinnedChanged =
                currentSlip.isPinned !== data.isPinned ||
                hasNewSlipPinnedChanged;

              return data;
            }

            return currentSlip;
          });

          if (!hasNewSlipPinnedChanged) {
            return {
              ...currentSlipGroup,
              slips: updatedSlips,
            };
          }

          const sortedSlips = updatedSlips.sort((a, b) => {
            if (a.isPinned !== b.isPinned) {
              return a.isPinned ? -1 : 1;
            }

            return b.created.isBefore(a.created) ? 1 : -1;
          });

          return {
            ...currentSlipGroup,
            slips: sortedSlips,
          };
        });

        return mappedSlipGroups;
      }
    );

    if (journalToUpdateId) {
      queryClient.setQueryData(
        ["journals.get", journalToUpdateId],
        (currentJournal: { journal: Journal; slips: SlipsGroup[] }) => {
          const updatedSlipsGroups = currentJournal.slips.map(
            (currentSlipGroup) => {
              const updatedSlips = currentSlipGroup.slips.map((currentSlip) => {
                if (currentSlip.id === data.id) {
                  return data;
                }

                return currentSlip;
              });

              return {
                ...currentSlipGroup,
                slips: updatedSlips,
              };
            }
          );

          return {
            journal: currentJournal.journal,
            slips: updatedSlipsGroups,
          };
        }
      );
    }
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
