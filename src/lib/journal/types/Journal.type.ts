import type { Dayjs } from "dayjs";

export type Journal = {
  id: string;
  name: string;
  colour: string;
  icon: string;
  slipCount: number;
  created: Dayjs;
  updated: Dayjs;
};
