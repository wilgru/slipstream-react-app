// import "./App.css";
import { useState } from "react";
import GalleryView from "./Views/GalleryView/GalleryView";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { useSlips } from "./hooks/useSlips";

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
    <div className="flex flex-col h-screen">
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
