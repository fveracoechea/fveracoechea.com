import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    alias: {
      cva: "class-variance-authority",
    },
  },
  plugins: [
    tailwindcss(),
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: ["/404"],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: "/404",
      },
    }),
  ],
});
