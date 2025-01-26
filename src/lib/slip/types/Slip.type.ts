import type { Dayjs } from "dayjs";
import type Delta from "quill-delta";
import type { Journal } from "src/lib/journal/types/Journal.type";
import type { Tag } from "src/lib/tag/types/Tag";

export type Slip = {
  id: string;
  isDraft: boolean; // TODO: remove
  title: string | null;
  content: Delta;
  isPinned: boolean;
  isFlagged: boolean;
  journals: Journal[];
  tags: Tag[];
  deleted: Dayjs | null;
  created: Dayjs;
  updated: Dayjs;
};
