import type { Colour } from "./Colour.type";

export const colours = {
  red: {
    name: "red",
    text: "text-red-400",
    backgroundLighter: "bg-red-50",
    backgroundLight: "bg-red-100",
    backgroundDark: "bg-red-400",
  },
  orange: {
    name: "orange",
    text: "text-orange-400",
    backgroundLighter: "bg-orange-50",
    backgroundLight: "bg-orange-100",
    backgroundDark: "bg-orange-400",
  },
  yellow: {
    name: "yellow",
    text: "text-yellow-400",
    backgroundLighter: "bg-yellow-50",
    backgroundLight: "bg-yellow-100",
    backgroundDark: "bg-yellow-400",
  },
  lime: {
    name: "lime",
    text: "text-lime-400",
    backgroundLighter: "bg-lime-50",
    backgroundLight: "bg-lime-100",
    backgroundDark: "bg-lime-400",
  },
  green: {
    name: "green",
    text: "text-green-400",
    backgroundLighter: "bg-green-50",
    backgroundLight: "bg-green-100",
    backgroundDark: "bg-green-400",
  },
  blue: {
    name: "blue",
    text: "text-blue-400",
    backgroundLighter: "bg-blue-50",
    backgroundLight: "bg-blue-100",
    backgroundDark: "bg-blue-400",
  },
  cyan: {
    name: "cyan",
    text: "text-cyan-400",
    backgroundLighter: "bg-cyan-50",
    backgroundLight: "bg-cyan-100",
    backgroundDark: "bg-cyan-400",
  },
  pink: {
    name: "pink",
    text: "text-pink-400",
    backgroundLighter: "bg-pink-50",
    backgroundLight: "bg-pink-100",
    backgroundDark: "bg-pink-400",
  },
  purple: {
    name: "purple",
    text: "text-purple-400",
    backgroundLighter: "bg-purple-50",
    backgroundLight: "bg-purple-100",
    backgroundDark: "bg-purple-400",
  },
  brown: {
    name: "brown",
    text: "text-amber-700",
    backgroundLighter: "bg-amber-50",
    backgroundLight: "bg-amber-200",
    backgroundDark: "bg-amber-600",
  },
  grey: {
    name: "grey",
    text: "text-gray-400",
    backgroundLighter: "bg-gray-100",
    backgroundLight: "bg-gray-200",
    backgroundDark: "bg-gray-400",
  },
};

enum ColourName {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  lime = "lime",
  green = "green",
  blue = "blue",
  cyan = "cyan",
  pink = "pink",
  purple = "purple",
  brown = "brown",
  grey = "grey",
}

export const getColour = (name: ColourName): Colour => {
  return colours[name];
};

export const getAllColours = (): Colour[] => {
  return Object.values(colours);
};
