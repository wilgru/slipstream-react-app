import { useEffect, useState } from "react";
import { Slip } from "../../types/Slip.type";

type SlipPreviewProps = {
  slip: Slip;
  editMode: boolean;
  onClickTitle?: () => void;
  onBlurTitle?: () => void;
  onChangeTitle?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEscapeKeyDown?: () => void;
};

const SlipPreview = ({
  slip,
  editMode,
  onClickTitle,
  onBlurTitle,
  onChangeTitle,
  onEscapeKeyDown,
}: SlipPreviewProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined); // the textarea doesnt seem to update when the slip title changes otherwise

  const onChangeTitleLocal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    onChangeTitle && onChangeTitle(e);
  };

  useEffect(() => {
    setTitle(slip.title ?? undefined);
  }, [slip]);

  useEffect(() => {
    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur(); // .blur() only exists on HTMLElement, document.activeElement could potentially be an Element https://github.com/Microsoft/TypeScript/issues/5901
        onEscapeKeyDown && onEscapeKeyDown();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown, true);
    };
  }, [onEscapeKeyDown]);

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
          onChange={onChangeTitleLocal}
          onClick={onClickTitle}
          onBlur={onBlurTitle}
          className="h-7 mb-2 text-xl font-bold tracking-tight text-gray-900 select-none resize-none outline-none"
        />
        <p className="text-gray-600">{slip.content}</p>
        {editMode && <p className=" text-red-500">EDIT MODE</p>}
      </div>
    </>
  );
};

export default SlipPreview;
