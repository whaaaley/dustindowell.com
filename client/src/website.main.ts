import { ViteSSG } from 'vite-ssg'
import { RouterView } from 'vue-router'
import { productPath, products } from './features/work/products.ts'
import websiteRoutes from './website.routes.ts'

export const createApp = ViteSSG(RouterView, {
  routes: websiteRoutes,
  scrollBehavior: (_to, _from, savedPosition) => {
    const reduceMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    return savedPosition || { top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }
  },
})

export const includedRoutes = () => [
  '/',
  '/licenses',
  '/work',
  ...products.map(productPath),
  '/playground',
  '/not-found',
]
