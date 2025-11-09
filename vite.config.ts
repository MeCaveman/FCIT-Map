import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";


export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      outDir: "dist",
    },
    esbuild: {
      pure: mode === "production" ? ["console.log"] : [],
    },
  };
});
