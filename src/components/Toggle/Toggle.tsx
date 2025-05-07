import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { colours } from "src/constants/colours.constant";
import { cn } from "src/utils/cn";
import { Icon } from "../Icon/Icon";
import type { Colour } from "src/types/Colour.type";

type ToggleProps = {
  className?: string;
  children?: string | JSX.Element;
  size?: "sm" | "md" | "lg";
  colour?: Colour;
  isToggled: boolean;
  disabled?: boolean;
  onClick?: () => void;
  iconName?: string;
};

const toggleVariants = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "rounded-full",
    "text-sm",
    "transition-colors",
    "data-[state=off]:text-stone-500",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-orange-500",
  ],
  {
    variants: {
      size: {
        sm: "p-1 text-xs font-normal",
        md: "p-2 text-sm font-medium",
        lg: "p-6 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const Toggle = ({
  children,
  className,
  size = "md",
  colour = colours.orange,
  disabled = false,
  onClick,
  isToggled,
  iconName,
}: ToggleProps) => {
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  return (
    <TogglePrimitive.Root
      className={cn(
        toggleVariants({ size }),
        `data-[state=on]:${colour.text} hover:${colour.backgroundPill}`,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsToggleHovered(true)}
      onMouseLeave={() => setIsToggleHovered(false)}
      pressed={isToggled}
    >
      {iconName && (
        <Icon
          className={cn(isToggleHovered && colour.textPill)}
          iconName={iconName}
          size={size}
          weight={isToggled || isToggleHovered ? "fill" : "regular"}
        />
      )}
      {children}
    </TogglePrimitive.Root>
  );
};
