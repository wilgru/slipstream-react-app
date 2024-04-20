import type { Dayjs } from "dayjs";
import type Delta from "quill-delta";
import type { Topic } from "src/topics/types/Topic.type";

export type Slip = {
  id: string;
  isDraft: boolean; // FE property only
  title: string | null;
  content: Delta;
  isPinned: boolean;
  isFlagged: boolean;
  topics: Topic[];
  deleted: Dayjs | null;
  created: Dayjs;
  updated: Dayjs;
};
