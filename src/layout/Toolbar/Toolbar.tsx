import { Button } from "src/lib/shared/components/Button/Button";
import { Search } from "src/lib/shared/components/Search/Search";

type ToolbarProps = {
  onClickNewSlipButton: () => void;
};

export const Toolbar = ({ onClickNewSlipButton }: ToolbarProps) => {
  return (
    <div className="flex flex-row justify-between w-full p-3">
      <div className="rhs flex flex-row gap-3"></div>
      <div className="rhs flex flex-row gap-3">
        <Button onClick={onClickNewSlipButton}>New Slip</Button>
        <Search />
      </div>
    </div>
  );
};
