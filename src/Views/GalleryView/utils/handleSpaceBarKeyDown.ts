import type { Slip } from "../../../types/Slip.type";
import type { Dispatch, SetStateAction } from "react";

export const handleSpaceBarKeyDown = (
  setOpenSlip: Dispatch<SetStateAction<Slip | null>>,
  sortedSlips: Slip[],
  focusedSlipId: string | null
) => {
  setOpenSlip((currentOpenSlip) => {
    const focusedSlip =
      sortedSlips.find((sortedSlip) => sortedSlip.id === focusedSlipId) ?? null;

    return !currentOpenSlip ? focusedSlip : null;
  });
};
