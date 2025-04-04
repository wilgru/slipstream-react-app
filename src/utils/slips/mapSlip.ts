import dayjs from "dayjs";
import Delta from "quill-delta";
import type { RecordModel } from "pocketbase";
import type { Slip } from "src/types/Slip.type";

export const mapSlip = (slip: RecordModel): Slip => {
  return {
    id: slip.id,
    isDraft: false,
    title: slip.title,
    content: slip.content ? new Delta(slip.content) : new Delta(), // TODO: make not nullable in pocketbase
    isPinned: slip.isPinned,
    isFlagged: slip.isFlagged,
    journals: slip?.expand?.journals ?? [],
    tags: slip?.expand?.tags ?? [],
    deleted: null,
    created: dayjs(slip.created),
    updated: dayjs(slip.updated),
  };
};
