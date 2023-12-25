import Bin from "src/common/icons/bin.svg?react";
import Flag from "src/common/icons/flag.svg?react";
import Pin from "src/common/icons/pin.svg?react";

export const getIcon = (
  iconName: string,
  colour: string = "stone-500",
  hoverColour?: string
): JSX.Element | undefined => {
  // TODO: Tailwind wont recognize these classes since they're calculated at runtime, so have to include the possible styles explicitly in the safelist in tailwind.config.js otherwise the styles will get purged in the build process
  const iconStyle = `h-8 fill-${colour} ${
    hoverColour ? `hover:fill-${hoverColour}` : ""
  }`;

  switch (iconName) {
    case "pin":
      return <Pin className={iconStyle} />;
    case "flag":
      return <Flag className={iconStyle} />;
    case "bin":
      return <Bin className={iconStyle} />;
  }
};
