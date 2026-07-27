// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Tailwind 3 corre via postcss.config.js (suporte PostCSS nativo do Astro).
export default defineConfig({
  integrations: [react()],
  build: {
    inlineStylesheets: "auto",
  },
});
