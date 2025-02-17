import type { Dayjs } from "dayjs";
import type { Colour } from "src/types/Colour.type";

export type Journal = {
  id: string;
  name: string;
  colour: Colour;
  icon: string;
  slipCount: number;
  groupBy: "created" | "journal";
  created: Dayjs;
  updated: Dayjs;
};
