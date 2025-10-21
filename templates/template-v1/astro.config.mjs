// @ts-check

import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    base: "",
    server: {
      allowedHosts: ["host.docker.internal"],
    },
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 128,
    },
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  },
});
