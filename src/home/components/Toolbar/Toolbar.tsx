import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { Button } from "src/shared/components/Button/Button";
import { Search } from "src/shared/components/Search/Search";

type ToolbarProps = {
  onClickNewSlipButton: () => void;
};

export const Toolbar = ({ onClickNewSlipButton }: ToolbarProps) => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const onClickLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-between w-full p-3">
      <div className="rhs flex flex-row gap-3"></div>
      <div className="rhs flex flex-row gap-3">
        <Button onClick={onClickLogOut}>Log Out</Button>
        <Button onClick={onClickNewSlipButton}>New Slip</Button>
        <Search />
      </div>
    </div>
  );
};
