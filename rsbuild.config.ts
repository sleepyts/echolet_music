import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  plugins: [pluginReact()],

  tools: {
    postcss: {
      postcssOptions: {
        plugins: [require("@tailwindcss/postcss")],
      },
    },
  },

  source: {
    define: {
      "process.env.APP_BASE_URL": JSON.stringify(process.env.APP_BASE_URL),
      "process.env.APP_PROXY_URL": JSON.stringify(process.env.APP_PROXY_URL),
    },
  },

  html: {
    template: "./src/index.html",
  },
  server: {
    port: 5173,
  },

  performance: {
    buildCache: true,
  },
});
