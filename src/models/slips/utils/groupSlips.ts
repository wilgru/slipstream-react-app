import type { Slip, SlipsGroup, SlipsGroupDividedByTitle } from "../Slip.type";

const getGroupTitle = (slip: Slip, groupBy: "created" | "journal") => {
  switch (groupBy) {
    case "created":
      return [slip.created.format("ddd D MMMM YYYY")];

    case "journal":
      return slip.journals.map((journal) => journal.name);

    default:
      return [];
  }
};

export function groupSlips(
  slips: Slip[],
  groupBy: "created" | "journal",
  divideByTitle: true
): SlipsGroupDividedByTitle[];
export function groupSlips(
  slips: Slip[],
  groupBy: "created" | "journal",
  divideByTitle?: false
): SlipsGroup[];
export function groupSlips(
  slips: Slip[],
  groupBy: "created" | "journal",
  divideByTitle: boolean = false
): (SlipsGroup | SlipsGroupDividedByTitle)[] {
  const groupedSlips = slips.reduce((acc: SlipsGroup[], slip: Slip) => {
    const groupTitles = getGroupTitle(slip, groupBy);

    for (const groupTitle of groupTitles) {
      const existingGroup = acc.find(
        (accGroup) => accGroup.title === groupTitle
      );

      if (existingGroup) {
        existingGroup.slips.push(slip);
      } else {
        const newGroup = {
          title: groupTitle,
          slips: [slip],
        };

        acc.push(newGroup);
      }
    }

    return acc;
  }, []);

  if (divideByTitle) {
    return groupedSlips.map((groupedSlip) => {
      const slipsWithTitle: Slip[] = [];
      const slipsWithNoTitle: Slip[] = [];

      groupedSlip.slips.forEach((slip) => {
        if (slip.title) {
          slipsWithTitle.push(slip);
        } else {
          slipsWithNoTitle.push(slip);
        }
      });

      return {
        title: groupedSlip.title,
        slipsWithTitle,
        slipsWithNoTitle,
      };
    });
  }

  return groupedSlips;
}
