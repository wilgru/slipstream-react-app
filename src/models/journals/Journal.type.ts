import type { Dayjs } from "dayjs";
import type { Colour } from "src/models/colours/Colour.type";

export type Journal = {
  id: string;
  name: string;
  colour: Colour;
  icon: string;
  slipCount: number;
  created: Dayjs;
  updated: Dayjs;
};
