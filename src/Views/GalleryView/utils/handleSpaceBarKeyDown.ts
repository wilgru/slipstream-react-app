import { Dispatch, SetStateAction } from "react";
import { Slip } from "../../../types/Slip.type";

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
