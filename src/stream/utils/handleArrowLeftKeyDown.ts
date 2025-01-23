import type { Dispatch, SetStateAction } from "react";
import type { SetURLSearchParams } from "react-router-dom";
import type { Slip } from "src/models/slip/types/Slip.type";

export const handleArrowLeftKeyDown = (
  setFocusedSlipId: Dispatch<SetStateAction<string | null>>,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  sortedSlips: Slip[]
) => {
  setFocusedSlipId((currentFocusedSlipId) => {
    const currentFocusedSlipIndex = sortedSlips.findIndex(
      (sortedSlip) => sortedSlip.id === currentFocusedSlipId
    );

    const nextSlipsIndex =
      currentFocusedSlipIndex - 1 < 0 ? 0 : currentFocusedSlipIndex - 1;

    const nextSlip = sortedSlips[nextSlipsIndex];

    if (searchParams.has("openSlip")) {
      searchParams.set("openSlip", nextSlip.id);
      setSearchParams(searchParams);
    }

    return nextSlip.id;
  });
};
