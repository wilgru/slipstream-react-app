import {
  Gear,
  Pencil,
  Plus,
  SidebarSimple,
  X,
  Flag,
  PushPin,
  Trash,
  DotsThree,
  ChatCircle,
  Book,
  ArrowsDownUp,
} from "@phosphor-icons/react";

type IconProps = {
  iconName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  weight?: "fill" | "regular";
};

enum IconSize {
  "sm" = 18,
  "md" = 24,
  "lg" = 32,
}

const Icon = ({
  iconName,
  size = "md",
  weight = "fill",
  className,
}: IconProps) => {
  const iconSize = IconSize[size];

  const iconProps = { size: iconSize, weight, className };

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
    case "sidebarSimple":
      return <SidebarSimple {...iconProps} />;
    case "dotsThree":
      return <DotsThree {...iconProps} weight="bold" />;
    case "Book":
      return <Book {...iconProps} />;
    case "chatCircle":
      return <ChatCircle {...iconProps} />;
    case "arrowsDownUp":
      return <ArrowsDownUp {...iconProps} />;
    default:
      return <></>;
  }
};

export { Icon };
