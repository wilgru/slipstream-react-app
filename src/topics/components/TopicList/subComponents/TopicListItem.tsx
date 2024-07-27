import { Pencil } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Button } from "src/common/components/Button/Button";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { TopicListDeleteModal } from "./TopicListDeleteModal";
import { TopicListEditModal } from "./TopicListEditModal";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListItemProps = {
  topic: Topic;
};

export const TopicListItem = ({ topic }: TopicsListItemProps) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedTopicIds, setSelectedTopicIds] = useAtom(selectedTopicIdsAtom);
  const [isOptionsButtonHovered, setIsOptionsButtonHovered] =
    useState<boolean>(false);

  const onClickTopicPill = (topicId: string) => {
    setSelectedTopicIds((currentSelectedTopicIds) => {
      if (currentSelectedTopicIds.includes(topicId)) {
        return currentSelectedTopicIds.filter(
          (selectedTopicId) => selectedTopicId !== topicId
        );
      } else {
        return [...currentSelectedTopicIds, topicId];
      }
    });
  };

  useEffect(() => {
    setIsOptionsButtonHovered(false);
  }, [editOpen, deleteOpen]);

  const showOptionsButton =
    (isOptionsButtonHovered || isOptionsVisible) && !editOpen && !deleteOpen;

  return (
    <div
      className="flex justify-between items-center"
      onMouseOver={() => setIsOptionsButtonHovered(true)}
      onMouseLeave={() => setIsOptionsButtonHovered(false)}
    >
      <TopicPill
        topic={topic}
        onClick={onClickTopicPill}
        isSelected={selectedTopicIds.includes(topic.id)}
      />

      <div className="flex gap-2">
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
                <div>
                  <Button
                    styleType="icon"
                    icon={() => (
                      <Pencil
                        size={16}
                        weight="bold"
                        className={
                          isOptionsVisible ? "text-orange-500" : undefined
                        }
                      />
                    )}
                  />
                </div>
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

        <p className="text-xs text-stone-500 w-2 text-center">
          {topic.slipCount}
        </p>
      </div>
    </div>
  );
};
