import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const isProduction = process.env.NODE_ENV === "production";

const profiling = isProduction && {
  "react-dom/client": "react-dom/profiling",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    sourcemap: "inline",
  },
  resolve: {
    alias: {
      ...profiling,
    },
  },
});
