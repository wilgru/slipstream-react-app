import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "src/common/utils/cn";
import { Icon } from "../Icon/Icon";

type ButtonProps = {
  children?: string | JSX.Element;
  variant?: "block" | "link" | "ghost";
  intent?: "primary" | "secondary" | "destructive";
  colour?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  iconName?: string;
};

const buttonVariants = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "h-full",
    "rounded-full",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-orange-500",
  ],
  {
    variants: {
      intent: {
        primary: null,
        secondary: null,
        destructive: null,
      },
      variant: {
        block:
          "text-black border border-black hover:bg-black hover:text-white hover:border-black",
        ghost: "text-stone-500",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        sm: "p-1 text-xs font-normal",
        md: "p-2 text-sm font-medium",
        lg: "p-3 text-md font-medium",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "block",
        className: "bg-orange-100",
      },
      {
        intent: "primary",
        variant: "ghost",
        className: "hover:bg-orange-100 hover:text-orange-500",
      },
      {
        intent: ["primary", "secondary"],
        variant: "link",
        className: "text-stone-500 hover:text-orange-500 hover:bg-orange-100",
      },
      {
        intent: "secondary",
        variant: "ghost",
        className: "hover:bg-orange-100 hover:text-orange-500",
      },
      {
        intent: "destructive",
        variant: "block",
        className: "bg-red-400",
      },
    ],
    defaultVariants: {
      intent: "primary",
      variant: "block",
      size: "md",
    },
  }
);

export const Button = ({
  children,
  type = "button",
  variant = "block",
  intent = "primary",
  size = "md",
  className,
  disabled = false,
  onClick,
  iconName,
}: ButtonProps) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, intent, size, className }),
        className
      )}
      disabled={disabled}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      onClick={onClick}
    >
      {iconName && (
        <Icon
          iconName={iconName}
          size={size}
          className={isButtonHovered ? "text-orange-500" : "text-stone-500"}
          weight={isButtonHovered ? "fill" : "regular"}
        />
      )}
      {children}
    </button>
  );
};
