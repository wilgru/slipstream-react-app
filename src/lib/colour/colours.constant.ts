import type { Colour } from "./Colour.type";

export const colours = {
  red: {
    name: "red",
    text: "text-red-400",
    textPill: "text-red-500",
    background: "bg-red-400",
    backgroundPill: "bg-red-100",
    backgroundGlow: "bg-red-50",
  },
  orange: {
    name: "orange",
    text: "text-orange-400",
    textPill: "text-orange-500",
    background: "bg-orange-400",
    backgroundPill: "bg-orange-100",
    backgroundGlow: "bg-orange-50",
  },
  yellow: {
    name: "yellow",
    text: "text-yellow-400",
    textPill: "text-yellow-500",
    background: "bg-yellow-400",
    backgroundPill: "bg-yellow-100",
    backgroundGlow: "bg-yellow-50",
  },
  lime: {
    name: "lime",
    text: "text-lime-400",
    textPill: "text-lime-500",
    background: "bg-lime-400",
    backgroundPill: "bg-lime-100",
    backgroundGlow: "bg-lime-50",
  },
  green: {
    name: "green",
    text: "text-green-400",
    textPill: "text-green-500",
    background: "bg-green-400",
    backgroundPill: "bg-green-100",
    backgroundGlow: "bg-green-50",
  },
  blue: {
    name: "blue",
    text: "text-blue-400",
    textPill: "text-blue-500",
    background: "bg-blue-400",
    backgroundPill: "bg-blue-100",
    backgroundGlow: "bg-blue-50",
  },
  cyan: {
    name: "cyan",
    text: "text-cyan-400",
    textPill: "text-cyan-500",
    background: "bg-cyan-400",
    backgroundPill: "bg-cyan-100",
    backgroundGlow: "bg-cyan-50",
  },
  pink: {
    name: "pink",
    text: "text-pink-400",
    textPill: "text-pink-500",
    background: "bg-pink-400",
    backgroundPill: "bg-pink-100",
    backgroundGlow: "bg-pink-50",
  },
  purple: {
    name: "purple",
    text: "text-purple-400",
    textPill: "text-purple-500",
    background: "bg-purple-400",
    backgroundPill: "bg-purple-100",
    backgroundGlow: "bg-purple-50",
  },
  brown: {
    name: "brown",
    text: "text-amber-600",
    textPill: "text-amber-700",
    background: "bg-amber-600",
    backgroundPill: "bg-amber-200",
    backgroundGlow: "bg-amber-50",
  },
  grey: {
    name: "grey",
    text: "text-gray-400",
    textPill: "text-gray-500",
    background: "bg-gray-400",
    backgroundPill: "bg-gray-200",
    backgroundGlow: "bg-gray-100",
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
