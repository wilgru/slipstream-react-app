import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "src/common/components/Icon/Icon";
import { customisationColours } from "src/common/constants/customisationColours";
import { cn } from "src/common/utils/cn";

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

  const topicCustomisationColour = customisationColours.find(
    (colour) => colour.name === iconColour
  );

  return (
    <NavLink
      to={to}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={({ isActive }) =>
        cn(
          "flex justify-between px-2 py-1 items-center gap-2 rounded-full text-sm data-[state=on]:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
          isHovered || isActive ? "text-orange-500 bg-orange-100" : ""
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-2">
            {iconName && (
              <Icon
                iconName={iconName}
                className={
                  ((isHovered || isActive) && "text-orange-500") ||
                  topicCustomisationColour?.textClass ||
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

          {/* TODO: move to actual journal page instead */}

          {/* {expanded && (
        <div className="flex items-center gap-2">
          <Dialog.Root
            onOpenChange={(open) => {
              !open && setEditOpen(false);
              !open && setDeleteOpen(false);
            }}
          >
            <DropdownMenu.Root
              onOpenChange={(isOpen) => {
                setIsOptionsVisible(isOpen);
              }}
            >
              <DropdownMenu.Trigger asChild>
                {showOptionsButton && (
                  <Button variant="ghost" size="sm" iconName="pencil" />
                )}
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="bg-white border border-black rounded-md p-1 w-40 shadow-lighter"
                  sideOffset={2}
                  align="end"
                >
                  <Dialog.Trigger asChild>
                    <DropdownMenu.Item
                      onSelect={() => setEditOpen(true)}
                      className="leading-none text-sm p-1 data-[highlighted]:bg-orange-400 outline-none data-[highlighted]:text-white rounded-sm cursor-pointer"
                    >
                      <div>Edit</div>
                    </DropdownMenu.Item>
                  </Dialog.Trigger>

                  <Dialog.Trigger asChild>
                    <DropdownMenu.Item
                      onSelect={() => setDeleteOpen(true)}
                      className="leading-none text-sm p-1 data-[highlighted]:bg-orange-400 outline-none data-[highlighted]:text-white rounded-sm cursor-pointer"
                    >
                      <div>Delete</div>
                    </DropdownMenu.Item>
                  </Dialog.Trigger>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {editOpen && <TopicListEditModal topic={topic} />}
            {deleteOpen && <TopicListDeleteModal topic={topic} />}
          </Dialog.Root>
        </div>
      )} */}
        </>
      )}
    </NavLink>
  );
};
