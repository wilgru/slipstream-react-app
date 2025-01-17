import { useParams } from "react-router-dom";
import { Button } from "src/common/components/Button/Button";
import { customisationColours } from "src/common/constants/customisationColours";
import { cn } from "src/common/utils/cn";
import { useJournal } from "../hooks/useJournal";

export default function JournalPage() {
  const { journalId } = useParams<{ journalId: string }>();

  const { journal } = useJournal(journalId ?? "");

  if (!journal) {
    return null;
  }

  const customisationColour = customisationColours.find(
    (colour) => colour.name === journal.colour
  );

  return (
    <>
      <div className={"py-4 mx-4 absolute -z-10"}>
        <div className="flex justify-between">
          <h1
            className={cn(
              customisationColour?.textClass,
              "font-title text-5xl"
            )}
          >
            {journal.name}
          </h1>
          <Button variant="ghost" iconName="pencil" />
          <Button variant="ghost" iconName="arrowsDownUp" />
        </div>

        <h3 className="text-stone-500">{journal.slips?.length} notes</h3>
      </div>

      <div className="h-full w-full overflow-y-scroll z-10">
        <div className="p-4 mt-24 mb-4 mx-4 border min-h-full border-stone-300 rounded-lg flex flex-col gap-7 bg-white shadow-light">
          {journal.slips?.map((slip) => (
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
    </>
  );
}
