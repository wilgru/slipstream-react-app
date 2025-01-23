import * as Dialog from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
import { Button } from "src/common/components/Button/Button";
import { customisationColours } from "src/common/constants/customisationColours";
import { cn } from "src/common/utils/cn";
import { useJournal } from "../models/journal/hooks/useJournal";
import { EditJournalModal } from "./components/EditJournalModal";
import type { Slip } from "src/models/slip/types/Slip.type";

export default function JournalPage() {
  const { journalId } = useParams<{ journalId: string }>();

  const { journal } = useJournal(journalId ?? "");

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

  journal.slips?.forEach((slip) => {
    if (slip.title) {
      sectionedSlips.withTitles.push(slip);
    } else {
      sectionedSlips.noTitles.push(slip);
    }
  });

  return (
    <div className="h-full w-full overflow-y-scroll z-10">
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

              <EditJournalModal topic={journal} />
            </Dialog.Root>
            <Button variant="ghost" iconName="arrowsDownUp" />
          </div>
        </div>

        <h3 className="text-stone-500">{journal.slips?.length} notes</h3>
      </div>

      <div className="p-4 mb-4 mx-4 border min-h-full border-stone-300 rounded-lg flex flex-col gap-7 bg-white shadow-light">
        {sectionedSlips.noTitles.map((slip) => (
          <div key={slip.id}>
            <h1
              className={`select-none font-title text-2xl font-normal tracking-tight text-stone-700`}
            >
              {slip.title}
            </h1>

            <p className="text-sm">
              {slip.content.reduce((acc, op) => acc + op.insert, "")}
            </p>
          </div>
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
          <div key={slip.id}>
            <h1
              className={`select-none font-title text-2xl font-normal tracking-tight text-stone-700`}
            >
              {slip.title}
            </h1>

            <p className="text-sm">
              {slip.content.reduce((acc, op) => acc + op.insert, "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
