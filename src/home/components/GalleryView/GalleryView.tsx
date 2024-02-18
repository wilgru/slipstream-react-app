import { debounce } from "debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SlipCard from "src/slips/components/SlipCard/SlipCard";
import SlipEditor from "src/slips/components/SlipEditor/SlipEditor";
import { useSlips } from "src/slips/hooks/useSlips";
import { handleArrowLeftKeyDown } from "./utils/handleArrowLeftKeyDown";
import { handleArrowRightKeyDown } from "./utils/handleArrowRightKeyDown";
import { handleSpaceBarKeyDown } from "./utils/handleSpaceBarKeyDown";
import type { Slip } from "src/slips/types/Slip.type";

type GalleryViewProps = {
  fixedWidth: string;
};

const GalleryView = ({ fixedWidth }: GalleryViewProps) => {
  const { slips, deleteSlip, updateSlip, deleteEmptySlips } = useSlips();

  const [searchParams, setSearchParams] = useSearchParams();
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null);
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
    openSlip && updateSlip(openSlip.id, newSlipData);

    if (newSlipData.deleted && openSlip?.id === newSlipData.id) {
      searchParams.delete("openSlip");
      setSearchParams(searchParams);
    }
  }, 500);

  const onDeleteSlip = async (slipId: string) => {
    searchParams.delete("openSlip");
    setSearchParams(searchParams);

    deleteSlip(slipId, false);
    setFocusedSlipId(null);
  };

  const onCloseSlip = async () => {
    searchParams.delete("openSlip");
    setSearchParams(searchParams);

    setOpenSlip(null);
    setFocusedSlipId(null);
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
          handleSpaceBarKeyDown(searchParams, setSearchParams, focusedSlipId);
          break;

        case "Escape":
          searchParams.delete("openSlip");
          setSearchParams(searchParams);

          setFocusedSlipId(null);
          deleteEmptySlips();
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
    deleteEmptySlips,
  ]);

  return (
    <div
      style={openSlip ? { width: fixedWidth } : {}}
      className="flex flex-col h-full w-full max-w-full p-3 pb-2 gap-2"
    >
      <div
        className={`flex gap-3 ${
          openSlip
            ? "overflow-x-auto overflow-y-hidden px-3 -mx-3"
            : "flex-wrap justify-center"
        }`}
      >
        {slips.map((slip) => (
          <SlipCard
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

export default GalleryView;
