import type { Dayjs } from "dayjs";
import type Delta from "quill-delta";
import type { Journal } from "src/types/Journal.type";
import type { Tag } from "src/types/Tag.type";

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

export type SlipsGroup = {
  title: string;
  slips: Slip[];
};

export type SlipsGroupDividedByTitle = {
  title: string;
  slipsWithNoTitle: Slip[];
  slipsWithTitle: Slip[];
};
