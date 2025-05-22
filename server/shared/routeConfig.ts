export type RouteConfig = typeof routes[number]
export type IgnoredPath = typeof ignoredPaths[number]

export const routes = [{
  name: 'index',
  path: '^/($|/.*)',
  entrypoint: '/index.html',
}] as const

export const ignoredPaths = ['.well-known', '.json', 'favicon']
