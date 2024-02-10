import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { Button } from "src/common/components/Button/Button";
import { DropdownMenu } from "src/common/components/DropdownMenu/DropdownMenu";
import { Search } from "src/common/components/Search/Search";
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
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const [showSettingDropdownMenu, setShowSettingDropdownMenu] = useState(false);

  const settingsDropdownOptions: DropdownMenuOption[] = [
    {
      name: "Log out",
      value: "Log out",
      id: "hello",
    },
  ];

  const onClickSettingsBtn = () => {
    setShowSettingDropdownMenu(
      (currentShowSettingDropdownMenu) => !currentShowSettingDropdownMenu
    );
  };

  const onSelectSettingsOption = (selectedOption: DropdownMenuOption) => {
    console.log(selectedOption);

    switch (selectedOption.value) {
      case "Log out":
        logout();
        navigate("/login");
        break;
    }
  };

  return (
    <div className="flex flex-row justify-between w-full p-3 bg-stone-100 border border-b-stone-700">
      <div className="flex flex-row gap-3">
        <DropdownMenu
          options={settingsDropdownOptions}
          visible={showSettingDropdownMenu}
          onSelectOption={onSelectSettingsOption}
        >
          <Button onClick={onClickSettingsBtn}>Settings</Button>
        </DropdownMenu>

        <Button onClick={onClickShowSidebarToggle}>
          {showSidebar ? "Hide sidebar" : "Show sidebar"}
        </Button>
      </div>
      <div className="flex flex-row gap-3">
        <Button onClick={onClickNewSlipButton}>New Slip</Button>
        <Search />
      </div>
    </div>
  );
};
