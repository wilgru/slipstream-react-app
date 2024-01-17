import type { CustomisationColour } from "src/common/components/types/CustomisationColour";

export type Topic = {
  id: string;
  name: string;
  colour: CustomisationColour;
  slipCount?: number;
};
