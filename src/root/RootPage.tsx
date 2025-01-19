import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";

export default function RootPage() {
  return (
    <div className="fixed flex h-screen w-screen">
      <Sidebar />

      {/* all the other elements */}
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
