import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "src/lib/components/Button/Button";
import EditSlipModal from "src/lib/components/EditSlipModal/EditSlipModal";
import { Icon } from "src/lib/components/Icon/Icon";
import { cn } from "src/lib/utils/cn";
import type { Colour } from "src/lib/colour/types/Colour";
import type { Slip } from "src/lib/slip/types/Slip.type";

export default function SlipSection({
  slip,
  colour,
  journalId,
}: {
  slip: Slip;
  colour: Colour;
  journalId: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={slip.id}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-2 rounded-md",
        `hover:${colour.backgroundClass}`
      )}
    >
      <div className="flex gap-2">
        <h1
          className={`select-none font-title text-2xl font-normal tracking-tight text-stone-700`}
        >
          {slip.title}
        </h1>

        {slip.isFlagged && (
          <Icon iconName="flag" className="text-orange-500" size="sm" />
        )}
      </div>

      <p className="text-sm">
        {slip.content.reduce((acc, op) => acc + op.insert, "")}
      </p>

      <p className={"text-xs text-stone-500"}>
        {slip.created.format("ddd D MMMM YYYY")}
      </p>

      {isHovered && (
        <div className="absolute flex flex-col gap-2 -left-7 top-2 bg-white border border-stone-300 rounded-full shadow-light">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                colour={colour}
                iconName="pencil"
                variant="ghost"
                size="sm"
              />
            </Dialog.Trigger>

            <EditSlipModal slip={slip} journalToUpdateId={journalId} />
          </Dialog.Root>
        </div>
      )}
    </div>
  );
}
