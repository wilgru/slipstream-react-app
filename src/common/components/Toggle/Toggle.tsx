import { Icon } from "src/common/components/Icon/Icon";

type ToggleProps = {
  children?: string | JSX.Element;
  className?: string;
  icon?: string;
  iconSize?: "small" | "medium" | "large";
  iconToggledOnColour?: string;
  styleType?: "block" | "icon";
  colour?: { border: string; background: string; text: string };
  width?: "fit" | "full";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  isToggled: boolean;
};

enum ToggleStyleType {
  "block" = "border font-medium hover:bg-black hover:border-black hover:text-white",
  "icon" = "",
}

enum ToggleSize {
  "small" = "px-2 py-1 text-xs font-normal",
  "medium" = "px-3 py-1 text-sm font-medium",
  "large" = "px-6 py-2 text-sm",
}

enum ToggleWidth {
  "full" = "w-full text-center",
  "fit" = "",
}

export const Toggle = ({
  children,
  className,
  icon,
  iconSize = "medium",
  iconToggledOnColour = "black", // TODO make required only if is icon style type
  styleType = "block",
  colour = { border: "black", background: "white", text: "white" },
  width = "fit",
  size = "medium",
  disabled = false,
  onClick,
  isToggled,
}: ToggleProps) => {
  const toggleBaseStyle =
    "rounded-full text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";
  const toggleStyleType = ToggleStyleType[styleType];
  const toggleColourStyle =
    styleType === "block" ? `border-${colour.border}` : "";
  const toggleWidth = ToggleWidth[width];
  const toggleSize = styleType === "icon" ? "" : ToggleSize[size];
  const toggleToggledOnColour =
    styleType === "icon"
      ? iconToggledOnColour
      : `bg-${colour.border} text-white`;
  const toggleToggledOffColour =
    styleType === "icon" ? "stone-500" : `bg-${colour.background} text-black`;

  const toggleStyles = [
    toggleBaseStyle,
    toggleStyleType,
    toggleColourStyle,
    toggleWidth,
    toggleSize,
    isToggled ? toggleToggledOnColour : toggleToggledOffColour,
  ].join(" ");

  return (
    <button
      type="button"
      className={`${className} ${toggleStyles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <Icon
          iconName={icon}
          size={iconSize}
          colour={isToggled ? toggleToggledOnColour : toggleToggledOffColour}
          hoverColour="black"
        />
      )}
      {children}
    </button>
  );
};
