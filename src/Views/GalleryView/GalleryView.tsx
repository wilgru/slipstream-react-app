import { useState } from "react";
import SlipCard from "../../components/SlipCard/SlipCard";
import { Slip } from "../../types/Slip.type";
import SlipPreview from "../../components/SlipPreview/SlipPreview";

type GalleryViewProps = {
  slips: Slip[];
};

const GalleryView = ({ slips }: GalleryViewProps) => {
  const [previewSlip, setPreviewSlip] = useState<Slip | null>(null);

  const onPreviewSlip = (selectedSlipId: string) => {
    setPreviewSlip(slips.find((slip) => slip.id === selectedSlipId) ?? null);
  };

  const slipPreviewOpen = !!previewSlip;

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <div
        className={`flex ${
          slipPreviewOpen ? "overflow-x-auto overflow-y-hidden" : "flex-wrap"
        } gap-3`}
      >
        {slips.map((slip) => (
          <SlipCard
            slip={slip}
            active={previewSlip ? slip.id === previewSlip.id : false}
            onPreviewSlip={onPreviewSlip}
          />
        ))}
      </div>
      {slipPreviewOpen && <SlipPreview slip={previewSlip} />}
    </div>
  );
};

export default GalleryView;
