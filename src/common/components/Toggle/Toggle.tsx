import { Icon } from "src/common/components/Icon/Icon";

type ToggleProps = {
  children?: string | JSX.Element;
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
  "block" = "border font-medium hover:bg-stone-800 hover:border-stone-800 hover:text-stone-100",
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
  icon,
  iconSize = "medium",
  iconToggledOnColour = "stone-700", // TODO make required only if is icon style type
  styleType = "block",
  colour = { border: "stone-700", background: "stone-100", text: "stone-100" },
  width = "fit",
  size = "medium",
  disabled = false,
  onClick,
  isToggled,
}: ToggleProps) => {
  const toggleBaseStyle =
    "text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";
  const toggleStyleType = ToggleStyleType[styleType];
  const toggleColourStyle =
    styleType === "block" ? `border-${colour.border}` : "";
  const toggleWidth = ToggleWidth[width];
  const toggleSize = styleType === "icon" ? "" : ToggleSize[size];
  const toggleToggledOnColour =
    styleType === "icon"
      ? iconToggledOnColour
      : `bg-${colour.border} text-stone-100`;
  const toggleToggledOffColour =
    styleType === "icon"
      ? "stone-500"
      : `bg-${colour.background} text-stone-700`;

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
      className={toggleStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <Icon
          iconName={icon}
          size={iconSize}
          colour={isToggled ? toggleToggledOnColour : toggleToggledOffColour}
          hoverColour="stone-800"
        />
      )}
      {children}
    </button>
  );
};
