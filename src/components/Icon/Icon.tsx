import {
  Gear,
  Pencil,
  Plus,
  X,
  Flag,
  PushPin,
  Trash,
  DotsThree,
  ChatCircle,
  ArrowsDownUp,
  UserCircle,
  House,
  Palette,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { icons } from "src/constants/icons.constant";

type IconProps = {
  iconName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  weight?: "fill" | "regular";
};

enum IconSize {
  "sm" = 18,
  "md" = 24,
  "lg" = 32,
  "xl" = 40,
}

const Icon = ({
  iconName,
  size = "md",
  weight = "fill",
  className,
}: IconProps) => {
  const iconSize = IconSize[size];

  const iconProps = { size: iconSize, weight, className };

  const icon = icons.find((icon) => icon.name === iconName);

  if (icon) {
    return <icon.icon {...iconProps} />;
  }

  switch (iconName) {
    case "pushPin":
      return <PushPin {...iconProps} />;
    case "flag":
      return <Flag {...iconProps} />;
    case "trash":
      return <Trash {...iconProps} />;
    case "pencil":
      return <Pencil {...iconProps} />;
    case "x":
      return <X {...iconProps} weight="bold" />;
    case "gear":
      return <Gear {...iconProps} />;
    case "plus":
      return <Plus {...iconProps} weight="bold" />;
    case "dotsThree":
      return <DotsThree {...iconProps} weight="bold" />;
    case "chatCircle":
      return <ChatCircle {...iconProps} />;
    case "arrowsDownUp":
      return <ArrowsDownUp {...iconProps} />;
    case "house":
      return <House {...iconProps} />;
    case "user":
      return <UserCircle {...iconProps} />;
    case "palette":
      return <Palette {...iconProps} />;
    case "caretLeft":
      return <CaretLeft {...iconProps} />;
    case "caretRight":
      return <CaretRight {...iconProps} />;
    default:
      return <></>;
  }
};

export { Icon };
