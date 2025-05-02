import { useEffect, useState } from "react";
import { colours } from "src/constants/colours.constant";
import { useGetJournals } from "./journals/useGetJournals";
import type { RawNodeDatum } from "react-d3-tree";
import type { Journal } from "src/types/Journal.type";

const buildTree = (journals: Journal[]): RawNodeDatum => {
  const createNode = (journal: Journal) => ({
    name: journal.name,
    attributes: {
      ...journal,
    },
    // children: journal.subJournals ? journal.subJournals.map(createNode) : [],
  });

  const builtTree = {
    name: "Home",
    attributes: {
      name: "Home",
      colour: colours.orange,
      icon: "home",
      slipCount: 300,
    },
    children: journals.map(createNode),
  };

  return builtTree;
};

export const useTagTree = (): RawNodeDatum => {
  const { journals } = useGetJournals();
  const [tree, setTree] = useState<RawNodeDatum>({
    name: "Home",
    attributes: {
      name: "Home",
      colour: colours.orange,
      icon: "home",
      slipCount: 300,
    },
    children: [],
  });

  useEffect(() => {
    setTree(buildTree(journals));
  }, [journals]);

  return tree;
};
