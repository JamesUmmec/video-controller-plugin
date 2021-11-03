import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import {viteSingleFile} from "vite-plugin-singlefile"
import copy from "rollup-plugin-copy"
import path from "path"

/**
 * Only the plugin can build in library mode.
 * Just use the demo page in dev mode as a demo in vite server.
 */
export default defineConfig(({command, mode}) => {
  /** Open different root path for viewing raw demo page or testing the plugin. */
  let rootPagePath = ""
  let copyConfig = {
    src: "",
    dest: "plugin",
    rename: "manifest.json"
  }

  // for dev
  if(mode === "raw") {
    rootPagePath = "/test/raw.html"
  } else if (mode === "plugin") {
    rootPagePath = "/test/plugin.html"
  }

  // for build
  if(mode === "firefox") {
    copyConfig.src = "scripts/manifest.firefox.json"
  } else if (mode === "chrome") {
    copyConfig.src = "scripts/manifest.chrome.json"
  }

  return {
    plugins: [
        vue(),
        viteSingleFile(),
        copy({targets: [copyConfig]})
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/main.ts"),
        name: "videoController",
        // fileName: (format) => `plugin.${format}.js`
      },
      outDir: path.resolve(__dirname, "plugin"),
      emptyOutDir: false,
      target: "es6",
      rollupOptions: {
        inlineDynamicImports: true,
        output: {
          manualChunks: () => "everything.js",
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    },
    server: {
      open: rootPagePath
    }
  }
})
