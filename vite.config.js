export default {
  build: {
    // 1. Set your nested destination folder here
    outDir: "bbg/rbh-site/dist",

    // 2. Clear the folder before each build (recommended for nested paths)
    emptyOutDir: true,

    rollupOptions: {
      output: {
        // Your existing configuration
        entryFileNames: "main.js",
      },
    },
  },
};
