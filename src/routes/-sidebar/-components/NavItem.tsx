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
      activeProps={{
        className: cn(
          journalCustomisationColour?.textClass,
          journalCustomisationColour?.backgroundClass
        ),
      }}
      className={cn(
        "flex px-2 py-1 items-center gap-2 rounded-full text-sm",
        expanded ? "justify-between" : "justify-center",
        isHovered && journalCustomisationColour?.textClass,
        isHovered && journalCustomisationColour?.backgroundClass
      )}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div className="flex items-center gap-2">
            {iconName && (
              <Icon
                iconName={iconName}
                className={
                  ((isHovered || isActive) &&
                    journalCustomisationColour?.textClass) ||
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
