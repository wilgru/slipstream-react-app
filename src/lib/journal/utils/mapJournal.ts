import type { Journal } from "../../lib/journal/types/Journal.type";
import type { RecordModel } from "pocketbase";

export const mapJournal = (journal: RecordModel): Journal => {
  return {
    id: journal.id,
    name: journal.name,
    colour: journal.colour ?? "default",
    slipCount: journal.totalSlips,
  };
};
