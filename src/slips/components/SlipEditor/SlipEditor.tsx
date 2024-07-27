import {
  DotsThree,
  TextB,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  X,
} from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect, useMemo, useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { QuillEditor } from "src/common/components/QuillEditor/QuillEditor";
import { useCreateTopic } from "src/topics/hooks/useCreateTopic";
import { useGetTopics } from "src/topics/hooks/useGetTopics";
import { SlipEditorAttributesBar } from "./subComponents/SlipEditorAttributesBar";
import { handleEscapeKeyDown } from "./utils/handleEscapeKeyDown";
import type { RangeStatic, StringMap } from "quill";
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

//TODO: move to types folder under common module
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
  const { topics } = useGetTopics();
  const { createTopic } = useCreateTopic();

  const [editableSlip, setEditableSlip] = useState<Slip>(slip); // cant push any changes to the actual slip itself, this will be replenished with the most recent version of the slip whenever that slip state updates
  const [toolbarFormatting, setToolbarFormatting] = useState<StringMap>();
  const [updatedDateVisible, setUpdatedDateVisible] = useState<boolean>();
  const [OptionsVisible, setOptionsVisible] = useState<boolean>(false);

  const initialSlip = useMemo(() => slip, [slip.id]); // capture the slip to set as the initial slip only when is an entirely different slip to show in the editor changes

  const quillToolbarId = "toolbar";

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

  //? redundant?
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
              className="h-10 w-full text-4xl font-normal font-title tracking-tight overflow-y-hidden bg-white text-black placeholder-stone-500 border-black select-none resize-none outline-none"
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
            {/* https://www.radix-ui.com/primitives/docs/components/dropdown-menu */}
            <DropdownMenu.Root
              onOpenChange={(isOpen) => setOptionsVisible(isOpen)}
            >
              <DropdownMenu.Trigger asChild>
                <div>
                  <Button
                    styleType="icon"
                    icon={() => (
                      <DotsThree
                        size={32}
                        weight="bold"
                        className={
                          OptionsVisible ? "text-orange-500" : undefined
                        }
                      />
                    )}
                  />
                </div>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="bg-white border border-black rounded-md p-1 w-40 shadow-lighter"
                  sideOffset={2}
                  align="end"
                >
                  <DropdownMenu.Item
                    className="leading-none text-sm p-1 data-[highlighted]:bg-orange-400 outline-none data-[highlighted]:text-white rounded-sm cursor-pointer"
                    onClick={() => onDeleteSlip(editableSlip.id)}
                  >
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <Button
              styleType="icon"
              onClick={onCloseSlip}
              icon={() => <X size={32} weight="bold" />}
            />
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
            <ToggleGroup.Root
              className="font-medium text-sm"
              type="multiple"
              defaultValue={[]}
              value={[
                ...(toolbarFormatting?.bold ? ["bold"] : []),
                ...(toolbarFormatting?.italic ? ["italic"] : []),
                ...(toolbarFormatting?.underline ? ["underline"] : []),
                ...(toolbarFormatting?.strike ? ["strike"] : []),
              ]}
              aria-label="Text alignment"
            >
              <span className="ql-formats flex flex-row gap-1">
                <ToggleGroup.Item
                  className="ql-bold rounded-md text-stone-500 data-[state=on]:bg-orange-500 data-[state=on]:text-white px-2 py-1"
                  value="bold"
                >
                  <TextB size={16} weight="bold" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="ql-italic rounded-md text-stone-500 data-[state=on]:bg-orange-500 data-[state=on]:text-white px-2 py-1"
                  value="italic"
                >
                  <TextItalic size={16} weight="bold" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="ql-underline rounded-md text-stone-500 data-[state=on]:bg-orange-500 data-[state=on]:text-white px-2 py-1"
                  value="underline"
                >
                  <TextUnderline size={16} weight="bold" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className=" ql-strike rounded-md text-stone-500 data-[state=on]:bg-orange-500 data-[state=on]:text-white px-2 py-1"
                  value="strike"
                >
                  <TextStrikethrough size={16} weight="bold" />
                </ToggleGroup.Item>
              </span>
            </ToggleGroup.Root>
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
