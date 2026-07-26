import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath, URL } from "node:url";

// Build de pré-visualização: um único HTML com tudo inline (JS, CSS, fontes),
// para publicar como página partilhável sem servidor.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "import.meta.env.VITE_HASH_ROUTER": JSON.stringify("true"),
  },
  build: {
    outDir: "dist-artifact",
    assetsInlineLimit: 100000000,
  },
});
