import { Button } from "../../lib/shared/components/Button/Button";
import { Search } from "../../lib/shared/components/Search/Search";

type ToolbarProps = {
  onClickNewSlipButton: () => void;
};

export const Toolbar = ({ onClickNewSlipButton }: ToolbarProps) => {
  return (
    <div className="flex flex-row justify-between w-full p-3">
      <div className="rhs flex flex-row gap-3"></div>
      <div className="rhs flex flex-row gap-3">
        <Button text="+ New Slip" onClick={onClickNewSlipButton} />
        <Search />
      </div>
    </div>
  );
};
