import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import GalleryView from "src/home/components/GalleryView/GalleryView";
import { Toolbar } from "src/home/components/Toolbar/Toolbar";
import { useSlips } from "src/slips/hooks/useSlips";

function HomePage() {
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

export default HomePage;
