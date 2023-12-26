import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { Button } from "src/common/components/Button/Button";
import { Search } from "src/common/components/Search/Search";

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

  const onClickLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-between w-full p-3">
      <div className="flex flex-row gap-3">
        <Button onClick={onClickShowSidebarToggle}>
          {showSidebar ? "Hide sidebar" : "Show sidebar"}
        </Button>
      </div>
      <div className="flex flex-row gap-3">
        <Button styleType="link" onClick={onClickLogOut}>
          Log Out
        </Button>
        <Button onClick={onClickNewSlipButton}>New Slip</Button>
        <Search />
      </div>
    </div>
  );
};
