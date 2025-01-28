import type { RecordModel } from "pocketbase";
import type { Journal } from "src/lib/journal/types/Journal.type";

export const mapJournal = (journal: RecordModel): Journal => {
  return {
    id: journal.id,
    name: journal.name,
    colour: journal.colour ?? "default",
    icon: journal.icon,
    slipCount: journal.totalSlips,
    created: journal.createdAt,
    updated: journal.updatedAt,
  };
};
