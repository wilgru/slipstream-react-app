/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import { Toolbar } from "./layout/Toolbar/Toolbar";
import GalleryView from "./layout/ViewPanel/GalleryView/GalleryView";
import { LoginModal } from "./lib/authentication/components/LoginModal/LoginModal";
import { useAuthentication } from "./lib/authentication/hooks/useAuthentication";
import { useSlips } from "./lib/slips/hooks/useSlips";

function App() {
  const { currentUser } = useAuthentication();
  const { slips, createSlip, updateSlip } = useSlips();
  const [initialOpenSlipId, setInitialOpenSlipId] = useState<string | null>(
    null
  );

  const onClickNewSlipButton = (): void => {
    const createdSlipId = createSlip();
    setInitialOpenSlipId(createdSlipId);
  };

  return (
    <>
      {currentUser ? (
        <div className="flex flex-col h-screen bg-stone-100">
          <Toolbar onClickNewSlipButton={onClickNewSlipButton} />
          <GalleryView
            slips={slips}
            initialOpenSlipId={initialOpenSlipId}
            updateSlip={updateSlip}
          ></GalleryView>
        </div>
      ) : (
        <LoginModal />
      )}
    </>
  );
}

export default App;
