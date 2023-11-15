import { useEffect, useState } from "react";
import { Slip } from "../../types/Slip.type";
import Quill, { RangeStatic, Sources } from "quill";

type SlipPreviewProps = {
  slip: Slip;
  editMode: boolean;
  onClickTitle?: () => void;
  onBlurTitle?: () => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const SlipPreview = ({
  slip,
  editMode,
  onClickTitle,
  onBlurTitle,
  onChangeTitle,
}: SlipPreviewProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<Quill | undefined>(undefined);

  const onChangeTitleInternal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    onChangeTitle && onChangeTitle(e);
  };

  useEffect(() => {
    setContent(new Quill("#editor", { debug: "info" }));
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
      oldRange: RangeStatic,
      source: Sources
    ) => {
      if (range === null && oldRange !== null) {
        console.log("blur");
        onBlurTitle && onBlurTitle();
      } else if (range !== null && oldRange === null) {
        console.log("focus");
        onClickTitle && onClickTitle();
      }
    };

    setTitle(slip.title ?? undefined);
    content?.setText(slip.content ?? "");
    content?.on("selection-change", handleSelectionChange); // https://github.com/quilljs/quill/issues/1680

    return () => {
      content?.off("selection-change", handleSelectionChange);
    };
  }, [slip, content]);

  return (
    <>
      <div
        className={
          "flex-grow w-full p-2 bg-white border border-gray-200 rounded-md shadow"
        }
      >
        <textarea
          value={title}
          placeholder="No Title"
          onChange={onChangeTitleInternal}
          onClick={onClickTitle}
          onBlur={onBlurTitle}
          className="h-7 mb-2 text-xl font-bold tracking-tight text-gray-900 select-none resize-none outline-none"
        />
        <div id="editor"></div>
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
