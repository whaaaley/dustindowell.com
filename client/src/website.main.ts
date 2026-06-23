import { ViteSSG } from 'vite-ssg'
import { RouterView } from 'vue-router'
import { ensureArticlesLoaded, loadArticles } from './hooks/useArticles'
import websiteRoutes from './website.routes.ts'

import './gtag.ts'

export const createApp = ViteSSG(RouterView, {
  routes: [
    ...websiteRoutes,
    {
      name: 'not-found',
      path: '/:catchAll(.*)',
      component: () => import('./features/notFound/NotFound.page.tsx'),
    },
  ],
  scrollBehavior: (_to, _from, savedPosition) => {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
}, async () => {
  // Load articles eagerly so they're available when blog pages render
  await ensureArticlesLoaded()
})

// This function is called by ViteSSG to generate static routes during build
// time. It returns an array of paths that will be pre-rendered as HTML files.
export const includedRoutes = async () => {
  const articles = await loadArticles()
  const { projects } = await import('./features/work/projects.ts')
  const { packages } = await import('./features/openSource/packages.ts')
  const { demoLinks } = await import('./features/demos/demoLinks.ts')
  const { personalProjects } = await import('./features/personal/personal.ts')

  const staticRoutes = [
    '/',
    '/work',
    '/work/open-source',
    '/blog',
    '/work/demos',
    '/work/personal',
    '/resume',
    '/not-found',
  ]

  const articleRoutes = articles.map(([slug]) => `/blog/${slug}`)
  const workRoutes = projects.map(project => `/work/${project.slug}`)
  const openSourceRoutes = packages.map(project => `/work/open-source/${project.slug}`)
  const demoRoutes = demoLinks.map(demo => `/work/demos/${demo.route.replace('demo-', '')}`)
  const personalRoutes = personalProjects.map(project => `/work/personal/${project.slug}`)

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...workRoutes,
    ...openSourceRoutes,
    ...demoRoutes,
    ...personalRoutes,
  ]
}
