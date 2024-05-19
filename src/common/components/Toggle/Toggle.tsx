import { useState } from "react";

type ToggleProps = {
  className?: string;
  children?: string | JSX.Element;
  styleType?: "block" | "icon";
  colour?: { border: string; background: string; text: string };
  toggledOnColour?: string;
  width?: "fit" | "full";
  size?: "small" | "medium" | "large";
  isToggled: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: (isToggleHovered: boolean) => JSX.Element;
};

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

  let _styleType;
  let _size;
  let _toggledOnColour;
  let _toggledOffColour;
  let _hoverColour;
  const _width = ToggleWidth[width];

  switch (styleType) {
    case "icon":
      _styleType = "";
      _size = "";
      _toggledOnColour = `text-${toggledOnColour}`;
      _toggledOffColour = "text-stone-500";
      _hoverColour = `hover:text-${toggledOnColour}`;
      break;

    case "block":
      _styleType = "border border-black font-medium";
      _size = ToggleSize[size];
      _toggledOnColour = `bg-${toggledOnColour} text-white`;
      _toggledOffColour = `bg-${colour.background} text-black`;
      _hoverColour = `hover:bg-${toggledOnColour} hover:text-white`;
      break;
  }

  const toggleStyles = [
    _styleType,
    _width,
    _size,
    isToggled ? _toggledOnColour : _toggledOffColour,
    _hoverColour,
  ].join(" ");

  return (
    <button
      type="button"
      className={`${className} ${toggleStyles} flex gap-2 rounded-full text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
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
