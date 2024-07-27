import { Funnel, Gear, Plus } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "src/authentication/hooks/useLogin";
import { Button } from "src/common/components/Button/Button";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { useGetSlips } from "src/slips/hooks/useGetSlips";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { useGetTopics } from "src/topics/hooks/useGetTopics";

type ToolbarProps = {
  onClickShowSidebarToggle: () => void;
  showSidebar: boolean;
  onClickNewSlipButton: () => void;
};

export const Toolbar = ({
  onClickShowSidebarToggle,
  showSidebar,
  onClickNewSlipButton,
}: ToolbarProps) => {
  const { slips } = useGetSlips();
  const { topics } = useGetTopics();
  const { logout } = useLogin();
  const navigate = useNavigate();

  const [OptionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [selectedTopicIds, setSelectedTopicIds] = useAtom(selectedTopicIdsAtom);

  const onClickSettingsBtn = () => {
    setOptionsVisible(
      (currentShowSettingsDropdownMenu) => !currentShowSettingsDropdownMenu
    );
  };

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

  const selectedTopics = topics.filter((topic) =>
    selectedTopicIds.includes(topic.id)
  );

  return (
    <header className="flex flex-row justify-between w-full p-3">
      <div className="flex flex-row gap-3 items-center">
        <span className="flex items-center">
          <h1>{slips.length} Slips</h1>
        </span>
        <Toggle
          styleType="icon"
          onClick={onClickShowSidebarToggle}
          colour={
            selectedTopicIds.length
              ? { border: "black", background: "orange-500", text: "black" }
              : undefined
          }
          toggledOnColour="orange-500"
          icon={(isToggleHovered: boolean) => (
            <Funnel
              size={24}
              weight={isToggleHovered || showSidebar ? "fill" : "regular"}
            />
          )}
          isToggled={showSidebar}
        />
        {selectedTopics.map((selectedTopic) => (
          <TopicPill
            closable={true}
            onClick={onClickTopicPill}
            topic={selectedTopic}
          />
        ))}
      </div>
      <div className="flex flex-row gap-3">
        <DropdownMenu.Root onOpenChange={(isOpen) => setOptionsVisible(isOpen)}>
          <DropdownMenu.Trigger asChild>
            <div>
              <Button
                styleType="icon"
                icon={(isButtonHovered: boolean) => (
                  <Gear
                    size={24}
                    weight={
                      isButtonHovered || OptionsVisible ? "fill" : "regular"
                    }
                    className={OptionsVisible ? "text-orange-500" : undefined}
                  />
                )}
                onClick={onClickSettingsBtn}
              />
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white border border-black rounded-md p-1 w-40 shadow-lighter"
              sideOffset={2}
              align="end"
            >
              <DropdownMenu.Item
                className="leading-none text-sm p-1 data-[highlighted]:bg-orange-400 outline-none data-[highlighted]:text-white rounded-sm cursor-pointer"
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
          icon={() => <Plus size={16} weight="bold" />}
          colour={{ border: "black", background: "orange-500", text: "black" }}
          onClick={onClickNewSlipButton}
        >
          New Slip
        </Button>
      </div>
    </header>
  );
};
