import type { Slip, SlipsGroup } from "../Slip.type";

export const groupSlips = (slips: Slip[], groupBy: "created"): SlipsGroup[] => {
  const groupedSlips = slips.reduce((acc: SlipsGroup[], slip: Slip) => {
    const dateString = slip.created.format("ddd D MMMM YYYY");

    const existingGroup = acc.find((group) => group.title === dateString);
    if (existingGroup) {
      existingGroup.slips.push(slip);
    } else {
      const newGroup = {
        title: dateString,
        value: slip.created,
        slips: [slip],
      };

      const insertIndex = acc.findIndex((group) =>
        group.value.isAfter(slip.created)
      );

      if (insertIndex === -1) {
        acc.push(newGroup);
      } else {
        acc.splice(insertIndex, 0, newGroup);
      }
    }

    return acc;
  }, []);

  return groupedSlips;
};
