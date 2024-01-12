import type { HTMLInputTypeAttribute } from "react";

type InputType = {
  id: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  value: string;
  size: "medium" | "large";
  onChange: (e: { target: { name: string; value: string } }) => void;
};

enum InputSize {
  "medium" = "p-1 text-sm",
  "large" = "p-2 text-md",
}

export const Input = ({
  id,
  size,
  type = "text",
  required = false,
  value,
  onChange,
}: InputType): JSX.Element => {
  return (
    <input
      required={required}
      id={id}
      name={type}
      type={type}
      autoComplete={type}
      onChange={onChange}
      value={value}
      className={`block w-full ${InputSize[size]} bg-stone-100 text-stone-700 border border-stone-700 placeholder:text-stone-500 focus:border-orange-500`}
    />
  );
};
