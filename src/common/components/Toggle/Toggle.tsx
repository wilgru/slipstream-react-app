import { useState } from "react";

type ToggleProps = {
  children?: string | JSX.Element;
  className?: string;
  toggledOnColour?: string;
  styleType?: "block" | "icon";
  colour?: { border: string; background: string; text: string };
  width?: "fit" | "full";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  isToggled: boolean;
  icon?: (isToggleHovered: boolean) => JSX.Element;
};

enum ToggleStyleType {
  "block" = "border border-black font-medium",
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
  styleType = "block",
  colour = { border: "black", background: "white", text: "white" },
  toggledOnColour = "black",
  width = "fit",
  size = "medium",
  disabled = false,
  onClick,
  isToggled,
  icon,
}: ToggleProps) => {
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const toggleStyleType = ToggleStyleType[styleType];
  const toggleWidth = ToggleWidth[width];
  const toggleSize = styleType === "icon" ? "" : ToggleSize[size];
  const toggleToggledOffColour =
    styleType === "icon"
      ? "text-stone-500"
      : `bg-${colour.background} text-black`;
  const toggleToggledOnColour =
    styleType === "icon"
      ? `text-${toggledOnColour}`
      : `bg-${toggledOnColour} text-white`;

  const hoverColour =
    styleType === "icon"
      ? `hover:text-${toggledOnColour}`
      : `hover:bg-${toggledOnColour} hover:text-white`;

  const toggleStyles = [
    toggleStyleType,
    toggleWidth,
    toggleSize,
    isToggled ? toggleToggledOnColour : toggleToggledOffColour,
    hoverColour,
  ].join(" ");

  return (
    <button
      type="button"
      className={`flex gap-2 rounded-full text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${className} ${toggleStyles}`}
      disabled={disabled}
      onMouseEnter={() => setIsToggleHovered(true)}
      onMouseLeave={() => setIsToggleHovered(false)}
      onClick={onClick}
    >
      {icon && icon(isToggleHovered)}
      {children}
    </button>
  );
};
