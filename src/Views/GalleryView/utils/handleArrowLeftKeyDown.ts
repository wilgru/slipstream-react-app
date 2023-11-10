import { Dispatch, SetStateAction } from "react";
import { Slip } from "../../../types/Slip.type";

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

    setOpenSlip((prev) => {
      return !!prev ? newSlip : prev;
    });

    return newSlip.id;
  });
};
