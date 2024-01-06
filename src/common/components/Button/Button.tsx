import { getIcon } from "src/common/utils/getIcon";

type ButtonProps = {
  children?: string | JSX.Element;
  icon?: string;
  iconHoverColour?: string;
  iconSize?: "small" | "medium";
  type?: "button" | "submit";
  styleType?: "block" | "block-outline" | "link" | "icon";
  size?: "small" | "medium" | "large";
  width?: "fit" | "full";
  disabled?: boolean;
  onClick?: () => void;
};

enum ButtonStyleType {
  "block" = "bg-stone-700 text-stone-100  border border-stone-700 hover:bg-stone-800 hover:border-stone-800",
  "block-outline" = "bg-stone-100 text-stone-700 border border-stone-700 hover:bg-stone-800 hover:text-stone-100 hover:border-stone-800",
  "link" = "text-orange-500 hover:text-orange-700",
  "icon" = "",
}

enum ButtonSize {
  "small" = "px-2 py-1 text-xs font-normal",
  "medium" = "px-3 py-1 text-sm font-medium",
  "large" = "px-6 py-2 text-sm",
}

enum ButtonWidth {
  "full" = "w-full justify-center",
  "fit" = "",
}

enum ButtonIconColour {
  "block" = "stone-100",
  "block-outline" = "stone-700",
  "link" = "orange-500",
  "icon" = "stone-500",
}

enum ButtonIconHoverColour {
  "block" = "stone-100",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  "block-outline" = "stone-100",
  "link" = "orange-700",
  "icon" = "",
}

export const Button = ({
  children,
  icon,
  iconHoverColour = "stone-800", // TODO make required only if is icon style type
  iconSize = "medium",
  type = "button",
  styleType = "block",
  width = "fit",
  size = "medium",
  disabled = false,
  onClick,
}: ButtonProps) => {
  const buttonBaseStyle =
    "flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";
  const buttonStyleType = ButtonStyleType[styleType];
  const buttonWidth = ButtonWidth[width];
  const buttonSize =
    styleType === "icon" || styleType === "link" ? "" : ButtonSize[size];

  const buttonStyles = [
    buttonBaseStyle,
    buttonStyleType,
    buttonWidth,
    buttonSize,
  ].join(" ");

  const buttonIcon = icon
    ? getIcon(
        icon,
        iconSize,
        ButtonIconColour[styleType],
        ButtonIconHoverColour[styleType] || iconHoverColour
      )
    : undefined;

  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonIcon}
      {children}
    </button>
  );
};
