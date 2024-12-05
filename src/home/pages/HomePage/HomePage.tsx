import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "src/authentication/hooks/useUser";
import { Sidebar } from "src/home/components/Sidebar/Sidebar";
import { SlipGallery } from "src/slips/components/SlipGallery/SlipGallery";
import { useCreateSlip } from "src/slips/hooks/useCreateSlip";
import { useGetTopics } from "src/topics/hooks/useGetTopics";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { topics } = useGetTopics();
  const { createSlip } = useCreateSlip();

  const [searchParams, setSearchParams] = useSearchParams();
  const [showSidebar, setShowSidebar] = useState(false);

  const onClickNewSlipButton = async (): Promise<void> => {
    const createdSlip = await createSlip();

    if (createdSlip) {
      searchParams.set("openSlip", createdSlip.id);
      setSearchParams(searchParams);
    }
  };

  const onClickShowSidebarToggle = (): void => {
    setShowSidebar((currentShowSidebar) => !currentShowSidebar);
  };

  useEffect(() => {
    !user && navigate("/login");
  }, [user, navigate]);

  return (
    <div className="fixed flex h-screen w-screen">
      <Sidebar
        topics={topics}
        onClickNewSlipButton={onClickNewSlipButton}
        expanded={!showSidebar}
        onToggleSidebar={onClickShowSidebarToggle}
      />
      <div className="flex flex-col w-full min-w-0">
        <SlipGallery />
      </div>
    </div>
  );
}

export default HomePage;
