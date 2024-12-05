import { Book } from "@phosphor-icons/react";
import * as Toggle from "@radix-ui/react-toggle";
import { useEffect, useState } from "react";
import { customisationColours } from "src/common/constants/customisationColours";
import { cn } from "src/common/utils/cn";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListItemProps = {
  topic: Topic;
  expanded: boolean;
  onClick: (topicId: string) => void;
  isSelected: boolean;
};

export const TopicListItem = ({
  topic,
  expanded,
  onClick,
  isSelected,
}: TopicsListItemProps) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    setIsHovered(false);
  }, [editOpen, deleteOpen]);

  const topicCustomisationColour = customisationColours.find(
    (colour) => colour.name === topic.colour
  );

  const topicButtonColour = topicCustomisationColour
    ? `text-${topicCustomisationColour?.primary}`
    : "text-stone-300";

  // const showOptionsButton =
  //   (isHovered || isOptionsVisible) && !editOpen && !deleteOpen;

  return (
    <Toggle.Root
      className={cn(
        "flex justify-between px-2 py-1 items-center gap-2 rounded-full text-sm data-[state=on]:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500",
        isHovered || isSelected ? "text-orange-500 bg-orange-100" : ""
      )}
      onClick={() => onClick(topic.id)}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2">
        <Book
          size={24}
          className={cn(
            topicButtonColour,
            isSelected ? "text-orange-500" : "",
            isHovered && "text-orange-500"
          )}
          weight="fill"
        />

        {expanded ? topic.name : ""}
      </div>

      {expanded && (
        <p className="text-xs text-stone-500 w-2 text-center">
          {topic.slipCount}
        </p>
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
    </Toggle.Root>
  );
};
