import { useEffect, useState } from "react";
import { RangeStatic } from "quill";
import Delta from "quill-delta";
import { Slip } from "../../types/Slip.type";
import QuillEditor from "../QuillEditor/QuillEditor";
import { handleEscapeKeyDown } from "./utils/handleEscapeKeyDown";

type SlipPreviewProps = {
  slip: Slip;
  editMode: boolean;
  onClickTitleOrContent?: () => void;
  onBlurTitleOrContent?: () => void;
  onChangeSlip?: (slip: Slip) => void;
};

type RelativeSlipField = {
  [K in keyof Slip]: { [P in K]: Slip[K] };
}[keyof Slip];

const SlipPreview = ({
  slip,
  editMode,
  onClickTitleOrContent,
  onBlurTitleOrContent,
  onChangeSlip,
}: SlipPreviewProps) => {
  const [editableSlip, setEditableSlip] = useState<Slip>(slip);

  const onChangeSlipInternal = (changedField: RelativeSlipField) => {
    setEditableSlip((current) => {
      const newSlipDelta = { ...current, ...changedField };

      console.log(newSlipDelta);
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
          onChange={(e) => onChangeSlipInternal({ title: e.target.value })}
          onClick={onClickTitleOrContent}
          onBlur={onBlurTitleOrContent}
          className="h-7 mb-2 text-xl font-bold tracking-tight text-gray-900 select-none resize-none outline-none"
        />
        <QuillEditor
          initialValue={editableSlip.content ?? new Delta()}
          onSelectionChange={onSelectionChange}
          onTextChange={(delta) => onChangeSlipInternal({ content: delta })}
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
