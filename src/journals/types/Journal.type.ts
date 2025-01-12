import type { Slip } from "src/slips/types/Slip.type";

export type Journal = {
  id: string;
  name: string;
  colour: string;
  slips?: Slip[];
};
