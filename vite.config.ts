import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "videoController",
      fileName: (format) => `plugin.${format}.js`
    },
    outDir: path.resolve(__dirname, "plugin"),
    emptyOutDir: true
  },

  // open the demo page in the server
  server: {
    open: "/test/demo.html"
  }
})
