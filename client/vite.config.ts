import { fileURLToPath, URL } from 'node:url'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import generateSitemap from 'vite-ssg-sitemap'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export const createAliasConfig = () => ({
  '~': resolve('./src'),
})

export default defineConfig(({ command }) => ({
  server: {
    host: 'localhost',
  },
  plugins: [
    basicSsl(),
    vue(),
    vueJsx(),
    // Inline all JS and CSS into the HTML for the production build only.
    // Gated to `build` so the dev server keeps serving separate module scripts.
    ...(command === 'build' ? [viteSingleFile()] : []),
  ],
  resolve: {
    alias: createAliasConfig(),
  },
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'minify',
    onFinished () {
      generateSitemap({
        hostname: 'https://dustindowell.com/',
      })
    },
  },
}))
