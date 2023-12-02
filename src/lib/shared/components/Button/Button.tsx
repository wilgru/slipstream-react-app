type ButtonProps = {
  children: string | JSX.Element;
  type?: "block" | "minimal";
  onClick: () => void;
};

export const Button = ({ children, type = "block", onClick }: ButtonProps) => {
  const buttonStyle =
    type === "block" ? "bg-stone-700 hover:bg-stone-800 px-4 py-1" : "";

  return (
    <button
      type="button"
      className={
        buttonStyle +
        " text-stone-100 focus:ring-4 focus:ring-orange-500 font-medium text-sm"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
