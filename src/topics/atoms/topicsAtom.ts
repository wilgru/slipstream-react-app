import { atom } from "jotai";
import type { Topic } from "src/topics/types/Topic.type";

export const topicsAtom = atom<Topic[]>([]);
