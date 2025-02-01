import {
  TextB,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
} from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import dayjs from "dayjs";
import Delta from "quill-delta";
import { useMemo, useState } from "react";
import { Button } from "src/components/Button/Button";
import { QuillEditor } from "src/components/QuillEditor/QuillEditor";
import { Toggle } from "src/components/Toggle/Toggle";
import { useCreateSlip } from "src/models/slips/hooks/useCreateSlip";
import { useDeleteSlip } from "src/models/slips/hooks/useDeleteSlip";
import { useUpdateSlip } from "src/models/slips/hooks/useUpdateSlip";
import { JournalMultiSelect } from "./JournalMultiSelect";
import type { StringMap } from "quill";
import type { Slip } from "src/models/slips/Slip.type";

type EditSlipModalProps = {
  slip?: Slip;
  journalToUpdateId?: string;
  onSave?: () => void;
};

//TODO: move to types folder under common module
// AnyKeyValueOf
export type AnyKeyValueOfSlip = {
  [K in keyof Slip]: { [P in K]: Slip[K] };
}[keyof Slip];

const QUILL_TOOLBAR_ID = "toolbar";

const getInitialSlip = (slip: Slip | undefined): Slip => {
  return {
    id: slip?.id || "",
    title: slip?.title || "",
    content: slip?.content || new Delta(),
    journals: slip?.journals || [],
    tags: slip?.tags || [],
    isFlagged: slip?.isFlagged || false,
    isPinned: slip?.isPinned || false,
    created: slip?.created || dayjs(),
    updated: slip?.updated || dayjs(),
    deleted: slip?.deleted || null,
    isDraft: false,
  };
};

const EditSlipModal = ({
  slip,
  journalToUpdateId,
  onSave,
}: EditSlipModalProps) => {
  const { createSlip } = useCreateSlip();
  const { updateSlip } = useUpdateSlip(journalToUpdateId);
  const { deleteSlip } = useDeleteSlip();

  const [editedSlip, setEditedSlip] = useState<Slip>(getInitialSlip(slip));
  const [toolbarFormatting, setToolbarFormatting] = useState<StringMap>();
  const [updatedDateVisible, setUpdatedDateVisible] = useState<boolean>();

  const initialSlip = useMemo(() => getInitialSlip(slip), [slip]);

  const onSaveSlip = async () => {
    if (editedSlip.id) {
      await updateSlip({
        slipId: initialSlip.id,
        updateSlipData: editedSlip,
      });
    } else {
      createSlip({ createSlipData: editedSlip });
    }

    onSave?.();
  };

  const onDeleteSlip = async () => {
    deleteSlip({ slipId: initialSlip.id });
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <Dialog.Content className="fixed left-1/4 top-1/4 max-h-[85vh] w-1/2 max-w-[50%] bg-white flex flex-col gap-4 p-2 border border-stone-600 rounded-lg shadow-light">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-start">
            <div className="flex-grow flex flex-col">
              <textarea
                value={editedSlip.title ?? ""}
                placeholder="No Title"
                onChange={(e) =>
                  setEditedSlip((currentEditedSlip) => {
                    const newSlipData = {
                      ...currentEditedSlip,
                      title: e.target.value,
                    };

                    return newSlipData;
                  })
                }
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
                  {editedSlip.created.format("ddd D MMMM YYYY, hh:mm a")}
                </p>
                <p
                  className={`${
                    updatedDateVisible ? "visible" : "hidden"
                  } text-stone-500 text-xs italic`}
                >
                  {"(Last edited " +
                    editedSlip.updated.format("ddd D MMMM YYYY, hh:mm a") +
                    ")"}
                </p>
              </div>
            </div>

            <div className=" flex flex-row gap-1">
              <Toggle
                colour="red"
                isToggled={editedSlip.isPinned}
                onClick={() =>
                  setEditedSlip((currentEditedSlip) => {
                    const newSlipData = {
                      ...currentEditedSlip,
                      isPinned: !editedSlip.isPinned,
                    };

                    return newSlipData;
                  })
                }
                iconName="pushPin"
              />

              <Toggle
                isToggled={editedSlip.isFlagged}
                onClick={() =>
                  setEditedSlip((currentEditedSlip) => {
                    const newSlipData = {
                      ...currentEditedSlip,
                      isFlagged: !editedSlip.isFlagged,
                    };

                    return newSlipData;
                  })
                }
                iconName="flag"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between w-full border-t border-stone-300 pt-2">
            <JournalMultiSelect
              initialSlip={initialSlip}
              onChange={(journals) =>
                setEditedSlip((currentEditedSlip) => {
                  const newSlipData = {
                    ...currentEditedSlip,
                    journals,
                  };

                  return newSlipData;
                })
              }
            />

            <div id={QUILL_TOOLBAR_ID}>
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
                    className="ql-bold rounded-md text-stone-500 data-[state=off]:hover:bg-orange-100 data-[state=off]:hover:text-orange-500 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-500 px-2 py-1"
                    value="bold"
                  >
                    <TextB size={16} weight="bold" />
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className="ql-italic rounded-md text-stone-500 data-[state=off]:hover:bg-orange-100 data-[state=off]:hover:text-orange-500 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-500 px-2 py-1"
                    value="italic"
                  >
                    <TextItalic size={16} weight="bold" />
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className="ql-underline rounded-md text-stone-500 data-[state=off]:hover:bg-orange-100 data-[state=off]:hover:text-orange-500 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-500 px-2 py-1"
                    value="underline"
                  >
                    <TextUnderline size={16} weight="bold" />
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    className=" ql-strike rounded-md text-stone-500 data-[state=off]:hover:bg-orange-100 data-[state=off]:hover:text-orange-500 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-500 px-2 py-1"
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
          toolbarId={QUILL_TOOLBAR_ID}
          initialValue={initialSlip.content}
          onChange={(delta) =>
            setEditedSlip((currentEditedSlip) => {
              const newSlipData = {
                ...currentEditedSlip,
                content: delta,
              };

              return newSlipData;
            })
          }
          onSelectedFormattingChange={(selectionFormatting: StringMap) => {
            setToolbarFormatting(selectionFormatting);
          }}
        />
        <div className="flex justify-between gap-2">
          <Dialog.Close asChild>
            <Button
              variant="block"
              intent="destructive"
              size="sm"
              onClick={onDeleteSlip}
            >
              Delete
            </Button>
          </Dialog.Close>

          <div className="flex gap-2">
            <Dialog.Close asChild>
              <Button variant="ghost" intent="secondary" size="sm">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button variant="block" size="sm" onClick={onSaveSlip}>
                Save
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default EditSlipModal;
