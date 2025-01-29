import { createFileRoute, redirect } from "@tanstack/react-router";
import isAuthenticated from "src/lib/users/utils/isAuthenticated";

export const Route = createFileRoute("/flagged/")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/flagged/"!</div>;
}
