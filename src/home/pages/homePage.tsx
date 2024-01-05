import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { Button } from "src/common/components/Button/Button";
import GalleryView from "src/home/components/GalleryView/GalleryView";
import { Sidebar } from "src/home/components/Sidebar/Sidebar";
import { Toolbar } from "src/home/components/Toolbar/Toolbar";
import { useSlips } from "src/slips/hooks/useSlips";
import { TopicPill } from "src/topics/components/TopicPill/TopicPill";
import { useTopics } from "src/topics/hooks/useTopics";
import type { Topic } from "src/topics/types/Topic.type";

type TopicsListProps = {
  topics: Topic[];
};

type TopicsListItemProps = {
  topic: Topic;
};

const TopicsListItem = ({ topic }: TopicsListItemProps) => {
  const [closeBtnVisible, setCloseBtnVisible] = useState<boolean>(false);

  return (
    <div
      className="flex justify-between items-center"
      onMouseOver={() => setCloseBtnVisible(true)}
      onMouseLeave={() => setCloseBtnVisible(false)}
    >
      <TopicPill name={topic.name} />

      {closeBtnVisible ? (
        <Button styleType="icon" icon="close" iconSize="small" />
      ) : (
        <p className="text-xs text-stone-500 w-2 text-center">
          {topic.slipCount}
        </p>
      )}
    </div>
  );
};

const TopicsList = ({ topics }: TopicsListProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      {topics.map((topic) => (
        <TopicsListItem topic={topic}></TopicsListItem>
      ))}
    </div>
  );
};

function HomePage() {
  const { currentUser } = useAuthentication();
  const navigate = useNavigate();
  const { slips, createSlip, deleteSlip, updateSlip, deleteEmptySlips } =
    useSlips();
  const { topics, createTopic } = useTopics();

  const [showSidebar, setShowSidebar] = useState(false);
  const [initialOpenSlipId, setInitialOpenSlipId] = useState<string | null>(
    null
  );
  const sideBarSections = useMemo(
    () => [{ title: "Topics", component: <TopicsList topics={topics} /> }],
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
      <div className="flex flex-col min-w-0">
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
          topics={topics}
          createTopic={createTopic}
        ></GalleryView>
      </div>
    </div>
  );
}

export default HomePage;
