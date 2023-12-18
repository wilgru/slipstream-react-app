export const generateId = (length: number = 15) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
// TODO: make sure is truly unique and pocketbase is happy with this (also make own)
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
