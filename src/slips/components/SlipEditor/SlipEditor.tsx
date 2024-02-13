import { useEffect, useMemo, useState } from "react";
import { Button } from "src/common/components/Button/Button";
import QuillEditor from "src/common/components/QuillEditor/QuillEditor";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { useTopics } from "src/topics/hooks/useTopics";
import { SlipEditorTopicsBar } from "./SlipEditorTopicsBar";
import { handleEscapeKeyDown } from "./utils/handleEscapeKeyDown";
import type { RangeStatic } from "quill";
import type { Slip } from "src/slips/types/Slip.type";

type SlipEditorProps = {
  slip: Slip;
  editMode: boolean;
  onClickEditableField: () => void;
  onBlurEditableField: () => void;
  onChangeSlip?: ((slip: Slip) => void) & {
    clear(): void;
  } & {
    flush(): void;
  };
  onDeleteSlip: (slipId: string) => void;
};

export type AnyKeyValueOfSlip = {
  [K in keyof Slip]: { [P in K]: Slip[K] };
}[keyof Slip];

const SlipEditor = ({
  slip,
  editMode,
  onClickEditableField,
  onBlurEditableField,
  onChangeSlip,
  onDeleteSlip,
}: SlipEditorProps) => {
  const { topics, createTopic } = useTopics();

  const [editableSlip, setEditableSlip] = useState<Slip>(slip); // cant push any changes to the actual slip itself, this will be replenished with the most recent version of the slip whenever that slip state updates
  const [updatedDateVisible, setUpdatedDateVisible] = useState<boolean>();

  const initialSlip = useMemo(() => slip, [slip.id]); // capture the slip to set as the initial slip only when the slip to show in the editor changes

  const onChangeSlipInternal = (
    changedField: AnyKeyValueOfSlip,
    flush: boolean = false
  ) => {
    setEditableSlip((currentEditableSlip) => {
      const newSlipData = { ...currentEditableSlip, ...changedField };

      onChangeSlip && onChangeSlip(newSlipData);

      flush && onChangeSlip?.flush(); // as in trigger debounced function immediately

      return newSlipData;
    });
  };

  const onSelectionChange = (range: RangeStatic, oldRange: RangeStatic) => {
    if (range === null && oldRange !== null) {
      onBlurEditableField && onBlurEditableField();
    } else if (range !== null && oldRange === null) {
      onClickEditableField && onClickEditableField();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleEscapeKeyDown();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  useEffect(() => {
    setEditableSlip(slip);
  }, [slip]);

  return (
    <div
      className={
        "flex-grow flex flex-col gap-2 w-full p-2 mb-1 bg-stone-100 border border-stone-700 shadow-light"
      }
    >
      <div className="flex flex-row items-start">
        <div className="flex-grow flex flex-col">
          <textarea
            value={editableSlip.title ?? ""}
            placeholder="No Title"
            onChange={(e) => onChangeSlipInternal({ title: e.target.value })}
            onClick={onClickEditableField}
            onBlur={onBlurEditableField}
            className="h-10 w-full text-4xl font-normal font-title tracking-tight overflow-y-hidden bg-stone-100 text-stone-700 placeholder-stone-500 border-stone-700 select-none resize-none outline-none"
          />
          <div className="flex flex-row gap-2">
            <p
              className="text-stone-500 text-xs"
              onMouseEnter={() => setUpdatedDateVisible(true)}
              onMouseLeave={() => setUpdatedDateVisible(false)}
            >
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
          <Button
            styleType="icon"
            icon="bin"
            onClick={() => onDeleteSlip(editableSlip.id)}
          />
          <Button styleType="icon" icon="close" onClick={() => {}} />
        </div>
      </div>

      <div className="flex gap-2">
        <Toggle
          styleType="icon"
          icon="pin"
          iconSize="medium"
          iconToggledOnColour="red-500"
          isToggled={editableSlip.isPinned}
          onClick={() =>
            onChangeSlipInternal({ isPinned: !editableSlip.isPinned }, true)
          }
        />

        <Toggle
          styleType="icon"
          icon="flag"
          iconSize="medium"
          iconToggledOnColour="orange-500"
          isToggled={editableSlip.isFlagged}
          onClick={() =>
            onChangeSlipInternal({ isFlagged: !editableSlip.isFlagged }, true)
          }
        />

        <Button size="small">No Type</Button>

        <SlipEditorTopicsBar
          editableSlip={editableSlip}
          topics={topics}
          createTopic={createTopic}
          onClickAddTopic={onClickEditableField}
          onBlurAddTopic={onBlurEditableField}
          onChangeSlipInternal={onChangeSlipInternal}
        />
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
  );
};

export default SlipEditor;
