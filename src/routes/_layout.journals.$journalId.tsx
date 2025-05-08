import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { JournalHeader } from "src/components/JournalHeader/JournalHeader";
import { SlipCard } from "src/components/SlipCard/SlipCard";
import TableOfContents from "src/components/TableOfContents/TableOfContents";
import { useGetJournal } from "src/hooks/journals/useGetJournal";
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import isAuthenticated from "src/utils/users/isAuthenticated";

export const Route = createFileRoute("/_layout/journals/$journalId")({
  component: JournalComponent,
  // loader: ({ params }) => fetchJournal(params.journalId),
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

export default function JournalComponent() {
  const { journalId } = Route.useParams();
  const { journal, slipGroups, tableOfContentItems } = useGetJournal(
    journalId ?? ""
  );
  const [navigationId, setNavigationId] = useState("");

  const slipRefs = useRef<HTMLDivElement[]>([]);

  useIntersectionObserver(
    slipRefs,
    (entry) => {
      setNavigationId(entry.target.id);
    },
    { rootMargin: "-10% 0% -90% 0%" },
    { disabled: false }
  );

  useEffect(() => {
    const firstNavigationId =
      slipGroups.at(0)?.slipsWithNoTitle.at(0)?.id ??
      slipGroups.at(0)?.slipsWithTitle.at(0)?.id;

    firstNavigationId && setNavigationId(firstNavigationId);
  }, [slipGroups]);

  if (!journal) {
    return null;
  }

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-[700px] overflow-y-scroll">
        <div className="p-5 mb-[50vh] mx-9 mt-4 border min-h-full border-stone-200 rounded-3xl flex flex-col gap-8 bg-white drop-shadow">
          <JournalHeader journal={journal} slipGroups={slipGroups} />

          {slipGroups.map((slipGroup) => (
            <div className="flex flex-col">
              <h2 className="pl-2 text-stone-400 font-title font-thin text-xl">
                {slipGroup.title}
              </h2>

              <div className="flex flex-col gap-3">
                {slipGroup.slipsWithNoTitle.map((slip) => (
                  <SlipCard
                    ref={(el: HTMLDivElement | null) => {
                      if (el && !slipRefs.current.includes(el)) {
                        slipRefs.current.push(el);
                      }
                    }}
                    slip={slip}
                    colour={journal.colour}
                  />
                ))}

                {slipGroup.slipsWithNoTitle.length > 0 &&
                  slipGroup.slipsWithTitle.length > 0 && (
                    <div className="flex flex-row gap-2 justify-center">
                      <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                      <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                      <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                    </div>
                  )}

                {slipGroup.slipsWithTitle.map((slip) => (
                  <SlipCard
                    ref={(el: HTMLDivElement | null) => {
                      if (el && !slipRefs.current.includes(el)) {
                        slipRefs.current.push(el);
                      }
                    }}
                    slip={slip}
                    colour={journal.colour}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TableOfContents
        items={tableOfContentItems}
        activeItemNavigationId={navigationId}
        onJumpTo={(id) => setNavigationId(id)}
        colour={journal.colour}
      />
    </div>
  );
}
