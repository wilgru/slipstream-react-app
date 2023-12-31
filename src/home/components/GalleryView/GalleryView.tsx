import { debounce } from "debounce";
import { useEffect, useState } from "react";
import SlipCard from "src/slips/components/SlipCard/SlipCard";
import SlipPreview from "src/slips/components/SlipPreview/SlipPreview";
import { handleArrowLeftKeyDown } from "./utils/handleArrowLeftKeyDown";
import { handleArrowRightKeyDown } from "./utils/handleArrowRightKeyDown";
import { handleSpaceBarKeyDown } from "./utils/handleSpaceBarKeyDown";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type GalleryViewProps = {
  slips: Slip[];
  initialOpenSlipId: string | null;
  updateSlip: (slipId: string, updateSlipData: Slip) => void;
  deleteSlip: (slipId: string, hardDelete: boolean) => void;
  deleteEmptySlips: () => void;
  topics: Topic[];
  createTopic: (topic: string) => Promise<Topic>;
};

const GalleryView = ({
  slips,
  initialOpenSlipId,
  updateSlip,
  deleteSlip,
  deleteEmptySlips,
  topics,
  createTopic,
}: GalleryViewProps) => {
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null);
  const [openSlip, setOpenSlip] = useState<Slip | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [sortedSlips, setSortedSlips] = useState<Slip[]>([]);

  const onClickSlip = (clickedSlipId: string) => {
    setFocusedSlipId(clickedSlipId);

    setOpenSlip((currentOpenSlip) => {
      if (currentOpenSlip) {
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

  const onClickEditableField = () => {
    setEditMode(true);
  };

  const onBlurSlipEditableField = () => {
    setEditMode(false);
  };

  const onChangeSlip = debounce(async (newSlipData: Slip) => {
    openSlip && updateSlip(openSlip.id, newSlipData);

    if (newSlipData.deleted && openSlip?.id === newSlipData.id) {
      setOpenSlip(null);
    }
  }, 500);

  const onDeleteSlip = async (slipId: string) => {
    deleteSlip(slipId, false);

    setOpenSlip(null);
    setFocusedSlipId(null);
  };

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
          e.preventDefault();
          handleArrowLeftKeyDown(setFocusedSlipId, setOpenSlip, sortedSlips);
          break;

        case "ArrowRight":
          e.preventDefault();
          handleArrowRightKeyDown(setFocusedSlipId, setOpenSlip, sortedSlips);
          break;

        case " ": // Spacebar key
          handleSpaceBarKeyDown(setOpenSlip, sortedSlips, focusedSlipId);
          break;

        case "Escape":
          setOpenSlip(null);
          setFocusedSlipId(null);
          deleteEmptySlips();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [focusedSlipId, sortedSlips, editMode]);

  return (
    <div className="flex flex-col h-full p-3 pb-2 gap-2">
      <div
        className={`flex ${
          openSlip
            ? "overflow-x-auto overflow-y-hidden px-3 -mx-3"
            : "flex-wrap justify-center"
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
          onClickEditableField={onClickEditableField}
          onBlurEditableField={onBlurSlipEditableField}
          onChangeSlip={onChangeSlip}
          onDeleteSlip={onDeleteSlip}
          topics={topics}
          createTopic={createTopic}
        />
      )}
    </div>
  );
};

export default GalleryView;
