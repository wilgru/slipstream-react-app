import { createContext } from "react";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type Context = {
  slips: Slip[];
  setSlips: React.Dispatch<React.SetStateAction<Slip[]>>;
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
};

export const context = createContext<Context>({
  slips: [],
  setSlips: () => {},
  topics: [],
  setTopics: () => {},
});
