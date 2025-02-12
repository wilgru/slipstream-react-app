import type { Slip, SlipsGroup } from "../Slip.type";

const getGroupTitle = (slip: Slip, groupBy: "created" | "journal") => {
  switch (groupBy) {
    case "created":
      return [
        {
          title: slip.created.format("ddd D MMMM YYYY"),
          value: slip.created,
        },
      ];

    case "journal":
      return slip.journals.map((journal) => ({
        title: journal.name,
        value: journal,
      }));

    default:
      return [];
  }
};

export const groupSlips = (
  slips: Slip[],
  groupBy: "created" | "journal"
): SlipsGroup[] => {
  const groupedSlips = slips.reduce((acc: SlipsGroup[], slip: Slip) => {
    const groups = getGroupTitle(slip, groupBy);

    for (const group of groups) {
      const existingGroup = acc.find(
        (accGroup) => accGroup.title === group.title
      );

      if (existingGroup) {
        existingGroup.slips.push(slip);
      } else {
        const newGroup = {
          title: group.title,
          value: group.value,
          slips: [slip],
        };

        acc.push(newGroup);
      }
    }

    return acc;
  }, []);

  return groupedSlips;
};
