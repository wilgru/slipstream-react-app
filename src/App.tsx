// import "./App.css";
// import PocketBase from "pocketbase";
import GalleryView from "./Views/GalleryView/GalleryView";
import { Slip } from "./types/Slip.type";

// const pb = new PocketBase("http://127.0.0.1:8090");

function App() {
  const length = 100;
  let slips: Slip[] = [];

  for (let i = 0; i < length; i++) {
    slips.push({
      id: Math.random().toString(),
      title: "Gartner Hype Cycle",
      content:
        "Is a graphical presentation developed, used and branded by the American research, advisory and information technology firm Gartner to represent the maturity, adoption, and social application of specific technologies. The hype cycle claims to provide a graphical and conceptual presentation of the maturity of emerging technologies through five phases. ",
      isPinned: false,
    });
  }

  return (
    <body>
      <GalleryView slips={slips}></GalleryView>
    </body>
  );
}

export default App;
