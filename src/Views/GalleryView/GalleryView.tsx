import { useEffect, useState } from "react";
import { debounce } from "debounce";
import { pb } from "../../lib/pocketbase";
import SlipCard from "../../components/SlipCard/SlipCard";
import { Slip } from "../../types/Slip.type";
import SlipPreview from "../../components/SlipPreview/SlipPreview";
import { handleArrowLeftKeyDown } from "./utils/handleArrowLeftKeyDown";
import { handleArrowRightKeyDown } from "./utils/handleArrowRightKeyDown";
import { handleSpaceBarKeyDown } from "./utils/handleSpaceBarKeyDown";

type GalleryViewProps = {
  slips: Slip[];
};

const GalleryView = ({ slips }: GalleryViewProps) => {
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

  const onClickSlipTitle = () => {
    setEditMode(true);
  };

  const onBlurSlipTitle = () => {
    setEditMode(false);
  };

  const onChangeSlipTitle = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (openSlip) {
        const data = {
          ...openSlip,
          title: e.target.value,
        };

        pb.collection("slips").update(openSlip.id, data);
      }
    },
    500
  );

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
          onClickTitle={onClickSlipTitle}
          onBlurTitle={onBlurSlipTitle}
          onChangeTitle={onChangeSlipTitle}
        />
      )}
    </div>
  );
};

export default GalleryView;
