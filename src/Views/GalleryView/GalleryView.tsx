import { useEffect, useState } from "react";
import { debounce } from "debounce";
import SlipCard from "../../components/SlipCard/SlipCard";
import { Slip } from "../../types/Slip.type";
import SlipPreview from "../../components/SlipPreview/SlipPreview";
import { handleArrowLeftKeyDown } from "./utils/handleArrowLeftKeyDown";
import { handleArrowRightKeyDown } from "./utils/handleArrowRightKeyDown";
import { handleSpaceBarKeyDown } from "./utils/handleSpaceBarKeyDown";

type GalleryViewProps = {
  slips: Slip[];
  initialOpenSlipId: string | null;
  updateSlip: (slipId: string, updateSlipData: Slip) => void;
};

const GalleryView = ({
  slips,
  initialOpenSlipId,
  updateSlip,
}: GalleryViewProps) => {
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null);
  const [openSlip, setOpenSlip] = useState<Slip | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [sortedSlips, setSortedSlips] = useState<Slip[]>([]);

  const onClickSlip = (clickedSlipId: string) => {
    setFocusedSlipId(clickedSlipId);

    setOpenSlip((currentOpenSlip) => {
      if (!!currentOpenSlip) {
        return (
          sortedSlips.find((sortedSlip) => sortedSlip.id === clickedSlipId) ??
          null
        );
      } else {
        return currentOpenSlip;
      }
    });
  };

  const onDblClickSlip = (dblClickedSlipId: string) => {
    setOpenSlip((currentOpenSlip) => {
      if (currentOpenSlip?.id === dblClickedSlipId) {
        setFocusedSlipId(null);
        return null;
      } else {
        return (
          sortedSlips.find(
            (sortedSlip) => sortedSlip.id === dblClickedSlipId
          ) ?? null
        );
      }
    });
  };

  const onClickSlipTitleOrContent = () => {
    setEditMode(true);
  };

  const onBlurSlipTitleOrContent = () => {
    setEditMode(false);
  };

  const onChangeSlip = debounce(async (newSlipData: Slip) => {
    openSlip && updateSlip(openSlip.id, newSlipData);
  }, 500);

  useEffect(() => {
    const foundInitialOpenSlip = slips.find(
      (slip) => slip.id === initialOpenSlipId
    );

    if (initialOpenSlipId && foundInitialOpenSlip) {
      setOpenSlip(foundInitialOpenSlip);
      setFocusedSlipId(initialOpenSlipId);
    }
  }, [initialOpenSlipId]);

  // TODO: handle sort in useSlips, exposes a sort(sortBy, direction) callback
  useEffect(() => {
    setSortedSlips(slips.sort());
  }, [slips]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editMode) return;

      switch (e.key) {
        case "ArrowLeft":
          handleArrowLeftKeyDown(setFocusedSlipId, setOpenSlip, sortedSlips);
          break;

        case "ArrowRight":
          handleArrowRightKeyDown(setFocusedSlipId, setOpenSlip, sortedSlips);
          break;

        case " ": // Spacebar key
          handleSpaceBarKeyDown(setOpenSlip, sortedSlips, focusedSlipId);
          break;

        case "Escape":
          setOpenSlip(null);
          setFocusedSlipId(null);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [focusedSlipId, sortedSlips, editMode]);

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <div
        className={`flex ${
          !!openSlip ? "overflow-x-auto overflow-y-hidden" : "flex-wrap"
        } gap-3`}
      >
        {sortedSlips.map((slip) => (
          <SlipCard
            slip={slip}
            isFocused={focusedSlipId ? slip.id === focusedSlipId : false}
            onClick={onClickSlip}
            onDblClick={onDblClickSlip}
          />
        ))}
      </div>
      {!!openSlip && (
        <SlipPreview
          slip={openSlip}
          editMode={editMode}
          onClickTitleOrContent={onClickSlipTitleOrContent}
          onBlurTitleOrContent={onBlurSlipTitleOrContent}
          onChangeSlip={onChangeSlip}
        />
      )}
    </div>
  );
};

export default GalleryView;
