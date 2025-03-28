import { colours } from "src/constants/colours.constant";
import type { Colour } from "src/types/Colour.type";

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
