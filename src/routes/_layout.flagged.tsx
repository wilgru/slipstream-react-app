import { createFileRoute, redirect } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { SlipCard } from "src/components/SlipCard/SlipCard";
import TableOfContents from "src/components/TableOfContents/TableOfContents";
import { colours } from "src/constants/colours.constant";
import { useGetSlips } from "src/hooks/slips/useGetSlips";
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import isAuthenticated from "src/utils/users/isAuthenticated";

export const Route = createFileRoute("/_layout/flagged")({
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

// TODO: code is almost identical to stream page, consider consolidating in generic page
function RouteComponent() {
  const { slipGroups, tableOfContentItems } = useGetSlips({ isFlagged: true });
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const slipRefs = useRef<HTMLDivElement[]>([]);
  const [navigationId, setNavigationId] = useState("");

  useIntersectionObserver(
    slipRefs,
    (entry) => {
      setNavigationId(entry.target.id);
    },
    { rootMargin: "-10% 0% -90% 0%" },
    { disabled: false }
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "instant",
    });

    const lastSlipGroup = slipGroups.at(slipGroups.length - 1);

    lastSlipGroup && setNavigationId(lastSlipGroup?.title);
  }, [slipGroups]);

  const length = slipGroups.reduce(
    (acc, slipGroup) => (acc = acc + slipGroup.slips.length),
    0
  );

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full gap-10 py-10 max-w-[700px] overflow-y-auto overflow-x-hidden">
        {slipGroups.map((group) => (
          <div
            ref={(el: HTMLDivElement | null) => {
              if (el && !slipRefs.current.includes(el)) {
                slipRefs.current.push(el);
              }
            }}
            id={group.title}
            key={group.title}
            className="flex flex-col gap-3"
          >
            <h2 className="mx-9 font-title text-3xl">{group.title}</h2>

            {group.slips.map((slip) => (
              <div
                key={slip.id}
                className="relative p-3 mx-9 rounded-lg bg-white drop-shadow-md border border-stone-300"
              >
                <SlipCard slip={slip} colour={colours.orange} />
              </div>
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
        <TableOfContents
          items={tableOfContentItems}
          activeItemNavigationId={navigationId}
          onJumpTo={(id) => setNavigationId(id)}
        />
      </div>
    </div>
  );
}
