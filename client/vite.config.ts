import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { routes } from '../server/shared/routeConfig.ts'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const createViteProxyConfig = (baseUrl: string) => {
  return Object.fromEntries(
    routes.map(route => [route.path, {
      target: baseUrl,
      changeOrigin: true,
      rewrite: () => route.entrypoint,
    }]),
  )
}

export default defineConfig(() => {
  return {
    server: {
      port: 5001,
      proxy: createViteProxyConfig('http://localhost:5001'),
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    define: {
      STATIC: false, // Define STATIC as false for development
      PROD: process.env.NODE_ENV === 'production'
    },
    resolve: {
      alias: {
        '~': resolve('./src'),
        '~website': resolve('./src/modules/website'),
        $: resolve('..'),
      },
    },
  }
})
