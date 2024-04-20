import { isSlipContentEmpty } from "src/slips/utils/isSlipContentEmpty";
import { useDeleteSlip } from "./useDeleteSlips";
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
