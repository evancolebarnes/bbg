import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,

    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "TSJ",
      formats: ["es"],
      fileName: () => "tsj-min.js",
    },

    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
