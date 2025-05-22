import { type Context, type Next, send } from '@oak/oak'
import { join } from '@std/path'
import { ignoredPaths, routes } from '../../shared/routeConfig.ts'

export const spaRoutingMiddleware = async (ctx: Context, next: Next) => {
  const path = ctx.request.url.pathname

  if (ignoredPaths.some((ignored) => path.includes(ignored))) {
    return next()
  }

  const route = routes.find((route) => new RegExp(route.path).test(path))
  const entrypoint = route ? route.entrypoint : '/notFound.html'

  if (!route) {
    ctx.response.status = 404
  }

  await send(ctx, entrypoint, { root: join(Deno.cwd(), './dist') })
}
