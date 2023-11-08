// import "./App.css";
import GalleryView from "./Views/GalleryView/GalleryView";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { useSlips } from "./hooks/useSlips";

function App() {
  const { slips } = useSlips();

  return (
    <div className="flex flex-col h-screen">
      <Toolbar onClickNewSlipButton={() => {}} />
      <GalleryView slips={slips}></GalleryView>
    </div>
  );
}

export default App;
