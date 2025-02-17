import { Check } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Button } from "src/components/Button/Button";
import { useUpdateJournal } from "src/hooks/journals/useUpdateJournal";
import { cn } from "src/utils/cn";
import { EditJournalModal } from "./EditJournalModal";
import type { Journal } from "src/types/Journal.type";
import type { SlipsGroupDividedByTitle } from "src/types/Slip.type";

type JournalHeaderProps = {
  journal: Journal;
  slipGroups: SlipsGroupDividedByTitle[];
};

export const JournalHeader = ({ journal, slipGroups }: JournalHeaderProps) => {
  const { updateJournal } = useUpdateJournal();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="py-4 mx-9">
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
                  <DropdownMenu.Label className="p-1 text-xs text-stone-500">
                    Group by
                  </DropdownMenu.Label>

                  <DropdownMenu.Separator className="h-[1px] mb-1 rounded-full bg-stone-300" />

                  <DropdownMenu.RadioItem
                    className={cn(
                      "leading-none text-sm p-1 flex justify-between items-center outline-none rounded-sm cursor-pointer",
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
                      "leading-none text-sm p-1 flex justify-between  items-center outline-none rounded-sm cursor-pointer",
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
                  <DropdownMenu.Label className="p-1 text-xs text-stone-500">
                    Sort by
                  </DropdownMenu.Label>

                  <DropdownMenu.Separator className="h-[1px] mb-1 rounded-full bg-stone-300" />

                  <DropdownMenu.RadioItem
                    className={cn(
                      "leading-none text-sm p-1 flex justify-between  items-center outline-none rounded-sm cursor-pointer",
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
                      "leading-none text-sm p-1 flex justify-between  items-center outline-none rounded-sm cursor-pointer",
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
