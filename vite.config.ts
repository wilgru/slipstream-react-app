import { resolve } from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), svgr(), react()],
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
});
