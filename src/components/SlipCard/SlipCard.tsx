import { useEffect, useState } from "react";
import { Slip } from "../../types/Slip.type";

type SlipPreviewProps = {
  slip: Slip;
  active: boolean;
  onPreviewSlip: (slipId: string) => void;
};

const SlipCard = ({ slip, active, onPreviewSlip }: SlipPreviewProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const cb = () => {
      onPreviewSlip(slip.id);
    };

    ref?.addEventListener("dblclick", cb);

    return () => {
      ref?.removeEventListener("dblclick", cb);
    };
  }, [ref]);

  const showOverlay = slip.isPinned;

  return (
    <div
      ref={(elem) => setRef(elem)}
      // style={{ clipPath: "border-box" }}
      className={`relative flex-grow flex-shrink-0 w-52 h-40 bg-white border border-gray-200 rounded-md shadow ${
        active ? " border-cyan-500" : ""
      }`}
    >
      {showOverlay && (
        <div className="absolute w-full h-40 bg-gradient-to-t from-gray-100 to-75%"></div>
      )}

      <div className="p-2 h-full flex flex-col">
        <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          {slip.title}
        </h1>
        <p className="overflow-y-hidden font-normal text-xs text-gray-600 dark:text-gray-400">
          {slip.content}
        </p>
      </div>
    </div>
  );
};

export default SlipCard;
