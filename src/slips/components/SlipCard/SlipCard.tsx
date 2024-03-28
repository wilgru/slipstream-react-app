import Delta from "quill-delta";
import { useEffect, useRef, useState } from "react";
import { Icon } from "src/common/components/Icon/Icon";
import type { Slip } from "src/slips/types/Slip.type";

type SlipCardProps = {
  slip: Slip;
  isFocused: boolean;
  onClick: (slipId: string) => void;
  onDblClick: (slipId: string) => void;
};

const SlipCard = ({ slip, isFocused, onClick, onDblClick }: SlipCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentString, setContentString] = useState<string | null>();

  useEffect(() => {
    const contentDelta = slip.content && new Delta(slip.content);

    setContentString(
      contentDelta ? contentDelta?.reduce((acc, op) => acc + op.insert, "") : ""
    );
  }, [slip]);

  // useEffect(() => {
  //   if (isFocused) {
  //     ref.current?.focus({ preventScroll: false });
  //   }
  // }, [isFocused]);

  useEffect(() => {
    const clickCb = () => {
      onClick(slip.id);
    };
    const dblclickCb = () => {
      onDblClick(slip.id);
    };

    ref.current?.addEventListener("click", clickCb);
    ref.current?.addEventListener("dblclick", dblclickCb);

    return () => {
      ref.current?.removeEventListener("click", clickCb);
      ref.current?.removeEventListener("dblclick", dblclickCb);
    };
  }, [ref, onClick, onDblClick, slip.id]); // including our callbacks here fixed the 'sortedSlips' state its using internally not being up to date https://www.reddit.com/r/reactjs/comments/x638og/dependency_array_of_usecallback_is_not_working/

  return (
    <div
      ref={ref}
      className={`relative flex-shrink-0 w-52 h-40 mb-1 bg-white shadow-light cursor-pointer select-none rounded-lg ${
        isFocused ? "border-2 border-orange-500" : "border border-black"
      }`}
    >
      <div className="absolute flex flex-row justify-end items-end pb-1 pr-0.5 w-full h-full">
        {slip.isPinned && <Icon iconName={"pin"} colour="red-500" />}
        {slip.isFlagged && <Icon iconName={"flag"} colour="orange-500" />}
      </div>

      <div className="flex flex-col px-2 pt-2 h-full">
        <h1
          className={`text-xl font-normal font-title tracking-tight select-none ${
            isFocused ? "text-orange-500" : "text-stone-700"
          }`}
        >
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
