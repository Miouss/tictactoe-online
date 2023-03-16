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
      "@middlewares": path.resolve(__dirname, "./packages/Node/src/middlewares"),
      "@routes": path.resolve(__dirname, "./packages/Node/src/routes"),
    },
  },
});
