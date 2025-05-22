import { getLogger } from '@logtape/logtape'
import { Application, Router } from '@oak/oak'
import { env } from './src/env.ts'
import './src/logging.ts'
import * as m from './src/middleware.ts'

const app = new Application()
const oakRouter = new Router()

const log = getLogger(['app'])

app.use(m.corsMiddleware)
app.use(oakRouter.routes())
app.use(m.staticFileMiddleware)
app.use(m.spaRoutingMiddleware)

log.info('Server is running on port {port}', { port: env.PORT })
app.listen({ port: parseInt(env.PORT, 10) })
