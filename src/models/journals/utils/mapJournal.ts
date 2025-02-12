import { getColour } from "src/models/colours/utils/getColour";
import type { RecordModel } from "pocketbase";
import type { Journal } from "src/models/journals/Journal.type";

export const mapJournal = (journal: RecordModel): Journal => {
  return {
    id: journal.id,
    name: journal.name,
    colour: getColour(journal.colour),
    icon: journal.icon,
    slipCount: journal.totalSlips,
    groupBy: journal.groupBy,
    created: journal.createdAt,
    updated: journal.updatedAt,
  };
};
