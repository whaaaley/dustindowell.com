import { copyFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import generateSitemap from 'vite-ssg-sitemap'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// License notices are reachable from the footer but have no reason to be crawled.
const licensePaths = () => ['/licenses', ...readdirSync(resolve('./dist/licenses'), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `/licenses/${entry.name}`)]

// Workers Static Assets looks for /404.html, while vite-ssg writes the not-found route to a nested directory.
const writeNotFoundPage = () => {
  copyFileSync(resolve('./dist/not-found/index.html'), resolve('./dist/404.html'))
}

export default defineConfig(() => ({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': resolve('./src'),
    },
  },
  server: {
    port: 5180,
    strictPort: true,
  },
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'minify',
    onFinished () {
      writeNotFoundPage()
      generateSitemap({
        hostname: 'https://dustindowell.com/',
        exclude: ['/404', '/not-found', '/playground', '/banner', '/home', ...licensePaths()],
      })
    },
  },
}))
