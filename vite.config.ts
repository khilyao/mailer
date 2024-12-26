import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@views": resolve(__dirname, "src/views"),
      "@assets": resolve(__dirname, "src/assets"),
      "@store": resolve(__dirname, "src/store"),
      "@features": resolve(__dirname, "src/features"),
    },
  },
});
