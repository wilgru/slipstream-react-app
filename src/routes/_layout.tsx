import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/Sidebar.tsx";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="fixed flex justify-between h-screen w-screen p-4">
      <Sidebar />
      <Outlet />
    </div>
  );
}
