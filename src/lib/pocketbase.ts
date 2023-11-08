import PocketBase from "pocketbase";

const url = "http://0.0.0.0:8080";
export const pb = new PocketBase(url);

export const pbDevConsoleLog = (text: string) => {
  // https://vitejs.dev/guide/env-and-mode.html
  // console.log("%c[pocketbase] " + text, "color: #2fba13;");
  import.meta.env.DEV && console.log("[pocketbase] " + text);
};
