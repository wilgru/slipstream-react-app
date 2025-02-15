import { cva } from "class-variance-authority";
import { useState } from "react";
import { colours } from "src/models/colours/colours.constant";
import { cn } from "src/utils/cn";
import { Icon } from "../Icon/Icon";
import type { Colour } from "src/models/colours/Colour.type";

type ButtonProps = {
  children?: string | JSX.Element;
  variant?: "block" | "ghost" | "link";
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
        variant: ["block", "ghost"],
        content: "text",
        size: "sm",
        className: "py-1 px-2",
      },
      {
        variant: ["block", "ghost"],
        content: "text",
        size: "md",
        className: "py-2 px-3",
      },
      {
        variant: ["block", "ghost"],
        content: "text",
        size: "lg",
        className: "py-3 px-4",
      },
      {
        variant: ["block", "ghost"],
        content: "icon",
        size: "sm",
        className: "p-1",
      },
      {
        variant: ["block", "ghost"],
        content: "icon",
        size: "md",
        className: "p-2",
      },
      {
        variant: ["block", "ghost"],
        content: "icon",
        size: "lg",
        className: "p-3",
      },
    ],
    defaultVariants: {
      variant: "block",
      size: "md",
    },
  }
);

export const Button = ({
  children,
  type = "button",
  variant = "block",
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
          size,
          content: iconName ? "icon" : "text",
        }),
        variant === "block" && colour.textPill,
        variant === "block" && colour.backgroundPill,
        variant === "block" && colour.textPillInverted,
        variant === "block" && colour.backgroundPillInverted,
        variant === "ghost" && `hover:${colour.textPill}`,
        variant === "ghost" && `hover:${colour.backgroundPill}`,
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
