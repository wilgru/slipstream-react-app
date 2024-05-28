import { debounce } from "debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SlipCard from "src/slips/components/SlipCard/SlipCard";
import SlipEditor from "src/slips/components/SlipEditor/SlipEditor";
import { usePurgeEmptySlips } from "src/slips/hooks/useDeleteEmptySlips";
import { useDeleteSlip } from "src/slips/hooks/useDeleteSlip";
import { useGetSlips } from "src/slips/hooks/useGetSlips";
import { useUpdateSlip } from "src/slips/hooks/useUpdateSlip";
import { handleArrowLeftKeyDown } from "./utils/handleArrowLeftKeyDown";
import { handleArrowRightKeyDown } from "./utils/handleArrowRightKeyDown";
import { handleSpaceBarKeyDown } from "./utils/handleSpaceBarKeyDown";
import type { Slip } from "src/slips/types/Slip.type";

export const SlipGallery = () => {
  const { slips } = useGetSlips();
  const { updateSlip } = useUpdateSlip();
  const { deleteSlip } = useDeleteSlip();
  const { purgeEmptySlips } = usePurgeEmptySlips();

  const [searchParams, setSearchParams] = useSearchParams();
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null); //? redundant state?
  const [openSlip, setOpenSlip] = useState<Slip | null>(null);
  const [editMode, setEditMode] = useState(false);

  const onClickSlip = (clickedSlipId: string) => {
    if (searchParams.has("openSlip")) {
      searchParams.set("openSlip", clickedSlipId);
      setSearchParams(searchParams);

      setFocusedSlipId(clickedSlipId);

      return;
    }

    setFocusedSlipId(clickedSlipId);
  };

  const onDblClickSlip = (dblClickedSlipId: string) => {
    if (searchParams.has("openSlip")) {
      searchParams.delete("openSlip");
      setSearchParams(searchParams);

      setFocusedSlipId(null);

      return;
    }

    searchParams.set("openSlip", dblClickedSlipId);
    setSearchParams(searchParams);

    setFocusedSlipId(dblClickedSlipId);
  };

  const onClickEditableField = () => {
    setEditMode(true);
  };

  const onBlurEditableField = () => {
    setEditMode(false);
  };

  const onChangeSlip = debounce(async (newSlipData: Slip) => {
    openSlip &&
      updateSlip({ slipId: openSlip.id, updateSlipData: newSlipData });

    if (newSlipData.deleted && openSlip?.id === newSlipData.id) {
      searchParams.delete("openSlip");
      setSearchParams(searchParams);
    }
  }, 500);

  const onDeleteSlip = async (slipId: string) => {
    searchParams.delete("openSlip");
    setSearchParams(searchParams);

    deleteSlip({ slipId });
    setFocusedSlipId(null);
  };

  const onCloseSlip = async () => {
    searchParams.delete("openSlip");
    setSearchParams(searchParams);

    setFocusedSlipId(null);

    purgeEmptySlips();
  };

  useEffect(() => {
    const openSlipId = searchParams.get("openSlip");

    if (!openSlipId) {
      setOpenSlip(null);
      return;
    }

    const foundOpenSlip = slips.find((slip) => slip.id === openSlipId);

    if (foundOpenSlip) {
      setOpenSlip(foundOpenSlip);
      setFocusedSlipId(foundOpenSlip.id);
    }
  }, [searchParams, slips]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editMode) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handleArrowLeftKeyDown(
            setFocusedSlipId,
            searchParams,
            setSearchParams,
            slips
          );
          break;

        case "ArrowRight":
          e.preventDefault();
          handleArrowRightKeyDown(
            setFocusedSlipId,
            searchParams,
            setSearchParams,
            slips
          );
          break;

        case " ": // Spacebar key
          handleSpaceBarKeyDown(
            searchParams,
            setSearchParams,
            purgeEmptySlips,
            focusedSlipId
          );
          break;

        case "Escape":
          searchParams.delete("openSlip");
          setSearchParams(searchParams);

          setFocusedSlipId(null);
          purgeEmptySlips();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [
    focusedSlipId,
    slips,
    editMode,
    setSearchParams,
    searchParams,
    purgeEmptySlips,
  ]);

  return (
    <div className="flex flex-col h-full gap-2 p-3 pb-2 pt-0 overflow-y-auto overflow-x-hidden">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, 15rem)",
        }}
        className={
          openSlip
            ? "flex gap-3 px-3 -mx-3 overflow-x-auto overflow-y-hidden"
            : "grid justify-between gap-3"
        }
      >
        {slips.map((slip) => (
          <SlipCard
            key={slip.id}
            slip={slip}
            isFocused={focusedSlipId ? slip.id === focusedSlipId : false}
            onClick={onClickSlip}
            onDblClick={onDblClickSlip}
          />
        ))}
      </div>

      {!!openSlip && (
        <SlipEditor
          slip={openSlip}
          editMode={editMode}
          onClickEditableField={onClickEditableField}
          onBlurEditableField={onBlurEditableField}
          onChangeSlip={onChangeSlip}
          onDeleteSlip={onDeleteSlip}
          onCloseSlip={onCloseSlip}
        />
      )}
    </div>
  );
};
