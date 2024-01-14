import { useState } from "react";
import { context } from "./context";
import type { Slip } from "src/slips/types/Slip.type";
import type { Topic } from "src/topics/types/Topic.type";

type ContextProviderProps = {
  children?: JSX.Element;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [slips, setSlips] = useState<Slip[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  return (
    <context.Provider
      value={{
        slips,
        setSlips,
        topics,
        setTopics,
        selectedTopicIds,
        setSelectedTopicIds,
      }}
    >
      {children}
    </context.Provider>
  );
};
