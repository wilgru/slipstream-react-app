import type { Slip } from "../../../types/Slip.type";
import type { Dispatch, SetStateAction } from "react";

export const handleArrowLeftKeyDown = (
  setFocusedSlipId: Dispatch<SetStateAction<string | null>>,
  setOpenSlip: Dispatch<SetStateAction<Slip | null>>,
  sortedSlips: Slip[]
) => {
  setFocusedSlipId((currentFocusedSlipId) => {
    const currentFocusedSlipIndex = sortedSlips.findIndex(
      (sortedSlip) => sortedSlip.id === currentFocusedSlipId
    );

    const nextSlipsIndex =
      currentFocusedSlipIndex - 1 < 0 ? 0 : currentFocusedSlipIndex - 1;

    const newSlip = sortedSlips[nextSlipsIndex];

    setOpenSlip((currentOpenSlip) => {
      return currentOpenSlip ? newSlip : currentOpenSlip;
    });

    return newSlip.id;
  });
};
