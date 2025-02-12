import { Check } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Button } from "src/components/Button/Button";
import TableOfContents from "src/components/TableOfContents/TableOfContents";
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import { useGetJournal } from "src/models/journals/hooks/useGetJournal";
import isAuthenticated from "src/models/users/utils/isAuthenticated";
import { cn } from "src/utils/cn";
import { EditJournalModal } from "./-components/EditJournalModal";
import { SlipSection } from "./-components/SlipSection";
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
  const { journal, slips } = useGetJournal(journalId ?? "", "created");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
        <div className="py-4 mx-4">
          <div className="flex justify-between items-center">
            <h1 className={cn(journal.colour.text, "font-title text-5xl")}>
              {journal.name}
            </h1>

            <div className="flex gap-2">
              <Dialog.Root open={isEditModalOpen}>
                <Dialog.Trigger asChild>
                  <Button
                    variant="ghost"
                    colour={journal.colour}
                    iconName="pencil"
                    onClick={() => setIsEditModalOpen(true)}
                  />
                </Dialog.Trigger>

                <EditJournalModal
                  journal={journal}
                  onClose={() => setIsEditModalOpen(false)}
                />
              </Dialog.Root>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <div>
                    <Button
                      variant="ghost"
                      colour={journal.colour}
                      iconName="arrowsDownUp"
                    />
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="bg-white border border-stone-300 rounded-md p-1 w-40 drop-shadow-lg"
                    sideOffset={2}
                    align="start"
                  >
                    <DropdownMenu.RadioGroup
                      value={"created"}
                      onValueChange={() => {}}
                    >
                      <DropdownMenu.Label className="p-1 text-xs text-stone-500">
                        Group by
                      </DropdownMenu.Label>

                      <DropdownMenu.Separator className="h-[1px] mb-1 rounded-full bg-stone-300" />

                      <DropdownMenu.RadioItem
                        className="leading-none text-sm p-1 data-[highlighted]:bg-orange-100 flex justify-between data-[highlighted]:text-orange-500 outline-none rounded-sm cursor-pointer"
                        value="created"
                      >
                        Created
                        <DropdownMenu.ItemIndicator>
                          <Check />
                        </DropdownMenu.ItemIndicator>
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        className="leading-none text-sm p-1 data-[highlighted]:bg-orange-100 flex justify-between data-[highlighted]:text-orange-500 outline-none rounded-sm cursor-pointer"
                        value="journal"
                      >
                        Journal
                        <DropdownMenu.ItemIndicator>
                          <Check />
                        </DropdownMenu.ItemIndicator>
                      </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>

                    <DropdownMenu.RadioGroup
                      value={"created"}
                      onValueChange={() => {}}
                    >
                      <DropdownMenu.Label className="p-1 text-xs text-stone-500">
                        Sort by
                      </DropdownMenu.Label>

                      <DropdownMenu.Separator className="h-[1px] mb-1 rounded-full bg-stone-300" />

                      <DropdownMenu.RadioItem
                        className="leading-none text-sm p-1 data-[highlighted]:bg-orange-100 flex justify-between data-[highlighted]:text-orange-500 outline-none rounded-sm cursor-pointer"
                        value="created"
                      >
                        Created
                        <DropdownMenu.ItemIndicator>
                          <Check />
                        </DropdownMenu.ItemIndicator>
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        className="leading-none text-sm p-1 data-[highlighted]:bg-orange-100 flex justify-between data-[highlighted]:text-orange-500 outline-none rounded-sm cursor-pointer"
                        value="title"
                      >
                        Title
                        <DropdownMenu.ItemIndicator>
                          <Check />
                        </DropdownMenu.ItemIndicator>
                      </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>

          <h3 className="text-stone-500">{slips.length} section, ? notes</h3>
        </div>

        <div className="p-3 mb-4 mx-4 border min-h-full border-stone-300 rounded-lg flex flex-col gap-10 bg-white drop-shadow-md">
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
                <SlipSection
                  ref={(el: HTMLDivElement | null) => {
                    if (el && !slipRefs.current.includes(el)) {
                      slipRefs.current.push(el);
                    }
                  }}
                  slip={slip}
                  colour={journal.colour}
                  journalId={journal.id}
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
                <SlipSection
                  ref={(el: HTMLDivElement | null) => {
                    if (el && !slipRefs.current.includes(el)) {
                      slipRefs.current.push(el);
                    }
                  }}
                  slip={slip}
                  colour={journal.colour}
                  journalId={journal.id}
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
