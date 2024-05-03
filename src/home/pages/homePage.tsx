import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "src/authentication/hooks/useUser";
import GalleryView from "src/home/components/GalleryView/GalleryView";
import { Sidebar } from "src/home/components/Sidebar/Sidebar";
import { Toolbar } from "src/home/components/Toolbar/Toolbar";
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
    !currentUser && navigate("/login");
  }, []);

  return (
    <div className="fixed h-screen w-screen">
      <div className="flex flex-col h-full">
        <Toolbar
          showSidebar={showSidebar}
          onClickShowSidebarToggle={onClickShowSidebarToggle}
          onClickNewSlipButton={onClickNewSlipButton}
        />
        <div className="flex flex-row h-full min-h-0">
          {showSidebar && <Sidebar sections={sideBarSections} />}
          <GalleryView />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
