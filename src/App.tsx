// import "./App.css";
import GalleryView from "./Views/GalleryView/GalleryView";
import { useSlips } from "./hooks/useSlips";

function App() {
  const { slips } = useSlips();

  return (
    <body>
      <GalleryView slips={slips}></GalleryView>
    </body>
  );
}

export default App;
