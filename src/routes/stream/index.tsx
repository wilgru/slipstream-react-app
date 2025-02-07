import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useGetSlips } from "src/models/slips/hooks/useGetSlips";
import isAuthenticated from "src/models/users/utils/isAuthenticated";
import SlipCard from "src/routes/stream/-components/SlipCard";
import TableOfContents from "./-components/TableOfContents";

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
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [slips]);

  const length = 9000;

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full gap-3 p-6 max-w-[700px] overflow-y-auto overflow-x-hidden">
        {slips.map((group) => (
          <div
            id={`TOC-${group.title}`}
            key={group.title}
            className="flex flex-col gap-3"
          >
            <h2 className="font-title text-stone-700 text-3xl">
              {group.title}
            </h2>

            {group.slips.map((slip) => (
              <SlipCard key={slip.id} slip={slip} />
            ))}
          </div>
        ))}

        <div ref={bottomRef} className="flex justify-center">
          <h1 className="font-title text-2xl text-stone-300">
            {length} total slips
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <TableOfContents groupedSlips={slips} />
      </div>
    </div>
  );
}
