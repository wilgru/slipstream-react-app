export const CompareCleanStrings = (
  string1: string,
  string2: string,
  type: "exact" | "like" = "exact"
) => {
  switch (type) {
    case "exact":
      return string1.toLowerCase().trim() === string2.toLowerCase().trim();

    case "like":
      return string1.toLowerCase().includes(string2.toLowerCase().trim());
  }
};
