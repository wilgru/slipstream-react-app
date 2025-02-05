import * as Dialog from "@radix-ui/react-dialog";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "src/components/Button/Button";
import { useGetJournal } from "src/models/journals/hooks/useGetJournal";
import isAuthenticated from "src/models/users/utils/isAuthenticated";
import { cn } from "src/utils/cn";
import { EditJournalModal } from "./-components/EditJournalModal";
import SlipSection from "./-components/SlipSection";
import type { Slip } from "src/models/slips/Slip.type";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!journal) {
    return null;
  }

  const sectionedSlips: {
    noTitles: Slip[];
    withTitles: Slip[];
  } = {
    noTitles: [],
    withTitles: [],
  };

  slips.forEach((slip) => {
    if (slip.title) {
      sectionedSlips.withTitles.push(slip);
    } else {
      sectionedSlips.noTitles.push(slip);
    }
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

              <Button
                variant="ghost"
                colour={journal.colour}
                iconName="arrowsDownUp"
              />
            </div>
          </div>

          <h3 className="text-stone-500">1 section, {slips.length} notes</h3>
        </div>

        <div className="p-3 mb-4 mx-4 border min-h-full border-stone-300 rounded-lg flex flex-col gap-3 bg-white shadow-light">
          {sectionedSlips.noTitles.map((slip) => (
            <SlipSection
              slip={slip}
              colour={journal.colour}
              journalId={journal.id}
            />
          ))}

          {sectionedSlips.noTitles.length > 0 &&
            sectionedSlips.withTitles.length > 0 && (
              <div className="flex flex-row gap-2 justify-center">
                <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
                <div className=" rounded-full bg-stone-300 h-1 w-1"></div>
              </div>
            )}

          {sectionedSlips.withTitles.map((slip) => (
            <SlipSection
              slip={slip}
              colour={journal.colour}
              journalId={journal.id}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {sectionedSlips.noTitles.map((slip) => (
          <div key={slip.id} className="overflow-x-clip">
            <h3 className="text-sm italic">No title</h3>
          </div>
        ))}
        {sectionedSlips.withTitles.map((slip) => (
          <div key={slip.id} className="overflow-x-clip">
            <h3 className="text-sm">{slip.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
