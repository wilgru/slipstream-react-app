import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Icon } from "src/components/Icon/Icon";
import { colours } from "src/constants/colours.constant";
import { cn } from "src/utils/cn";
import type { Colour } from "src/types/Colour.type";

type NavItemProps = {
  iconName?: string;
  colour?: Colour;
  ghost?: boolean;
  title: string;
  preview?: string | number;
  to: string;
  expanded: boolean;
};

export const NavItem = ({
  iconName,
  colour = colours.orange,
  ghost = false,
  title,
  preview,
  to,
  expanded,
}: NavItemProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Link
      to={to}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      activeProps={{
        className: cn(colour.textPill, colour.backgroundPill),
      }}
      className={cn(
        "flex items-center gap-2 rounded-full text-sm transition-colors",
        expanded ? "px-2 py-1" : "p-2",
        expanded ? "justify-between" : "justify-center",
        isHovered && colour.textPill,
        isHovered && colour.backgroundPill
      )}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div className="flex items-center gap-2">
            {iconName && (
              <Icon
                iconName={iconName}
                className={
                  isHovered || isActive || (colour && !ghost)
                    ? colour.textPill
                    : "text-stone-500"
                }
                weight={isHovered || isActive ? "fill" : "regular"}
              />
            )}

            {expanded ? title : ""}
          </div>

          {expanded && (
            <p
              className={cn(
                "text-xs font-medium w-2 mr-1 text-center",
                isHovered || isActive ? colour.textPill : "text-stone-400"
              )}
            >
              {preview}
            </p>
          )}
        </>
      )}
    </Link>
  );
};
