import Bin from "src/common/icons/bin.svg?react";
import Close from "src/common/icons/close.svg?react";
import Ellipsis from "src/common/icons/ellipsis.svg?react";
import Flag from "src/common/icons/flag.svg?react";
import LeftArrowWithBar from "src/common/icons/leftArrowWithBar.svg?react";
import MagnifyingGlass from "src/common/icons/magnifyingGlass.svg?react";
import Pencil from "src/common/icons/pencil.svg?react";
import Pin from "src/common/icons/pin.svg?react";
import RightArrowWithBar from "src/common/icons/rightArrowWithBar.svg?react";

type IconProps = {
  iconName: string;
  size?: "small" | "medium" | "large";
  colour?: string;
  hoverColour?: string;
};

enum IconSize {
  "small" = "h-4",
  "medium" = "h-6",
  "large" = "h-8",
}

const Icon = ({
  iconName,
  size = "medium",
  colour = "stone-500",
  hoverColour,
}: IconProps) => {
  const iconSize = IconSize[size];

  // NOTE: Tailwind wont recognize these classes since they're calculated at runtime,
  // so have to include the possible styles explicitly in the safelist in tailwind.config.js
  // otherwise the styles will get purged in the build process
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
    case "pencil":
      return <Pencil className={iconStyle} />;
    case "close":
      return <Close className={iconStyle} />;
    case "ellipsis":
      return <Ellipsis className={iconStyle} />;
    case "magnifyingGlass":
      return <MagnifyingGlass className={iconStyle} />;
    case "leftArrowWithBar":
      return <LeftArrowWithBar className={iconStyle} />;
    case "rightArrowWithBar":
      return <RightArrowWithBar className={iconStyle} />;
  }
};

export { Icon };
