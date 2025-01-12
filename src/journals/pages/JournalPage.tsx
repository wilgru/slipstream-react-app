import { useParams } from "react-router-dom";
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
      <h1
        className={cn(
          customisationColour?.textClass,
          "py-4 font-title text-5xl absolute -z-10"
        )}
      >
        {journal.name}
      </h1>

      <div className="h-full w-full overflow-y-scroll z-10">
        <div className="p-4 mt-24 mb-4 mr-4 border min-h-full border-stone-300 rounded-lg flex flex-col gap-5 bg-white">
          {journal.slips?.map((slip) => (
            <div key={slip.id}>
              <h1
                className={`select-none font-title text-xl font-normal tracking-tight text-black`}
              >
                {slip.title}
              </h1>

              {slip.content.reduce((acc, op) => acc + op.insert, "")}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
