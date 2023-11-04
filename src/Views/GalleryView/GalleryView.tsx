import { useEffect, useState } from "react";
import SlipCard from "../../components/SlipCard/SlipCard";
import { Slip } from "../../types/Slip.type";
import SlipPreview from "../../components/SlipPreview/SlipPreview";

type GalleryViewProps = {
  slips: Slip[];
};

const GalleryView = ({ slips }: GalleryViewProps) => {
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null);
  const [openSlip, setOpenSlip] = useState<Slip | null>(null);

  const sortedSlips = slips.sort();

  const onClickSlip = (selectedSlipId: string) => {
    setFocusedSlipId(selectedSlipId);
    setOpenSlip((prev) => {
      if (!!prev) {
        return sortedSlips.find((slip) => slip.id === selectedSlipId) ?? null;
      } else {
        return prev;
      }
    });
  };

  const onDblClickSlip = (selectedSlipId: string) => {
    setOpenSlip((prev) => {
      if (prev?.id === selectedSlipId) {
        setFocusedSlipId(null);
        return null;
      } else {
        return sortedSlips.find((slip) => slip.id === selectedSlipId) ?? null;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowLeft":
          setFocusedSlipId((prev) => {
            const focusedSlipIndex = sortedSlips.findIndex(
              (sortedSlip) => sortedSlip.id === prev
            );

            const newIndex =
              focusedSlipIndex - 1 < 0 ? 0 : focusedSlipIndex - 1;
            const newSlip = sortedSlips[newIndex];

            setOpenSlip((prev) => {
              return !!prev ? newSlip : prev;
            });

            return newSlip.id;
          });
          break;

        case "ArrowRight":
          setFocusedSlipId((prev) => {
            const focusedSlipIndex = sortedSlips.findIndex(
              (sortedSlip) => sortedSlip.id === prev
            );

            const newIndex =
              focusedSlipIndex + 1 > sortedSlips.length - 1
                ? sortedSlips.length - 1
                : focusedSlipIndex + 1;
            const newSlip = sortedSlips[newIndex];

            setOpenSlip((prev) => {
              return !!prev ? newSlip : prev;
            });

            return newSlip.id;
          });
          break;

        case " ":
          setOpenSlip((prev) => {
            return !prev
              ? sortedSlips.find(
                  (sortedSlip) => sortedSlip.id === focusedSlipId
                ) ?? null
              : null;
          });
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [focusedSlipId]);

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
      {!!openSlip && <SlipPreview slip={openSlip} />}
    </div>
  );
};

export default GalleryView;
