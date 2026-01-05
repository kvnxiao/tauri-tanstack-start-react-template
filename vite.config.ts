import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

type TanStackStartInputConfig = NonNullable<
  Parameters<typeof tanstackStart>[0]
>;
type SpaOptions = NonNullable<TanStackStartInputConfig["spa"]>;
type SpaPrerenderOptions = NonNullable<SpaOptions["prerender"]>;
type RegularPrerenderOptions = NonNullable<SpaOptions["prerender"]>;

const host = process.env.TAURI_DEV_HOST;

// Read from environment variable to pick which prerender mode to use.
// Defaults to false, which will pick the SPA prerender mode
const useSsrPrerenderMode =
  process.env.USE_SSR_PRERENDER_MODE === "true" ||
  process.env.USE_SSR_PRERENDER_MODE === "1";

const sharedPrerenderOptions: SpaPrerenderOptions & RegularPrerenderOptions = {
  enabled: true,
  autoSubfolderIndex: true,
};

// See: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode#prerendering-options
const regularPrerenderOptions: RegularPrerenderOptions = {
  ...sharedPrerenderOptions,
  // Whether to extract links from the HTML and prerender them also
  // See: https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering#crawling-links
  crawlLinks: true,
  // Number of times to retry a failed prerender job
  retryCount: 3,
  // Delay between retries in milliseconds
  retryDelay: 1000,
};

// See: https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode#prerendering-options
const spaWithPrerenderOptions: SpaOptions = {
  prerender: {
    ...sharedPrerenderOptions,
    // Change the root output path for SPA prerendering from /_shell.html to /index.html
    outputPath: "/index.html",
    crawlLinks: false,
    retryCount: 0,
  },
};

// See: https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      spa: (!useSsrPrerenderMode
        ? spaWithPrerenderOptions
        : undefined) satisfies SpaOptions | undefined,
      prerender: (useSsrPrerenderMode
        ? regularPrerenderOptions
        : undefined) satisfies RegularPrerenderOptions | undefined,
    }),
    viteReact(),
  ],

  // Prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 3000,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 3001,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
