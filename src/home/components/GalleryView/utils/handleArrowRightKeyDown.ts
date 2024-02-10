import type { Dispatch, SetStateAction } from "react";
import type { SetURLSearchParams } from "react-router-dom";
import type { Slip } from "src/slips/types/Slip.type";

export const handleArrowRightKeyDown = (
  setFocusedSlipId: Dispatch<SetStateAction<string | null>>,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  sortedSlips: Slip[]
) => {
  setFocusedSlipId((currentFocusedSlipId) => {
    const currentFocusedSlipIndex = sortedSlips.findIndex(
      (sortedSlip) => sortedSlip.id === currentFocusedSlipId
    );

    const slipsLastIndex = sortedSlips.length - 1;

    const nextSlipsIndex =
      currentFocusedSlipIndex + 1 > slipsLastIndex
        ? slipsLastIndex
        : currentFocusedSlipIndex + 1;

    const nextSlip = sortedSlips[nextSlipsIndex];

    if (searchParams.has("openSlip")) {
      searchParams.set("openSlip", nextSlip.id);
      setSearchParams(searchParams);
    }

    return nextSlip.id;
  });
};
