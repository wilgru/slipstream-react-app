import { useCallback, useEffect, useState } from "react";
import SlipCard from "../../components/SlipCard/SlipCard";
import { Slip } from "../../types/Slip.type";
import SlipPreview from "../../components/SlipPreview/SlipPreview";
import { pb } from "../../lib/pocketbase";

type GalleryViewProps = {
  slips: Slip[];
};

const GalleryView = ({ slips }: GalleryViewProps) => {
  const [focusedSlipId, setFocusedSlipId] = useState<string | null>(null);
  const [openSlip, setOpenSlip] = useState<Slip | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [sortedSlips, setSortedSlips] = useState<Slip[]>(slips.sort());

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

  // fixed issue by including in useeffect deps in slips comp, still needs to be a usecallback?
  const onDblClickSlip = useCallback(
    (selectedSlipId: string) => {
      setOpenSlip((prev) => {
        if (prev?.id === selectedSlipId) {
          setFocusedSlipId(null);
          return null;
        } else {
          console.log(sortedSlips[1]);
          return sortedSlips.find((slip) => slip.id === selectedSlipId) ?? null;
        }
      });
    },
    [sortedSlips]
  );

  const onClickSlipTitle = () => {
    setEditMode(true);
  };

  const onBlurSlipTitle = () => {
    setEditMode(false);
  };

  const onChangeSlipTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (openSlip) {
      const data = {
        ...openSlip,
        title: e.target.value,
      };

      setOpenSlip(data);
      pb.collection("slips").update(openSlip.id, data);
    }
  };

  useEffect(() => {
    setSortedSlips(slips.sort());
  }, [slips]);

  useEffect(() => {
    console.log(sortedSlips[1]);
  }, [sortedSlips]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editMode) return;

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

        case "Escape":
          setOpenSlip(null);
          setFocusedSlipId(null);
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
  }, [focusedSlipId, editMode]);

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
