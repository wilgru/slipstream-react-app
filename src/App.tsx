// import "./App.css";
import { useState } from "react";
import GalleryView from "./Views/GalleryView/GalleryView";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { useSlips } from "./hooks/useSlips";
import { Slip } from "./types/Slip.type";
import Delta from "quill-delta";

function App() {
  const { slips, setSlips } = useSlips();
  // const [slipDraft, setSlipDraft] = useState<Slip | null>(null);
  const [initialOpenSlip, setInitialOpenSlip] = useState<Slip | null>(null);

  // TODO: maybe add the draft slip to the actual state? then we dont have to remove this one, and then add the new one and do weird handling to set to the open slip
  // TODO: have draft property (for FE SLip type only) and generate an id for the draft slip FE as well?
  const onClickNewSlipButton = () => {
    // setSlipDraft({
    //   id: "DRAFT",
    //   title: null,
    //   content: new Delta(),
    //   isPinned: false,
    // });

    const slipDraft = {
      id: "DRAFT",
      title: null,
      content: new Delta(),
      isPinned: false,
    };

    setSlips((current) => [...current, slipDraft]);
    setInitialOpenSlip(slipDraft);
  };

  // const slipsIncludingDraft = slipDraft ? slips.concat([slipDraft]) : slips;
  const slipsIncludingDraft = slips;

  return (
    <div className="flex flex-col h-screen">
      <Toolbar onClickNewSlipButton={onClickNewSlipButton} />
      <GalleryView
        slips={slipsIncludingDraft}
        // onCreateSlipFromDraft={() => setSlipDraft(null)}
        // onCreateSlipFromDraft={() => setSlipDraft(null)}
        initialOpenSlip={initialOpenSlip}
      ></GalleryView>
    </div>
  );
}

export default App;
