import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import { colours } from "src/models/colours/colours.constant";
import { useGetSlips } from "src/models/slips/hooks/useGetSlips";
import isAuthenticated from "src/models/users/utils/isAuthenticated";
import TableOfContents from "../../components/TableOfContents/TableOfContents";
import { SlipSection } from "../journals.$journalId/-components/SlipSection";
import type { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

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

    const lastSlipGroup = slips.at(slips.length - 1);

    lastSlipGroup && setNavigationId(lastSlipGroup?.title);
  }, [slips]);

  const tableOfContentItems = slips.reduce(
    (acc: TableOfContentsItem[], group) => {
      const title = group.value.format("MMMM YYYY");
      const item = acc.find((item) => item.title === title);

      const day = {
        title: group.value.format("dddd D"),
        navigationId: group.title,
        subItems: [],
      };

      if (!item) {
        acc.push({
          title,
          navigationId: null,
          subItems: [day],
        });
      } else {
        item.subItems.push(day);
      }

      return acc;
    },
    []
  );

  const length = 9000;

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full gap-10 max-w-[700px] overflow-y-auto overflow-x-hidden">
        {slips.map((group) => (
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
                <SlipSection slip={slip} colour={colours.orange} />
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
