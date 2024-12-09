import { Flag, PushPin } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import Delta from "quill-delta";
import { useEffect, useRef, useState } from "react";
import EditSlipModal from "../EditSlipModal/EditSlipModal";
import type { Slip } from "src/slips/types/Slip.type";

type SlipCardProps = {
  slip: Slip;
  isFocused: boolean;
};

const SlipCard = ({ slip, isFocused }: SlipCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentString, setContentString] = useState<string | null>();

  useEffect(() => {
    const contentDelta = slip.content && new Delta(slip.content);

    setContentString(
      contentDelta ? contentDelta?.reduce((acc, op) => acc + op.insert, "") : ""
    );
  }, [slip]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          ref={ref}
          className={`relative w-full mb-2 cursor-pointer select-none rounded-lg bg-white shadow-light ${
            isFocused ? "border-2 border-orange-500" : "border border-black"
          }`}
        >
          <div className="absolute flex h-full w-full flex-row items-end justify-end p-2 gap-2">
            {slip.isPinned && (
              <PushPin size={24} weight="fill" className="text-red-500" />
            )}
            {slip.isFlagged && (
              <Flag size={24} weight="fill" className="text-orange-500" />
            )}
          </div>

          <div className="flex h-full flex-col p-2">
            <h1
              className={`select-none font-title text-xl font-normal tracking-tight ${
                isFocused ? "text-orange-500" : "text-black"
              }`}
            >
              {slip.title}
            </h1>

            <p
              style={{ overflowWrap: "break-word" }}
              className="select-none overflow-y-hidden text-sm font-normal text-black"
            >
              {contentString}
            </p>

            <p
              className={`text-xs ${
                isFocused ? "text-orange-500" : "text-stone-500"
              }`}
            >
              {slip.created.format("ddd D MMMM YYYY")}
            </p>
          </div>
        </div>
      </Dialog.Trigger>

      <EditSlipModal slip={slip} />
    </Dialog.Root>
  );
};

export default SlipCard;
