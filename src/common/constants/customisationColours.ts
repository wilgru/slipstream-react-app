import type { Colour } from "src/common/types/Colour";

// these colours are manually included with the build via the tailwind.config.js
export const customisationColours: Colour[] = [
  { name: "red", primary: "red-400", secondary: "red-50" },
  {
    name: "orange",
    primary: "orange-400",
    secondary: "orange-50", //TODO: delete secondary colours?
  },
  {
    name: "yellow",
    primary: "yellow-400",
    secondary: "yellow-50",
  },
  {
    name: "lime",
    primary: "lime-400",
    secondary: "lime-50",
  },
  {
    name: "green",
    primary: "green-400",
    secondary: "green-50",
  },
  {
    name: "blue",
    primary: "blue-400",
    secondary: "blue-50",
  },
  {
    name: "cyan",
    primary: "cyan-400",
    secondary: "cyan-50",
  },
  {
    name: "pink",
    primary: "pink-400",
    secondary: "pink-50",
  },
  {
    name: "purple",
    primary: "purple-400",
    secondary: "purple-50",
  },
  {
    name: "brown",
    primary: "amber-600",
    secondary: "amber-50",
  },
  {
    name: "grey",
    primary: "gray-400",
    secondary: "gray-100",
  },
  {
    name: "default",
    primary: "stone-600",
    secondary: "stone-100",
  },
];
