import { useEffect, useState } from "react";
import { RangeStatic } from "quill";
import { Slip } from "../../types/Slip.type";
import Delta from "quill-delta";
import QuillEditor from "../QuillEditor/QuillEditor";

type SlipPreviewProps = {
  slip: Slip;
  editMode: boolean;
  onClickTitle?: () => void;
  onClickContent?: () => void;
  onBlurTitle?: () => void;
  onChangeSlipData?: (slip: Slip) => void;
};

type RelativeSlipField = {
  [K in keyof Slip]: { [P in K]: Slip[K] };
}[keyof Slip];

const SlipPreview = ({
  slip,
  editMode,
  onClickTitle,
  onClickContent,
  onBlurTitle,
  onChangeSlipData,
}: SlipPreviewProps) => {
  const [editableSlip, setEditableSlip] = useState<Slip>(slip);

  const onChangeSlipField = (changedField: RelativeSlipField) => {
    setEditableSlip((current) => {
      const newSlipDelta = { ...current, ...changedField };

      console.log(newSlipDelta);
      onChangeSlipData && onChangeSlipData(newSlipDelta);

      return newSlipDelta;
    });
  };

  const onSelectionChange = (range: RangeStatic, oldRange: RangeStatic) => {
    if (range === null && oldRange !== null) {
      onBlurTitle && onBlurTitle();
    } else if (range !== null && oldRange === null) {
      onClickTitle && onClickTitle();
      onClickContent && onClickContent();
    }
  };

  const onTextChange = (delta: Delta) => {
    onChangeSlipField({ content: delta });
  };

  useEffect(() => {
    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      // .blur() only exists on HTMLElement, document.activeElement could potentially be an Element
      // https://github.com/Microsoft/TypeScript/issues/5901
      if (e.key === "Escape" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown, true);
    };
  }, []);

  useEffect(() => {
    setEditableSlip(slip);
  }, [slip]);

  return (
    <>
      <div
        className={
          "flex-grow w-full p-2 bg-white border border-gray-200 rounded-md shadow"
        }
      >
        <textarea
          value={editableSlip.title ?? undefined}
          placeholder="No Title"
          onChange={(e) => onChangeSlipField({ title: e.target.value })}
          onClick={onClickTitle}
          onBlur={onBlurTitle}
          className="h-7 mb-2 text-xl font-bold tracking-tight text-gray-900 select-none resize-none outline-none"
        />
        <QuillEditor
          initialValue={editableSlip.content ?? new Delta()}
          onSelectionChange={onSelectionChange}
          onTextChange={onTextChange}
        />
        {
          editMode && (
            <p className="text-red-500">EDIT MODE</p>
          ) /* TODO: remove this element*/
        }
      </div>
    </>
  );
};

export default SlipPreview;
