export type DropdownMenuOption = { name: string; action: () => void };

type DropdownMenuProps = {
  children: JSX.Element;
  options: DropdownMenuOption[];
  visible: boolean;
};

export const DropdownMenu = ({
  children,
  options,
  visible,
}: DropdownMenuProps) => {
  return (
    <div className="relative">
      {children}
      {visible && (
        <div className="absolute z-10 left-0 flex flex-col justify-start text-xs bg-stone-100 border border-orange-500">
          {options.map((option, index) => (
            <button
              key={index}
              className="p-1 text-left text-stone-700 hover:bg-stone-700 hover:text-stone-100"
              onClick={option.action}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
