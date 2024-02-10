import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import GalleryView from "src/home/components/GalleryView/GalleryView";
import { Sidebar } from "src/home/components/Sidebar/Sidebar";
import { Toolbar } from "src/home/components/Toolbar/Toolbar";
import { useSlips } from "src/slips/hooks/useSlips";
import { TopicList } from "src/topics/components/TopicList/TopicList";
import { useTopics } from "src/topics/hooks/useTopics";

function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthentication();
  const { topics } = useTopics();
  const { createSlip } = useSlips();

  const [searchParams, setSearchParams] = useSearchParams();
  const [showSidebar, setShowSidebar] = useState(false);

  const sideBarSections = useMemo(
    () => [{ title: "Topics", component: <TopicList topics={topics} /> }],
    [topics]
  );

  const onClickNewSlipButton = (): void => {
    const createdSlipId = createSlip();

    searchParams.set("openSlip", createdSlipId);
    setSearchParams(searchParams);
  };

  const onClickShowSidebarToggle = (): void => {
    setShowSidebar((currentShowSidebar) => !currentShowSidebar);
  };

  useEffect(() => {
    !currentUser && navigate("/login");
  }, []);

  return (
    <div className="flex flex-row h-screen w-full bg-stone-200">
      <div className="flex flex-col w-full">
        <Toolbar
          showSidebar={showSidebar}
          onClickShowSidebarToggle={onClickShowSidebarToggle}
          onClickNewSlipButton={onClickNewSlipButton}
        />
        <div className="flex flex-row h-full max-w-full">
          {showSidebar && <Sidebar sections={sideBarSections} />}
          <GalleryView />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
