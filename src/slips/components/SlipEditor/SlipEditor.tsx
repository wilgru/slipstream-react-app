import { useEffect, useMemo, useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { DropdownMenu } from "src/common/components/DropdownMenu/DropdownMenu";
import { QuillEditor } from "src/common/components/QuillEditor/QuillEditor";
import { ToggleBar } from "src/common/components/ToggleBar/ToggleBar";
import { useTopics } from "src/topics/hooks/useTopics";
import { SlipEditorAttributesBar } from "./SlipEditorAttributesBar";
import { handleEscapeKeyDown } from "./utils/handleEscapeKeyDown";
import type { RangeStatic, StringMap } from "quill";
import type { DropdownMenuOption } from "src/common/components/DropdownMenu/DropdownMenu";
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
  onCloseSlip: () => void;
};

// TODO move to types folder under common module?
// AnyKeyValueOf
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
  onCloseSlip,
}: SlipEditorProps) => {
  const { topics, createTopic } = useTopics();

  const [editableSlip, setEditableSlip] = useState<Slip>(slip); // cant push any changes to the actual slip itself, this will be replenished with the most recent version of the slip whenever that slip state updates
  const [toolbarFormatting, setToolbarFormatting] = useState<StringMap>();
  const [updatedDateVisible, setUpdatedDateVisible] = useState<boolean>();
  const [dropdownMenuVisible, setDropdownMenuVisible] =
    useState<boolean>(false);

  const initialSlip = useMemo(() => slip, [slip.id]); // capture the slip to set as the initial slip only when is an entirely different slip to show in the editor changes

  const quillToolbarId = "toolbar";

  const moreDropdownMenuOptions: DropdownMenuOption[] = [
    {
      name: "delete",
      action: () => onDeleteSlip(editableSlip.id),
    },
  ];

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

  const onSelectedFormattingChange = (selectionFormatting: StringMap) => {
    setToolbarFormatting(selectionFormatting);
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
        "flex-grow flex flex-col gap-4 w-full p-2 mb-1 bg-white border border-black rounded-lg shadow-light"
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-start">
          <div className="flex-grow flex flex-col">
            <textarea
              value={editableSlip.title ?? ""}
              placeholder="No Title"
              onChange={(e) => onChangeSlipInternal({ title: e.target.value })}
              onClick={onClickEditableField}
              onBlur={onBlurEditableField}
              className="h-10 w-full text-4xl font-normal font-title tracking-tight overflow-y-hidden bg-white text-stone-700 placeholder-stone-500 border-stone-700 select-none resize-none outline-none"
            />
            <div className="flex flex-row gap-2">
              <p
                className="text-stone-500 text-xs"
                onClick={() =>
                  setUpdatedDateVisible(
                    (currentUpdatedDateVisible) => !currentUpdatedDateVisible
                  )
                }
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

          <div className=" flex flex-row gap-3">
            <DropdownMenu
              options={moreDropdownMenuOptions}
              visible={dropdownMenuVisible}
              setVisible={setDropdownMenuVisible}
            >
              <Button
                styleType="icon"
                icon="ellipsis"
                onClick={() =>
                  setDropdownMenuVisible(
                    (currentDropdownMenuVisible) => !currentDropdownMenuVisible
                  )
                }
              />
            </DropdownMenu>
            <Button styleType="icon" icon="close" onClick={onCloseSlip} />
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <SlipEditorAttributesBar
            editableSlip={editableSlip}
            topics={topics}
            createTopic={createTopic}
            onClickAddTopic={onClickEditableField}
            onBlurAddTopic={onBlurEditableField}
            onChangeSlipInternal={onChangeSlipInternal}
          />

          <div id={quillToolbarId} hidden={!editMode}>
            <span className="ql-formats flex flex-row gap-2">
              <ToggleBar
                size="small"
                options={[
                  {
                    child: <span className="font-bold">B</span>,
                    className: "ql-bold",
                    isToggled: toolbarFormatting?.bold,
                  },
                  {
                    child: <span className="italic">I</span>,
                    className: "ql-italic",
                    isToggled: toolbarFormatting?.italic,
                  },
                  {
                    child: <span className="underline">U</span>,
                    className: "ql-underline",
                    isToggled: toolbarFormatting?.underline,
                  },
                  {
                    child: <span className="line-through">S</span>,
                    className: "ql-strike",
                    isToggled: toolbarFormatting?.strike,
                  },
                ]}
              />
            </span>
          </div>
        </div>
      </div>

      <QuillEditor
        toolbarId={quillToolbarId}
        initialValue={initialSlip.content}
        onSelectionChange={onSelectionChange}
        onTextChange={(delta) => onChangeSlipInternal({ content: delta })}
        onSelectedFormattingChange={onSelectedFormattingChange}
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
