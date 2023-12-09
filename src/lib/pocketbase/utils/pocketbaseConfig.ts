import PocketBase from "pocketbase";

const url = import.meta.env.VITE_POCKETBASE_URL;
export const pb = new PocketBase(url);

export const pbDevConsoleLog = (text: string) => {
  // https://vitejs.dev/guide/env-and-mode.html
  // console.log("%c[pocketbase] " + text, "color: #2fba13;");
  import.meta.env.DEV && console.log("[pocketbase] " + text);
}; // TODO: move to debug section when available
