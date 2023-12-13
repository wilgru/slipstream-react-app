type ButtonProps = {
  children: string | JSX.Element;
  type?: "button" | "submit";
  styleType?: "block" | "minimal";
  size?: "medium" | "large";
  width?: "fit" | "full";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  type = "button",
  styleType = "block",
  size = "medium",
  width = "fit",
  disabled = false,
  onClick,
}: ButtonProps) => {
  const buttonStyle =
    styleType === "block" ? "bg-stone-700 hover:bg-stone-800 px-4 py-1" : "";
  const buttonWidth = width === "full" ? "w-full text-center" : "";
  const buttonSize = size === "medium" ? "px-4 py-1" : "px-6 py-2";

  return (
    <button
      type={type}
      className={
        buttonWidth +
        " " +
        (styleType === "block" && buttonSize + " ") +
        buttonStyle +
        " text-stone-100 font-medium text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
