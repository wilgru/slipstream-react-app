import { atom } from "jotai";
import type { Slip } from "src/slips/types/Slip.type";

export const slipsAtom = atom<Slip[]>([]);
