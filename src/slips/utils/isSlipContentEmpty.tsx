import type Delta from "quill-delta";

export const isSlipContentEmpty = (SlipContent: Delta): boolean => {
  return (
    !SlipContent.length() || !SlipContent.ops.some((op) => op.insert !== "\n")
  );
};
