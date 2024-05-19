import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "src/authentication/hooks/useUser";
import { Sidebar } from "src/home/components/Sidebar/Sidebar";
import { Toolbar } from "src/home/components/Toolbar/Toolbar";
import { SlipGallery } from "src/slips/components/SlipGallery/SlipGallery";
import { useCreateSlip } from "src/slips/hooks/useCreateSlip";
import { TopicList } from "src/topics/components/TopicList/TopicList";
import { useGetTopics } from "src/topics/hooks/useGetTopics";

function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { topics } = useGetTopics();
  const { createSlip } = useCreateSlip();

  const [searchParams, setSearchParams] = useSearchParams();
  const [showSidebar, setShowSidebar] = useState(false);

  const sideBarSections = useMemo(
    () => [{ title: "Topics", component: <TopicList topics={topics} /> }],
    [topics]
  );

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
    // !currentUser && navigate("/login");
  }, []);

  return (
    <div className="fixed flex h-screen w-screen">
      {showSidebar && <Sidebar sections={sideBarSections} />}
      <div className="flex flex-col w-full min-w-0">
        <Toolbar
          showSidebar={showSidebar}
          onClickShowSidebarToggle={onClickShowSidebarToggle}
          onClickNewSlipButton={onClickNewSlipButton}
        />
        <SlipGallery />
      </div>
    </div>
  );
}

export default HomePage;
