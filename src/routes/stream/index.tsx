import { createFileRoute, redirect } from "@tanstack/react-router";
import { useGetSlips } from "src/lib/slip/hooks/useGetSlips";
import isAuthenticated from "src/lib/user/utils/isAuthenticated";
import SlipCard from "src/routes/stream/-components/SlipCard";

export const Route = createFileRoute("/stream/")({
  component: StreamIndexComponent,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          // (Do not use `router.state.resolvedLocation` as it can potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function StreamIndexComponent() {
  const { slips } = useGetSlips();

  return (
    <div className="flex flex-col h-full gap-2 p-6 w-full overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center">
        <h1 className="font-title text-lg">{slips.length} Slips</h1>
      </div>

      {slips.map((slip) => (
        <SlipCard key={slip.id} slip={slip} isFocused={false} />
      ))}
    </div>
  );
}
