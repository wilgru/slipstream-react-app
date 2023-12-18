/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./lib/authentication/hooks/useAuthentication";
import GalleryView from "./lib/home/components/GalleryView/GalleryView";
import { Toolbar } from "./lib/home/components/Toolbar/Toolbar";
import { useSlips } from "./lib/slips/hooks/useSlips";

function App() {
  const { currentUser } = useAuthentication();
  const navigate = useNavigate();
  const { slips, createSlip, updateSlip } = useSlips();
  const [initialOpenSlipId, setInitialOpenSlipId] = useState<string | null>(
    null
  );

  const onClickNewSlipButton = (): void => {
    const createdSlipId = createSlip();
    setInitialOpenSlipId(createdSlipId);
  };

  useEffect(() => {
    !currentUser && navigate("/login");
  }, []);

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
