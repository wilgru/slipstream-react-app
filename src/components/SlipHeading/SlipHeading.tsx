import { PushPin, Flag } from "@phosphor-icons/react";

type SlipHeadingProps = {
  title: string | null;
  isFlagged: boolean;
  isPinned: boolean;
};

export const SlipHeading = ({
  title,
  isFlagged,
  isPinned,
}: SlipHeadingProps) => {
  if (!title && !isPinned && !isFlagged) {
    return <></>;
  }

  return (
    <div className="flex gap-2 items-center">
      {title && (
        <h1 className="font-title text-2xl font-normal tracking-tight">
          {title}
        </h1>
      )}

      {isPinned && <PushPin weight="fill" className="w-5 h-5 text-red-400" />}

      {isFlagged && <Flag weight="fill" className="w-5 h-5 text-orange-400" />}
    </div>
  );
};
