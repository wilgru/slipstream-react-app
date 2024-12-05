import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useLogin } from "src/authentication/hooks/useLogin";
import { Button } from "src/common/components/Button/Button";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import { TopicListItem } from "src/topics/components/TopicList/SidebarNavItem";
import type { Topic } from "src/topics/types/Topic.type";

type SidebarProps = {
  topics: Topic[];
  onClickNewSlipButton: () => void;
  expanded: boolean;
  onToggleSidebar: () => void;
};

export const Sidebar = ({
  topics,
  onClickNewSlipButton,
  expanded,
  onToggleSidebar,
}: SidebarProps) => {
  const { logout } = useLogin();
  const navigate = useNavigate();

  const [selectedTopicIds, setSelectedTopicIds] = useAtom(selectedTopicIdsAtom);

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

  return (
    <aside
      className={`${
        expanded ? "w-52" : "w-16"
      } p-2 flex flex-col justify-between flex-shrink-0 overflow-y-scroll`}
    >
      <section className="p-2 flex flex-col gap-1 text-black">
        {expanded && <h1 className="font-title text-lg">Journals</h1>}
        {topics.map((topic) => (
          <TopicListItem
            topic={topic}
            expanded={expanded}
            onClick={onClickTopicPill}
            isSelected={selectedTopicIds.includes(topic.id)}
          ></TopicListItem>
        ))}
      </section>

      <div
        className={`${
          expanded ? "flex-row" : "flex-col"
        } flex gap-3 justify-around items-center`}
      >
        <Toggle
          onClick={onToggleSidebar}
          isToggled={expanded}
          iconName="sidebarSimple"
        />

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div>
              <Button variant="ghost" iconName="gear" />
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white border border-black rounded-md p-1 w-40 shadow-lighter"
              sideOffset={2}
              align="start"
            >
              <DropdownMenu.Item
                className="leading-none text-sm p-1 data-[highlighted]:bg-orange-100 data-[highlighted]:text-orange-500 outline-none rounded-sm cursor-pointer"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Button
          variant="ghost"
          iconName="plus"
          colour={"orange-500"}
          onClick={onClickNewSlipButton}
        ></Button>
      </div>
    </aside>
  );
};
