import Delta from "quill-delta";
import { useEffect, useState } from "react";
import type { Slip } from "src/lib/slips/types/Slip.type";

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
  const [contentString, setContentString] = useState<string | null>();

  useEffect(() => {
    const contentDelta = slip.content && new Delta(slip.content);

    setContentString(
      contentDelta ? contentDelta?.reduce((acc, op) => acc + op.insert, "") : ""
    );
  }, [slip]);

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
  }, [ref, onClick, onDblClick]); // including our callbacks here fixed the 'sortedSlips' state its using internally not being up to date https://www.reddit.com/r/reactjs/comments/x638og/dependency_array_of_usecallback_is_not_working/

  // const showOverlay = slip.isPinned;

  return (
    <div
      ref={(elem) => setRef(elem)}
      className={`relative flex-shrink-0 w-52 h-40 mb-1 bg-stone-100 shadow-light cursor-pointer ${
        isFocused ? " border border-orange-500" : "border border-stone-700"
      }`}
    >
      {/* {showOverlay && (
        <div className="absolute w-full h-full bg-gradient-to-t from-stone-300 to-75%"></div>
      )} */}

      <div className="flex flex-col px-2 pt-2 h-full">
        <h1 className="text-xl font-normal font-title tracking-tight text-stone-700 select-none">
          {slip.title}
        </h1>

        <p className="text-stone-500 text-xs mb-1">
          {slip.created.format("D MMMM YYYY")}
        </p>

        <p
          style={{ overflowWrap: "break-word" }}
          className="overflow-y-hidden font-normal text-xs text-stone-700 select-none"
        >
          {contentString}
        </p>
      </div>
    </div>
  );
};

export default SlipCard;
