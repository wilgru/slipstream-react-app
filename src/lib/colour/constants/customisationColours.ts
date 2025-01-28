import type { Colour } from "src/lib/colour/types/Colour";

// these colours are manually included with the build via the tailwind.config.js
export const customisationColours: Colour[] = [
  { name: "red", textClass: "text-red-500", backgroundClass: "bg-red-100" },
  {
    name: "orange",
    textClass: "text-orange-500",
    backgroundClass: "bg-orange-100",
  },
  {
    name: "yellow",
    textClass: "text-yellow-500",
    backgroundClass: "bg-yellow-100",
  },
  {
    name: "lime",
    textClass: "text-lime-500",
    backgroundClass: "bg-lime-100",
  },
  {
    name: "green",
    textClass: "text-green-500",
    backgroundClass: "bg-green-100",
  },
  {
    name: "blue",
    textClass: "text-blue-500",
    backgroundClass: "bg-blue-100",
  },
  {
    name: "cyan",
    textClass: "text-cyan-500",
    backgroundClass: "bg-cyan-100",
  },
  {
    name: "pink",
    textClass: "text-pink-500",
    backgroundClass: "bg-pink-100",
  },
  {
    name: "purple",
    textClass: "text-purple-500",
    backgroundClass: "bg-purple-100",
  },
  {
    name: "brown",
    textClass: "text-amber-700",
    backgroundClass: "bg-amber-200",
  },
  {
    name: "grey",
    textClass: "text-gray-500",
    backgroundClass: "bg-gray-200",
  },
];
