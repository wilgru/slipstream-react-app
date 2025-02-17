import { createFileRoute, redirect } from "@tanstack/react-router";
import isAuthenticated from "src/utils/users/isAuthenticated";

export const Route = createFileRoute("/tags/$tagId/")({
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
  return <div>Hello "/tags/$tagId/"!</div>;
}
