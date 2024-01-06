import Bin from "src/common/icons/bin.svg?react";
import Close from "src/common/icons/close.svg?react";
import Flag from "src/common/icons/flag.svg?react";
import Pin from "src/common/icons/pin.svg?react";

enum IconSize {
  "small" = "h-3",
  "medium" = "h-8",
}

export const getIcon = (
  iconName: string,
  size: "small" | "medium" = "medium",
  colour: string = "stone-500",
  hoverColour: string = "stone-800"
): JSX.Element | undefined => {
  const iconSize = IconSize[size];

  // TODO: Tailwind wont recognize these classes since they're calculated at runtime, so have to include the possible styles explicitly in the safelist in tailwind.config.js otherwise the styles will get purged in the build process
  const iconStyle = `${iconSize} fill-${colour} ${
    hoverColour ? `hover:fill-${hoverColour}` : ""
  }`;

  switch (iconName) {
    case "pin":
      return <Pin className={iconStyle} />;
    case "flag":
      return <Flag className={iconStyle} />;
    case "bin":
      return <Bin className={iconStyle} />;
    case "close":
      return <Close className={iconStyle} />;
  }
};
