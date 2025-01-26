import type { Slip } from "src/lib/slip/types/Slip.type";

export type Journal = {
  id: string;
  name: string;
  colour: string;
  slips?: Slip[];
};
