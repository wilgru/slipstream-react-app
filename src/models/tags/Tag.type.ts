import type { Dayjs } from "dayjs";

export type Tag = {
  id: string;
  name: string;
  created: Dayjs;
  updated: Dayjs;
};
