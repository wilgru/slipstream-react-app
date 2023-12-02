/// <reference types="vite-plugin-svgr/client" />
// import "./App.css";
import { useState } from "react";
import { Toolbar } from "./layout/Toolbar/Toolbar";
import GalleryView from "./layout/ViewPanel/GalleryView/GalleryView";
import { useSlips } from "./lib/slips/hooks/useSlips";

function App() {
  const { slips, createSlip, updateSlip } = useSlips();
  const [initialOpenSlipId, setInitialOpenSlipId] = useState<string | null>(
    null
  );

  const onClickNewSlipButton = (): void => {
    const createdSlipId = createSlip();
    setInitialOpenSlipId(createdSlipId);
  };

  return (
    <div className="flex flex-col h-screen bg-stone-100">
      <Toolbar onClickNewSlipButton={onClickNewSlipButton} />
      <GalleryView
        slips={slips}
        initialOpenSlipId={initialOpenSlipId}
        updateSlip={updateSlip}
      ></GalleryView>
    </div>
  );
}

export default App;
