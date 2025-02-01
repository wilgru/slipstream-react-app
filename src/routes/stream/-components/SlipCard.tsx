import { Flag, PushPin } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import Delta from "quill-delta";
import { useEffect, useState } from "react";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import type { Slip } from "src/models/slips/Slip.type";

type SlipCardProps = {
  slip: Slip;
};

const SlipCard = ({ slip }: SlipCardProps) => {
  const [contentString, setContentString] = useState<string | null>();

  useEffect(() => {
    const contentDelta = slip.content && new Delta(slip.content); // ? redundant new Delta() call?

    setContentString(
      contentDelta ? contentDelta?.reduce((acc, op) => acc + op.insert, "") : ""
    );
  }, [slip]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="relative w-full p-3 rounded-lg bg-white shadow-light border border-stone-300">
          <div className="flex h-full rounded-md p-2 flex-col hover:bg-orange-50">
            <div className="flex gap-2">
              <h1 className="font-title text-stone-700 text-xl font-normal tracking-tight">
                {slip.title}
              </h1>

              {slip.isPinned && (
                <PushPin weight="fill" className="w-5 h-5 text-red-400" />
              )}
              {slip.isFlagged && (
                <Flag weight="fill" className="w-5 h-5 text-orange-400" />
              )}
            </div>

            <p className="pb-3 text-sm font-normal text-black">
              {contentString}
            </p>

            <p className="text-xs text-stone-500">
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
