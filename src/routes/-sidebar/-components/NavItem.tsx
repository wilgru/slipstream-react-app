import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { customisationColours } from "src/lib/colour/constants/customisationColours";
import { Icon } from "src/lib/components/Icon/Icon";
import { cn } from "src/lib/utils/cn";

type NavItemProps = {
  iconName?: string;
  iconColour?: string;
  title: string;
  preview?: string | number;
  to: string;
  expanded: boolean;
};

export const NavItem = ({
  iconName,
  iconColour,
  title,
  preview,
  to,
  expanded,
}: NavItemProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const journalCustomisationColour = customisationColours.find(
    (colour) => colour.name === iconColour
  );

  return (
    <Link
      to={to}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      activeProps={{ className: "text-orange-500 bg-orange-100" }}
      className={cn(
        "flex justify-between px-2 py-1 items-center gap-2 rounded-full text-sm data-[state=on]:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
        isHovered && "text-orange-500 bg-orange-100"
      )}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div className="flex items-center gap-2">
            {iconName && (
              <Icon
                iconName={iconName}
                className={
                  ((isHovered || isActive) && "text-orange-500") ||
                  journalCustomisationColour?.textClass ||
                  "text-stone-500"
                }
                weight={isHovered || isActive ? "fill" : "regular"}
              />
            )}

            {expanded ? title : ""}
          </div>

          {expanded && (
            <p className="text-xs text-stone-500 w-2 text-center">{preview}</p>
          )}
        </>
      )}
    </Link>
  );
};
