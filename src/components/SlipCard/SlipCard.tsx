import { useEffect, useState } from "react";
import { Slip } from "../../types/Slip.type";

type SlipPreviewProps = {
  slip: Slip;
  isFocused: boolean;
  onClick: (slipId: string) => void;
  onDblClick: (slipId: string) => void;
};

const SlipCard = ({
  slip,
  isFocused,
  onClick,
  onDblClick,
}: SlipPreviewProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickCb = () => {
      onClick(slip.id);
    };
    const dblclickCb = () => {
      onDblClick(slip.id);
    };

    ref?.addEventListener("click", clickCb);
    ref?.addEventListener("dblclick", dblclickCb);

    return () => {
      ref?.removeEventListener("click", clickCb);
      ref?.removeEventListener("dblclick", dblclickCb);
    };
  }, [ref]);

  const showOverlay = slip.isPinned;

  return (
    <div
      ref={(elem) => setRef(elem)}
      style={{ clipPath: "border-box" }}
      className={`relative flex-shrink-0 w-52 h-40 bg-white rounded-md shadow cursor-pointer ${
        isFocused ? " border border-orange-500" : "border border-gray-200"
      }`}
    >
      {showOverlay && (
        <div className="absolute w-full h-40 bg-gradient-to-t from-gray-100 to-75%"></div>
      )}

      <div className="px-2 pt-2 h-full flex flex-col">
        <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 select-none">
          {slip.title}
        </h1>
        <p
          style={{ overflowWrap: "break-word" }}
          className="overflow-y-hidden font-normal text-xs text-gray-600 dark:text-gray-400 select-none"
        >
          {slip.content}
        </p>
      </div>
    </div>
  );
};

export default SlipCard;
