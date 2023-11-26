import type { Slip } from "../../../../lib/slips/types/Slip.type";
import type { Dispatch, SetStateAction } from "react";

export const handleArrowRightKeyDown = (
  setFocusedSlipId: Dispatch<SetStateAction<string | null>>,
  setOpenSlip: Dispatch<SetStateAction<Slip | null>>,
  sortedSlips: Slip[]
) => {
  setFocusedSlipId((currentFocusedSlipId) => {
    const currentFocusedSlipIndex = sortedSlips.findIndex(
      (sortedSlip) => sortedSlip.id === currentFocusedSlipId
    );

    const sortedSlipsLastIndex = sortedSlips.length - 1;

    const nextSlipsIndex =
      currentFocusedSlipIndex + 1 > sortedSlipsLastIndex
        ? sortedSlipsLastIndex
        : currentFocusedSlipIndex + 1;

    const nextSlip = sortedSlips[nextSlipsIndex];

    setOpenSlip((currentOpenSlip) => {
      return currentOpenSlip ? nextSlip : currentOpenSlip;
    });

    return nextSlip.id;
  });
};
