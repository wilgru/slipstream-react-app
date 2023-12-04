import { useEffect, useMemo, useState } from "react";
import { Button } from "src/lib/shared/components/Button/Button";
import QuillEditor from "src/lib/shared/components/QuillEditor/QuillEditor";
import BinIcon from "src/lib/shared/icons/bin.svg?react";
import FlagIcon from "src/lib/shared/icons/flag.svg?react";
import PinIcon from "src/lib/shared/icons/pin.svg?react";
import { handleEscapeKeyDown } from "./utils/handleEscapeKeyDown";
import type { RangeStatic } from "quill";
import type { Slip } from "src/lib/slips/types/Slip.type";

type SlipPreviewProps = {
  slip: Slip;
  editMode: boolean;
  onClickTitleOrContent?: () => void;
  onBlurTitleOrContent?: () => void;
  onChangeSlip?: (slip: Slip) => void;
};

type AnyKeyValueOfSlip = {
  [K in keyof Slip]: { [P in K]: Slip[K] };
}[keyof Slip];

const SlipPreview = ({
  slip,
  editMode,
  onClickTitleOrContent,
  onBlurTitleOrContent,
  onChangeSlip,
}: SlipPreviewProps) => {
  const [editableSlip, setEditableSlip] = useState<Slip>(slip); // cant push any changes to the actual slip itself, this will be replenished with the most recent version of the slip whenever that slip state updates
  const initialSlip = useMemo(() => slip, [slip.id]); // capture the slip to set as the initial slip only when the slip to preview changes

  const onChangeSlipInternal = (changedField: AnyKeyValueOfSlip) => {
    setEditableSlip((current) => {
      const newSlipDelta = { ...current, ...changedField };

      onChangeSlip && onChangeSlip(newSlipDelta);

      return newSlipDelta;
    });
  };

  const onSelectionChange = (range: RangeStatic, oldRange: RangeStatic) => {
    if (range === null && oldRange !== null) {
      onBlurTitleOrContent && onBlurTitleOrContent();
    } else if (range !== null && oldRange === null) {
      onClickTitleOrContent && onClickTitleOrContent();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown, true);
    };
  }, []);

  useEffect(() => {
    console.log(slip.title); //TODO: fix title not removing on clicking new slip if a slip was already open
    setEditableSlip(slip);
  }, [slip]);

  return (
    // TODO: unnecessary fragment here?
    <>
      <div
        className={
          "flex-grow flex flex-col gap-2 w-full p-2 mb-1 bg-stone-100 border border-stone-700 shadow-light"
        }
      >
        <div className="flex flex-row items-start">
          <div className="flex-grow flex flex-col">
            <textarea
              value={editableSlip.title ?? undefined}
              placeholder="No Title"
              onChange={(e) => onChangeSlipInternal({ title: e.target.value })}
              onClick={onClickTitleOrContent}
              onBlur={onBlurTitleOrContent}
              className="h-10 w-full text-4xl font-normal font-title tracking-tight overflow-y-hidden bg-stone-100 text-stone-700 placeholder-stone-500 border-stone-700 select-none resize-none outline-none"
            />
            <p className="text-stone-500 text-xs">
              {editableSlip.created.format("ddd D MMMM YYYY, hh:mm a")}
            </p>
          </div>

          <div className=" flex flex-row gap-2">
            <Button
              type="minimal"
              onClick={() =>
                onChangeSlipInternal({ isPinned: !editableSlip.isPinned })
              }
            >
              <PinIcon
                className={`h-8 ${
                  editableSlip.isPinned ? "fill-red-500" : "fill-stone-500"
                } ${
                  editableSlip.isPinned
                    ? "hover:fill-stone-500"
                    : "hover:fill-red-500"
                }`}
              />
            </Button>
            <Button
              type="minimal"
              onClick={() =>
                onChangeSlipInternal({ isFlagged: !editableSlip.isFlagged })
              }
            >
              <FlagIcon
                className={`h-8 ${
                  editableSlip.isFlagged ? "fill-orange-500" : "fill-stone-500"
                } ${
                  editableSlip.isFlagged
                    ? "hover:fill-stone-500"
                    : "hover:fill-orange-500"
                }`}
              />
            </Button>
            <Button type="minimal" onClick={() => {}}>
              <BinIcon className="h-8 fill-stone-500 hover:fill-stone-800" />
            </Button>
          </div>
        </div>

        <QuillEditor
          initialValue={initialSlip.content}
          onSelectionChange={onSelectionChange}
          onTextChange={(delta) => onChangeSlipInternal({ content: delta })}
        />
        {
          editMode && (
            <p className="text-orange-500">EDIT MODE</p>
          ) /* TODO: remove this element*/
        }
      </div>
    </>
  );
};

export default SlipPreview;
