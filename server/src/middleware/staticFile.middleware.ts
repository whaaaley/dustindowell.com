import { type Context, type Next, send } from '@oak/oak'
import { extname } from '@std/path'

export const staticFileMiddleware = async (ctx: Context, next: Next) => {
  const { request } = ctx

  const path = request.url.pathname
  const ext = extname(path)

  if (typeof ext === 'string' && ext.length) {
    await send(ctx, path, { root: './dist' })
  } else {
    await next()
  }
}
