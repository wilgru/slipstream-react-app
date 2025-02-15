import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef } from "react";
import TableOfContents from "src/components/TableOfContents/TableOfContents";
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import { useGetJournal } from "src/models/journals/hooks/useGetJournal";
import isAuthenticated from "src/models/users/utils/isAuthenticated";
import { cn } from "src/utils/cn";
import { SlipCard } from "../../components/SlipCard/SlipCard";
import { JournalHeader } from "./-components/JournalHeader";
import type { TableOfContentsItem } from "src/components/TableOfContents/TableOfContents";

export const Route = createFileRoute("/journals/$journalId/")({
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
  const { journal, slips } = useGetJournal(journalId ?? "");
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

  if (!journal) {
    return null;
  }

  const tableOfContentItems: TableOfContentsItem[] = slips.map((slipGroup) => {
    const mappedSlipsWithNoTitle = slipGroup.slipsWithNoTitle.map(
      (slipWithNoTitle) => {
        const title = slipWithNoTitle.content.ops[0].insert;

        return {
          title: typeof title === "string" ? title : "No title",
          navigationId: slipWithNoTitle.id,
          subItems: [],
        };
      }
    );
    const mappedSlipsWithTitle = slipGroup.slips.map((slip) => ({
      title: slip.title ?? "", // this should never fallback to empty string as empty titles are filtered beforehand
      navigationId: slip.id,
      subItems: [],
    }));

    return {
      title: slipGroup.title,
      navigationId: null,
      subItems: [...mappedSlipsWithNoTitle, ...mappedSlipsWithTitle],
    };
  });

  return (
    <div className="h-full w-full flex justify-center">
      <div className="max-w-[700px] overflow-y-scroll">
        <JournalHeader journal={journal} slips={slips} />

        <div className="p-3 mb-4 mx-9 border min-h-full border-stone-300 rounded-lg flex flex-col gap-10 bg-white drop-shadow-md">
          {slips.map((slipGroup) => (
            <div className="flex flex-col gap-3">
              <h2
                className={cn(
                  "pl-2 font-title text-3xl border-b border-stone-200",
                  journal.colour.text
                )}
              >
                {slipGroup.title}
              </h2>

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
                slipGroup.slips.length > 0 && (
                  <div className="flex flex-row gap-2 justify-center">
                    <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                    <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                    <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                  </div>
                )}

              {slipGroup.slips.map((slip) => (
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
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <TableOfContents
          items={tableOfContentItems}
          activeItemNavigationId={navigationId}
          onJumpTo={(id) => setNavigationId(id)}
          colour={journal.colour}
        />
      </div>
    </div>
  );
}
