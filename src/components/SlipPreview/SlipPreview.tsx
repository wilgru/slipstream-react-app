import { useEffect, useState } from "react";
import { Slip } from "../../types/Slip.type";
import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";

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
  const [contentEditor, setContentEditor] = useState<Quill | undefined>(
    undefined
  );

  const onChangeSlipField = (changedField: RelativeSlipField) => {
    setEditableSlip((current) => {
      const newSlipDelta = { ...current, ...changedField };

      console.log(newSlipDelta);
      onChangeSlipData && onChangeSlipData(newSlipDelta);

      return newSlipDelta;
    });
  };

  useEffect(() => {
    setContentEditor(
      new Quill("#editor", { debug: import.meta.env.DEV ? "info" : undefined })
    );
  }, []);

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
    const handleSelectionChange = (
      range: RangeStatic,
      oldRange: RangeStatic
    ) => {
      if (range === null && oldRange !== null) {
        console.log("blur");
        onBlurTitle && onBlurTitle();
      } else if (range !== null && oldRange === null) {
        console.log("focus");
        onClickTitle && onClickTitle();
        onClickContent && onClickContent();
      }
    };

    const handleTextChange = () => {
      const contentDelta = contentEditor?.getContents() ?? null;
      onChangeSlipField({ content: contentDelta });
    };

    slip.content && contentEditor?.setContents(slip.content);

    contentEditor?.on("selection-change", handleSelectionChange); // https://github.com/quilljs/quill/issues/1680
    contentEditor?.on("text-change", handleTextChange);

    return () => {
      contentEditor?.off("selection-change", handleSelectionChange);
      contentEditor?.off("text-change", handleTextChange);
    };
  }, [slip, contentEditor]);

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
        {/* TODO: there is a particular way to make the quill editor scrollable https://quilljs.com/playground/#autogrow-height */}
        <div id="editor" className="h-fit"></div>
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
