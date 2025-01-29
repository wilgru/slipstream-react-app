import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "src/utils/cn";
import { Icon } from "../Icon/Icon";

type ToggleProps = {
  className?: string;
  children?: string | JSX.Element;
  size?: "sm" | "md" | "lg";
  colour?: "default" | "red";
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
      colour: {
        default:
          "data-[state=on]:text-orange-500 data-[state=off]:hover:text-orange-500 hover:bg-orange-100",
        red: "data-[state=on]:text-red-500 data-[state=off]:hover:text-red-500 hover:bg-red-100",
      },
    },
    defaultVariants: {
      size: "md",
      colour: "default",
    },
  }
);

export const Toggle = ({
  children,
  className,
  size = "md",
  colour = "default",
  disabled = false,
  onClick,
  isToggled,
  iconName,
}: ToggleProps) => {
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ size, colour, className }))}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsToggleHovered(true)}
      onMouseLeave={() => setIsToggleHovered(false)}
      pressed={isToggled}
    >
      {iconName && (
        <Icon
          iconName={iconName}
          size={size}
          weight={isToggled || isToggleHovered ? "fill" : "regular"}
        />
      )}
      {children}
    </TogglePrimitive.Root>
  );
};
