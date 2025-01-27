import * as Dialog from "@radix-ui/react-dialog";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { customisationColours } from "src/lib/colour/constants/customisationColours";
import { Button } from "src/lib/components/Button/Button";
import { useGetJournal } from "src/lib/journal/hooks/useGetJournal";
import isAuthenticated from "src/lib/user/utils/isAuthenticated";
import { cn } from "src/lib/utils/cn";
import { EditJournalModal } from "./-components/EditJournalModal";
import SlipSection from "./-components/SlipSection";
import type { Slip } from "src/lib/slip/types/Slip.type";

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

  if (!journal) {
    return null;
  }

  const customisationColour = customisationColours.find(
    (colour) => colour.name === journal.colour
  );

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

  // how to make a scroll to TOC
  // https://www.youtube.com/watch?v=xgz5jIi4R7c
  return (
    <div className="h-full w-full flex justify-center">
      <div className="max-w-[700px] overflow-y-scroll">
        <div className="py-4 mx-4">
          <div className="flex justify-between items-center">
            <h1
              className={cn(
                customisationColour?.textClass,
                "font-title text-5xl"
              )}
            >
              {journal.name}
            </h1>

            <div className="flex gap-2">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button variant="ghost" iconName="pencil" />
                </Dialog.Trigger>

                <EditJournalModal journal={journal} />
              </Dialog.Root>
              <Button variant="ghost" iconName="arrowsDownUp" />
            </div>
          </div>

          <h3 className="text-stone-500">1 section, {slips.length} notes</h3>
        </div>

        <div className="p-3 mb-4 mx-4 border min-h-full border-stone-300 rounded-lg flex flex-col gap-3 bg-white shadow-light">
          {sectionedSlips.noTitles.map((slip) => (
            <SlipSection slip={slip} />
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
            <SlipSection slip={slip} />
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
