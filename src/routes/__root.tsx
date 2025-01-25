import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Sidebar } from "./-sidebar/Sidebar.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="fixed flex h-screen w-screen">
        <Sidebar />

        {/* all the other elements */}
        <div id="detail" className="w-full">
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
