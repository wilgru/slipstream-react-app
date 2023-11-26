import { useEffect, useMemo, useState } from "react";
import QuillEditor from "src/lib/shared/components/QuillEditor/QuillEditor";
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
  const [editedSlip, setEditedSlip] = useState<Slip>(slip); // cant push any changes to the actual slip itself, this will be replenished with the most recent version of the slip whenever that state updates
  const initialSlip = useMemo(() => slip, [slip.id]); // capture the slip to set as the initial slip only when the slip to preview changes

  const onChangeSlipInternal = (changedField: RelativeSlipField) => {
    setEditedSlip((current) => {
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
    setEditedSlip(slip);
  }, [slip]);

  return (
    <>
      <div
        className={
          "flex-grow w-full p-2 bg-white border border-gray-200 rounded-md shadow"
        }
      >
        <textarea
          value={editedSlip.title ?? undefined}
          placeholder="No Title"
          onChange={(e) => onChangeSlipInternal({ title: e.target.value })}
          onClick={onClickTitleOrContent}
          onBlur={onBlurTitleOrContent}
          className="h-7 mb-2 text-xl font-bold tracking-tight text-gray-900 select-none resize-none outline-none"
        />
        <QuillEditor
          initialValue={initialSlip.content}
          onSelectionChange={onSelectionChange}
          onTextChange={(delta) => onChangeSlipInternal({ content: delta })}
        />
        {
          editMode && (
            <p className="text-red-500">EDIT MODE</p>
          ) /* TODO: remove this element*/
        }
        {slip.id}
      </div>
    </>
  );
};

export default SlipPreview;
