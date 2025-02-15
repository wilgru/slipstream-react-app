import * as Dialog from "@radix-ui/react-dialog";
import { useState, forwardRef } from "react";
import { Button } from "src/components/Button/Button";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import QuillContentView from "src/components/QuillContentView/QuillContentView";
import { SlipHeading } from "src/components/SlipHeading/SlipHeading";
import { Toggle } from "src/components/Toggle/Toggle";
import { colours } from "src/models/colours/colours.constant";
import { useDeleteSlip } from "src/models/slips/hooks/useDeleteSlip";
import { useUpdateSlip } from "src/models/slips/hooks/useUpdateSlip";
import { isSlipContentEmpty } from "src/models/slips/utils/isSlipContentEmpty";
import { cn } from "src/utils/cn";
import type { Colour } from "src/models/colours/Colour.type";
import type { Slip } from "src/models/slips/Slip.type";

export const SlipSection = forwardRef<
  HTMLDivElement,
  { slip: Slip; colour: Colour; journalId: string }
>(function ({ slip, colour }, ref) {
  const { updateSlip } = useUpdateSlip();
  const { deleteSlip } = useDeleteSlip();
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
        colour.backgroundGlow
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
        <div className="absolute p-2 -left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-2 p-1 bg-white border border-stone-300 rounded-full drop-shadow-md">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button
                  colour={colour}
                  iconName="pencil"
                  variant="ghost"
                  size="sm"
                />
              </Dialog.Trigger>

              <Toggle
                onClick={() => {
                  updateSlip({
                    slipId: slip.id,
                    updateSlipData: {
                      ...slip,
                      isFlagged: !slip.isFlagged,
                    },
                  });
                }}
                isToggled={slip.isFlagged}
                iconName="flag"
                size="sm"
              />

              <Button
                onClick={() => {
                  deleteSlip({ slipId: slip.id });
                }}
                colour={colours.red}
                iconName="trash"
                variant="ghost"
                size="sm"
              />

              <EditSlipModal slip={slip} />
            </Dialog.Root>
          </div>
        </div>
      )}
    </div>
  );
});
