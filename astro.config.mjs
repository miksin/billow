// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";
import svgLoader from "vite-svg-loader";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [vue(), tailwind()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  experimental: {
    svg: true,
  },
  vite: {
    plugins: [svgLoader()],
  },
});
