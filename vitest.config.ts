import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@database": path.resolve(__dirname, "./packages/Node/src/database"),
      "@server": path.resolve(__dirname, "./packages/Node/src/server"),
      "@handlers": path.resolve(__dirname, "./packages/Node/src/handlers"),
      "@utils": path.resolve(__dirname, "./packages/Node/src/utils"),
      "@types": path.resolve(__dirname, "./packages/Node/src/types"),
      "@models": path.resolve(__dirname, "./packages/Node/src/models"),
      "@controllers": path.resolve(__dirname, "./packages/Node/src/controllers"),
    },
  },
});
