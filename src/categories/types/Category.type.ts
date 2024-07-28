import type { Dayjs } from "dayjs";

export type Category = {
  id: string;
  name: string;
  created: Dayjs;
  updated: Dayjs;
};
