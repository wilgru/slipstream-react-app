import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "src/authentication/hooks/useLogin";
import { Button } from "src/common/components/Button/Button";
import { DropdownMenu } from "src/common/components/DropdownMenu/DropdownMenu";
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
  const { logout } = useLogin();
  const navigate = useNavigate();

  const [showSettingsDropdownMenu, setShowSettingsDropdownMenu] =
    useState(false);

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
    <div className="flex flex-row justify-between w-full p-3 bg-white border border-b-stone-700">
      <div className="flex flex-row gap-3">
        <DropdownMenu
          options={settingsDropdownOptions}
          visible={showSettingsDropdownMenu}
          setVisible={setShowSettingsDropdownMenu}
        >
          <Button onClick={onClickSettingsBtn}>Settings</Button>
        </DropdownMenu>

        <Button onClick={onClickShowSidebarToggle}>
          {showSidebar ? "Hide sidebar" : "Show sidebar"}
        </Button>
      </div>
      <div className="flex flex-row gap-3">
        <Button onClick={onClickNewSlipButton}>New Slip</Button>
      </div>
    </div>
  );
};
