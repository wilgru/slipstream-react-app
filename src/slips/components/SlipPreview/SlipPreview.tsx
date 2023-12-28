import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Button } from "src/common/components/Button/Button";
import QuillEditor from "src/common/components/QuillEditor/QuillEditor";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { handleEscapeKeyDown } from "./utils/handleEscapeKeyDown";
import type { RangeStatic } from "quill";
import type { Slip } from "src/slips/types/Slip.type";

type SlipPreviewProps = {
  slip: Slip;
  editMode: boolean;
  onClickTitleOrContent?: () => void;
  onBlurTitleOrContent?: () => void;
  onChangeSlip?: ((slip: Slip) => void) & {
    clear(): void;
  } & {
    flush(): void;
  };
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
  const [updatedDateVisible, setUpdatedDateVisible] = useState<boolean>();

  const onChangeSlipInternal = (
    changedField: AnyKeyValueOfSlip,
    flush: boolean = false
  ) => {
    setEditableSlip((currentEditableSlip) => {
      const newSlipDelta = { ...currentEditableSlip, ...changedField };

      onChangeSlip && onChangeSlip(newSlipDelta);

      flush && onChangeSlip?.flush(); // as in trigger debounced function immediately

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
        <div
          onMouseEnter={() => setUpdatedDateVisible(true)}
          onMouseLeave={() => setUpdatedDateVisible(false)}
          className="flex flex-row items-start"
        >
          <div className="flex-grow flex flex-col">
            <textarea
              value={editableSlip.title ?? undefined}
              placeholder="No Title"
              onChange={(e) => onChangeSlipInternal({ title: e.target.value })}
              onClick={onClickTitleOrContent}
              onBlur={onBlurTitleOrContent}
              className="h-10 w-full text-4xl font-normal font-title tracking-tight overflow-y-hidden bg-stone-100 text-stone-700 placeholder-stone-500 border-stone-700 select-none resize-none outline-none"
            />
            <div className="flex flex-row gap-2">
              <p className="text-stone-500 text-xs">
                {editableSlip.created.format("ddd D MMMM YYYY, hh:mm a")}
              </p>
              <p
                className={`${
                  updatedDateVisible ? "visible" : "hidden"
                } text-stone-500 text-xs italic`}
              >
                {"(Last edited " +
                  editableSlip.updated.format("ddd D MMMM YYYY, hh:mm a") +
                  ")"}
              </p>
            </div>
          </div>

          <div className=" flex flex-row gap-2">
            <Toggle
              styleType="icon"
              icon="pin"
              iconToggledOnColour="red-500"
              isToggled={editableSlip.isPinned}
              onClick={() =>
                onChangeSlipInternal({ isPinned: !editableSlip.isPinned }, true)
              }
            />
            <Toggle
              styleType="icon"
              icon="flag"
              iconToggledOnColour="orange-500"
              isToggled={editableSlip.isFlagged}
              onClick={() =>
                onChangeSlipInternal(
                  { isFlagged: !editableSlip.isFlagged },
                  true
                )
              }
            />
            <Button
              styleType="icon"
              icon="bin"
              onClick={() => onChangeSlipInternal({ deleted: dayjs() }, true)}
            ></Button>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          {editableSlip.topics.map((topic) => {
            return <TopicPill name={topic.name} />;
          })}
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
