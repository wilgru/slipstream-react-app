export type DropdownMenuOption = { name: string; value: string; id: string };

type DropdownMenuProps = {
  children: JSX.Element;
  options: DropdownMenuOption[];
  visible: boolean;
  onSelectOption: (selectedOption: DropdownMenuOption) => void;
};

export const DropdownMenu = ({
  children,
  options,
  visible,
  onSelectOption,
}: DropdownMenuProps) => {
  return (
    <div className="relative">
      {children}
      {visible && (
        <div className="absolute z-10 left-0 top-6 flex flex-col justify-start text-xs bg-stone-100 border border-orange-500">
          {options.map((option) => (
            <button
              key={option.id}
              className="p-1 text-left text-stone-700 hover:bg-stone-700 hover:text-stone-100"
              onClick={() => {
                onSelectOption(option);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
