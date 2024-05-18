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
    <div>
      <div
        ref={ref}
        className={`relative h-40 w-60 mb-2 cursor-pointer select-none rounded-lg bg-white shadow-light ${
          isFocused ? "border-2 border-orange-500" : "border border-black"
        }`}
      >
        <div className="absolute flex h-full w-full flex-row items-end justify-end pb-1 pr-0.5">
          {slip.isPinned && <Icon iconName={"pin"} colour="red-500" />}
          {slip.isFlagged && <Icon iconName={"flag"} colour="orange-500" />}
        </div>

        <div className="flex h-full flex-col px-2 pt-2">
          <h1
            className={`select-none font-title text-xl font-normal tracking-tight ${
              isFocused ? "text-orange-500" : "text-stone-700"
            }`}
          >
            {slip.title}
          </h1>

          <p
            style={{ overflowWrap: "break-word" }}
            className="select-none overflow-y-hidden text-xs font-normal text-stone-700"
          >
            {contentString}
          </p>
        </div>
      </div>

      <p
        className={`ml-1 text-xs ${
          isFocused ? "text-orange-500" : "text-stone-500"
        }`}
      >
        {slip.created.format("ddd D MMMM YYYY")}
      </p>
    </div>
  );
};

export default SlipCard;
