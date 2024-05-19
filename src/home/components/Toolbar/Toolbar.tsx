import { Funnel, Gear, Plus } from "@phosphor-icons/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "src/authentication/hooks/useLogin";
import { Button } from "src/common/components/Button/Button";
import { DropdownMenu } from "src/common/components/DropdownMenu/DropdownMenu";
import { Toggle } from "src/common/components/Toggle/Toggle";
import { useGetSlips } from "src/slips/hooks/useGetSlips";
import { selectedTopicIdsAtom } from "src/topics/atoms/selectedTopicIdsAtom";
import type { DropdownMenuOption } from "src/common/components/DropdownMenu/DropdownMenu";

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
  const { logout } = useLogin();
  const navigate = useNavigate();

  const [showSettingsDropdownMenu, setShowSettingsDropdownMenu] =
    useState(false);
  const selectedTopicIds = useAtomValue(selectedTopicIdsAtom);

  const settingsDropdownOptions: DropdownMenuOption[] = [
    {
      name: "Log out",
      action: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  const onClickSettingsBtn = () => {
    setShowSettingsDropdownMenu(
      (currentShowSettingsDropdownMenu) => !currentShowSettingsDropdownMenu
    );
  };

  return (
    <div className="flex flex-row justify-between w-full p-3">
      <div className="flex flex-row gap-3">
        <h1>{slips.length} Slips</h1>
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
      </div>
      <div className="flex flex-row gap-3">
        <DropdownMenu
          options={settingsDropdownOptions}
          visible={showSettingsDropdownMenu}
          setVisible={setShowSettingsDropdownMenu}
        >
          <Button
            styleType="icon"
            icon={() => <Gear size={24} />}
            onClick={onClickSettingsBtn}
          />
        </DropdownMenu>
        <Button
          icon={() => <Plus size={16} weight="bold" />}
          colour={{ border: "black", background: "orange-500", text: "black" }}
          onClick={onClickNewSlipButton}
        >
          New Slip
        </Button>
      </div>
    </div>
  );
};
