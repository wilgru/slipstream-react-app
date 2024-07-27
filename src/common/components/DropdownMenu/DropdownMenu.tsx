import { useEffect, useRef } from "react";

export type DropdownMenuOption = { name: string; action: () => void };

type DropdownMenuProps = {
  children: JSX.Element;
  options: DropdownMenuOption[];
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
};

export const DropdownMenu = ({
  children,
  options,
  visible,
  setVisible,
}: DropdownMenuProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        wrapperRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenuRef, setVisible]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="h-full">{children}</div>

      {visible && (
        <div
          ref={dropdownMenuRef}
          className="absolute z-10 left-0 flex flex-col justify-start text-xs bg-white border border-black rounded-md"
        >
          {options.map((option, index) => (
            <button
              key={index}
              className="p-1 text-left text-black hover:bg-black hover:text-white"
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
