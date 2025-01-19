import { isSlipContentEmpty } from "src/models/slip/utils/isSlipContentEmpty";
import { useDeleteSlip } from "./useDeleteSlip";
import { useGetSlips } from "./useGetSlips";

export const usePurgeEmptySlips = () => {
  const { slips } = useGetSlips();
  const { deleteSlip } = useDeleteSlip();

  const purgeEmptySlips = () => {
    slips.forEach((slip) => {
      if (!slip.title && isSlipContentEmpty(slip.content)) {
        deleteSlip({ slipId: slip.id });
      }
    });
  };

  return { purgeEmptySlips };
};
