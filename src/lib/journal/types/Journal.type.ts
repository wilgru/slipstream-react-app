import type { Dayjs } from "dayjs";
import type { Colour } from "src/lib/colour/Colour.type";

export type Journal = {
  id: string;
  name: string;
  colour: Colour;
  icon: string;
  slipCount: number;
  created: Dayjs;
  updated: Dayjs;
};
