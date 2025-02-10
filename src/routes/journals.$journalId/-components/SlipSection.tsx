import * as Dialog from "@radix-ui/react-dialog";
import { useState, forwardRef } from "react";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import QuillContentView from "src/components/QuillContentView/QuillContentView";
import { SlipHeading } from "src/components/SlipHeading/SlipHeading";
import { isSlipContentEmpty } from "src/models/slips/utils/isSlipContentEmpty";
import { cn } from "src/utils/cn";
import type { Colour } from "src/models/colours/Colour.type";
import type { Slip } from "src/models/slips/Slip.type";

export const SlipSection = forwardRef<
  HTMLDivElement,
  { slip: Slip; colour: Colour; journalId: string }
>(function ({ slip, colour, journalId }, ref) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      id={slip.id}
      key={slip.id}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex flex-col gap-1 relative p-2 rounded-md",
        `hover:${colour.backgroundGlow}`
      )}
    >
      <SlipHeading
        title={slip.title}
        isPinned={slip.isPinned}
        isFlagged={slip.isFlagged}
      />

      {!isSlipContentEmpty(slip.content) && (
        <QuillContentView content={slip.content} />
      )}

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
});
