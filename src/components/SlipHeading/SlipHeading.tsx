import { PushPin, Flag } from "@phosphor-icons/react";
import { cn } from "src/utils/cn";
import type { Slip } from "src/types/Slip.type";

type SlipHeadingProps = {
  slip: Slip;
  isHovered: boolean;
};

export const SlipHeading = ({ slip, isHovered }: SlipHeadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 pb-1 border-b",
        isHovered ? "border-stone-200" : "border-stone-100"
      )}
    >
      <div className="flex gap-2 items-baseline">
        {slip.title && (
          <h1 className="font-title text-3xl font-normal tracking-tight">
            {slip.title}
          </h1>
        )}

        {slip.isPinned && (
          <PushPin weight="fill" className="w-5 h-5 text-red-400" />
        )}

        {slip.isFlagged && (
          <Flag weight="fill" className="w-5 h-5 text-orange-400" />
        )}
      </div>

      <p className={"text-xs text-stone-500"}>
        {slip.created.format("ddd D MMMM YYYY")}
      </p>
    </div>
  );
};
