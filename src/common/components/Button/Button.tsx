import { useState } from "react";

type ButtonProps = {
  children?: string | JSX.Element;
  styleType?: "block" | "block-outline" | "link" | "icon";
  colour?: { border: string; background: string; text: string };
  width?: "fit" | "full";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  icon?: (isButtonHovered: boolean) => JSX.Element;
};

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

  let _styleType;
  let _colour;
  let _size;
  const _width = ButtonWidth[width];

  switch (styleType) {
    case "icon":
      _styleType = "text-stone-500 hover:text-black";
      _size = "";
      _colour = "";
      break;

    case "link":
      _styleType = "text-orange-500 hover:text-orange-700";
      _size = "";
      _colour = "";
      break;

    case "block":
      _styleType = "border hover:bg-black hover:text-white hover:border-black";
      _size = ButtonSize[size];
      _colour = `bg-${colour.background} border-${colour.border} text-${colour.text}`;
      break;

    case "block-outline":
      _styleType =
        "bg-white text-black border border-black hover:bg-black hover:text-white hover:border-black";
      _size = ButtonSize[size];
      _colour = "";
      break;
  }

  const buttonStyles = [_styleType, _width, _size, _colour].join(" ");

  return (
    <button
      type={type}
      className={`${buttonStyles} flex gap-2 h-full rounded-full items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
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
