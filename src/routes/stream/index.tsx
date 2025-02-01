import { createFileRoute, redirect } from "@tanstack/react-router";
import { useGetSlips } from "src/models/slips/hooks/useGetSlips";
import isAuthenticated from "src/models/users/utils/isAuthenticated";
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

  const length = 9000;

  return (
    <div className="flex flex-col-reverse h-full gap-3 p-6 max-w-[700px] overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center">
        <h1 className="font-title text-2xl text-stone-300">
          {length} total slips
        </h1>
      </div>

      {slips.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <h2 className="font-title text-stone-700 text-3xl">{group.title}</h2>

          {group.slips.map((slip) => (
            <SlipCard key={slip.id} slip={slip} />
          ))}
        </div>
      ))}
    </div>
  );
}
