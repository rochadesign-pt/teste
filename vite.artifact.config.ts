import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath, URL } from "node:url";

// Build de pré-visualização: um único HTML com tudo inline (JS, CSS, fontes),
// para publicar como página partilhável sem servidor. O site real é Astro.
export default defineConfig({
  root: "preview",
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "../dist-artifact",
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
  },
});
