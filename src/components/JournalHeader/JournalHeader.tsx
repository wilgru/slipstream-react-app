import { Check } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "src/components/Button/Button";
import { useUpdateJournal } from "src/hooks/journals/useUpdateJournal";
import { cn } from "src/utils/cn";
import { EditJournalModal } from "../EditJournalModal/EditJournalModal";
import { Icon } from "../Icon/Icon";
import type { Journal } from "src/types/Journal.type";
import type { SlipsGroupDividedByTitle } from "src/types/Slip.type";

type JournalHeaderProps = {
  journal: Journal;
  slipGroups: SlipsGroupDividedByTitle[];
};

export const JournalHeader = ({ journal, slipGroups }: JournalHeaderProps) => {
  const { updateJournal } = useUpdateJournal();

  return (
    <div className="border-b border-stone-200 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Icon iconName={journal.icon} size="xl" />

          <h1 className={cn(journal.colour.text, "font-title text-5xl")}>
            {journal.name}
          </h1>
        </div>

        <div className="flex gap-1 p-1 border border-stone-200 rounded-full">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                variant="ghost"
                colour={journal.colour}
                iconName="palette"
              />
            </Dialog.Trigger>

            <EditJournalModal journal={journal} />
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
                className="flex flex-col gap-2 bg-white border border-stone-200 rounded-2xl p-2 w-40 drop-shadow"
                sideOffset={2}
                align="start"
              >
                <DropdownMenu.RadioGroup
                  value={journal.groupBy}
                  onValueChange={(value) => {
                    if (value === "created" || value === "journal") {
                      updateJournal({
                        journalId: journal.id,
                        updateJournalData: {
                          ...journal,
                          groupBy: value,
                        },
                      });
                    }
                  }}
                >
                  <DropdownMenu.Label className="pl-2 text-xs text-stone-400">
                    Group by
                  </DropdownMenu.Label>

                  <DropdownMenu.RadioItem
                    className={cn(
                      "leading-none text-sm p-2 flex justify-between items-center outline-none rounded-xl cursor-pointer transition-colors",
                      `data-[highlighted]:${journal.colour.backgroundPill}`,
                      `data-[highlighted]:${journal.colour.textPill}`
                    )}
                    value="created"
                  >
                    Created
                    <DropdownMenu.ItemIndicator>
                      <Check />
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem
                    className={cn(
                      "leading-none text-sm p-2 flex justify-between items-center outline-none rounded-xl cursor-pointer transition-colors",
                      `data-[highlighted]:${journal.colour.backgroundPill}`,
                      `data-[highlighted]:${journal.colour.textPill}`
                    )}
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
                  <DropdownMenu.Label className="pl-2 text-xs text-stone-400">
                    Sort by
                  </DropdownMenu.Label>

                  <DropdownMenu.RadioItem
                    className={cn(
                      "leading-none text-sm p-2 flex justify-between items-center outline-none rounded-xl cursor-pointer transition-colors",
                      `data-[highlighted]:${journal.colour.backgroundPill}`,
                      `data-[highlighted]:${journal.colour.textPill}`
                    )}
                    value="created"
                  >
                    Created
                    <DropdownMenu.ItemIndicator>
                      <Check />
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem
                    className={cn(
                      "leading-none text-sm p-2 flex justify-between items-center outline-none rounded-xl cursor-pointer transition-colors",
                      `data-[highlighted]:${journal.colour.backgroundPill}`,
                      `data-[highlighted]:${journal.colour.textPill}`
                    )}
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

      <div className="flex gap-1">
        <h3
          className={cn(
            "px-2 py-0.5 text-sm rounded-full",
            journal.colour.backgroundPill,
            journal.colour.textPill
          )}
        >
          {slipGroups.length} sections
        </h3>

        <h3
          className={cn(
            "px-2 py-0.5 text-sm rounded-full",
            journal.colour.backgroundPill,
            journal.colour.textPill
          )}
        >
          {journal.slipCount} notes
        </h3>
      </div>
    </div>
  );
};
