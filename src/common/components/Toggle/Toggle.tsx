import { getIcon } from "src/common/utils/getIcon";

type ToggleProps = {
  children?: string | JSX.Element;
  icon?: string;
  iconToggledOnColour?: string;
  styleType?: "block" | "icon";
  size?: "medium" | "large";
  width?: "fit" | "full";
  disabled?: boolean;
  onClick?: () => void;
  isToggled: boolean;
};

enum ToggleStyleType {
  "block" = "border border-stone-700 font-medium hover:bg-stone-800 hover:text-stone-100",
  "icon" = "",
}

enum ToggleSize {
  "medium" = "px-4 py-1",
  "large" = "px-6 py-2",
}

enum ToggleWidth {
  "full" = "w-full text-center",
  "fit" = "",
}

enum ToggleOnColour {
  "block" = "bg-stone-700 text-stone-100",
}

enum ToggleOffColour {
  "block" = "bg-stone-100 text-stone-700",
}

export const Toggle = ({
  children,
  icon,
  iconToggledOnColour = "stone-700", // TODO make required only if is icon style type
  styleType = "block",
  width = "fit",
  size = "medium",
  disabled = false,
  onClick,
  isToggled,
}: ToggleProps) => {
  const toggleBaseStyle =
    "text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";
  const toggleStyleType = ToggleStyleType[styleType];
  const toggleWidth = ToggleWidth[width];
  const toggleSize = styleType === "icon" ? "" : ToggleSize[size];
  const toggleToggledOnColour =
    styleType === "icon" ? iconToggledOnColour : ToggleOnColour[styleType];
  const toggleToggledOffColour =
    styleType === "icon" ? "stone-500" : ToggleOffColour[styleType];

  const toggleStyles = [
    toggleBaseStyle,
    toggleStyleType,
    toggleWidth,
    toggleSize,
    isToggled ? toggleToggledOnColour : toggleToggledOffColour,
  ].join(" ");

  const toggleIcon = icon
    ? getIcon(
        icon,
        isToggled ? toggleToggledOnColour : toggleToggledOffColour,
        isToggled ? toggleToggledOffColour : toggleToggledOnColour
      )
    : undefined;

  return (
    <button
      type="button"
      className={toggleStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {toggleIcon}
      {children}
    </button>
  );
};
