import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { slips, createSlip, deleteSlip, updateSlip, deleteEmptySlips } =
    useSlips();
  const { topics } = useTopics();

  const [showSidebar, setShowSidebar] = useState(false);
  const [initialOpenSlipId, setInitialOpenSlipId] = useState<string | null>(
    null
  );
  const sideBarSections = useMemo(
    () => [{ title: "Topics", component: <TopicList topics={topics} /> }],
    [topics]
  );

  const onClickNewSlipButton = (): void => {
    const createdSlipId = createSlip();
    setInitialOpenSlipId(createdSlipId);
  };

  const onClickShowSidebarToggle = (): void => {
    setShowSidebar((currentShowSidebar) => !currentShowSidebar);
  };

  useEffect(() => {
    !currentUser && navigate("/login");
  }, []);

  return (
    <div className="flex flex-row h-screen bg-stone-100">
      {showSidebar && <Sidebar sections={sideBarSections} />}
      <div className="flex flex-col w-full">
        <Toolbar
          showSidebar={showSidebar}
          onClickShowSidebarToggle={onClickShowSidebarToggle}
          onClickNewSlipButton={onClickNewSlipButton}
        />
        <GalleryView
          slips={slips}
          initialOpenSlipId={initialOpenSlipId}
          updateSlip={updateSlip}
          deleteSlip={deleteSlip}
          deleteEmptySlips={deleteEmptySlips}
        ></GalleryView>
      </div>
    </div>
  );
}

export default HomePage;
