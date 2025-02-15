import * as Dialog from "@radix-ui/react-dialog";
import EditSlipModal from "src/components/EditSlipModal/EditSlipModal";
import QuillContentView from "src/components/QuillContentView/QuillContentView";
import { SlipHeading } from "src/components/SlipHeading/SlipHeading";
import { isSlipContentEmpty } from "src/models/slips/utils/isSlipContentEmpty";
import type { Slip } from "src/models/slips/Slip.type";

type SlipCardProps = {
  slip: Slip;
};

const SlipCard = ({ slip }: SlipCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="relative w-full p-3 rounded-lg bg-white drop-shadow-md border border-stone-300">
          <div className="flex flex-col gap-1 h-full rounded-md p-2 hover:bg-orange-50">
            <SlipHeading
              title={slip.title}
              isPinned={slip.isPinned}
              isFlagged={slip.isFlagged}
            />

            {!isSlipContentEmpty(slip.content) && (
              <p className="text-sm font-normal">
                <QuillContentView content={slip.content} />
              </p>
            )}
          </div>
        </div>
      </Dialog.Trigger>

      <EditSlipModal slip={slip} />
    </Dialog.Root>
  );
};

export default SlipCard;
