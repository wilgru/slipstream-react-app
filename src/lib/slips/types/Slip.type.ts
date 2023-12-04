import type { Dayjs } from "dayjs";
import type Delta from "quill-delta";

export type Slip = {
  id: string;
  draft: boolean;
  title: string | null;
  content: Delta;
  isPinned: boolean;
  isFlagged: boolean;
  created: Dayjs;
};
