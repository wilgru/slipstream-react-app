import { cva } from "class-variance-authority";
import { useState } from "react";
import { colours } from "src/lib/colour/colours.constant";
import { cn } from "src/lib/utils/cn";
import { Icon } from "../Icon/Icon";
import type { Colour } from "src/lib/colour/Colour.type";

type ButtonProps = {
  children?: string | JSX.Element;
  variant?: "block" | "link" | "ghost";
  intent?: "primary" | "secondary" | "destructive";
  colour?: Colour;
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
        block: null,
        ghost: "text-stone-500",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        sm: "text-xs font-normal",
        md: "text-sm font-medium",
        lg: "text-md font-medium",
      },
      content: {
        text: null,
        icon: null,
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        variant: "block",
        className: "text-green-700 bg-green-100",
      },
      {
        intent: "secondary",
        variant: "block",
        className: "bg-white",
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
        className: "text-red-800 bg-red-100",
      },
      {
        size: "sm",
        content: "text",
        className: "py-1 px-2",
      },
      {
        size: "md",
        content: "text",
        className: "py-2 px-3",
      },
      {
        size: "lg",
        content: "text",
        className: "py-3 px-4",
      },
      {
        size: "sm",
        content: "icon",
        className: "p-1",
      },
      {
        size: "md",
        content: "icon",
        className: "p-2",
      },
      {
        size: "lg",
        content: "icon",
        className: "p-3",
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
  colour = colours.orange,
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
        buttonVariants({
          variant,
          intent,
          size,
          className,
          content: iconName ? "icon" : "text",
        }),
        `hover:${colour.textPill}`,
        `hover:${colour.backgroundPill}`,
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
          className={isButtonHovered ? colour.textPill : "text-stone-500"}
          weight={isButtonHovered ? "fill" : "regular"}
        />
      )}
      {children}
    </button>
  );
};
