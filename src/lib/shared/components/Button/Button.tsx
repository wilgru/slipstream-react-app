type ButtonProps = {
  text: string;
  onClick: () => void;
};

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-stone-700 text-stone-100 hover:bg-stone-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-1"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
