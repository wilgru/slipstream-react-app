import { useState } from "react";

type ButtonProps = {
  children?: string | JSX.Element;
  iconHoverColour?: string;
  iconSize?: "small" | "medium";
  type?: "button" | "submit";
  styleType?: "block" | "block-outline" | "link" | "icon";
  colour?: { border: string; background: string; text: string };
  width?: "fit" | "full";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  icon?: (isButtonHovered: boolean) => JSX.Element;
};

enum ButtonStyleType {
  "block" = "border hover:bg-black hover:text-white hover:border-black",
  "block-outline" = "bg-white text-black border border-black hover:bg-black hover:text-white hover:border-black",
  "link" = "text-orange-500 hover:text-orange-700",
  "icon" = "text-stone-500 hover:text-black",
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

export const Button = ({
  children,
  type = "button",
  styleType = "block",
  colour = { border: "black", background: "white", text: "black" },
  width = "fit",
  size = "medium",
  disabled = false,
  onClick,
  icon,
}: ButtonProps) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const buttonStyleType = ButtonStyleType[styleType];
  const buttonColourStyle =
    styleType === "block"
      ? `bg-${colour.background} border-${colour.border} text-${colour.text}`
      : "";
  const buttonWidth = ButtonWidth[width];
  const buttonSize =
    styleType === "icon" || styleType === "link" ? "" : ButtonSize[size];

  const buttonStyles = [
    buttonStyleType,
    buttonColourStyle,
    buttonWidth,
    buttonSize,
  ].join(" ");

  return (
    <button
      type={type}
      className={`flex gap-2 h-full rounded-full items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${buttonStyles}`}
      disabled={disabled}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      onClick={onClick}
    >
      {icon && icon(isButtonHovered)}
      {children}
    </button>
  );
};
