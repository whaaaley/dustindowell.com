import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  define: {
    STATIC: true, // Define STATIC as true for production
    PROD: true
  },
  resolve: {
    alias: {
      '~': resolve('./src'),
      '~website': resolve('./src/modules/website'),
      $: resolve('..'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: './notFound.html',
      output: {
        entryFileNames: 'notFound.js',
        inlineDynamicImports: true,
      },
    },
  },
})
