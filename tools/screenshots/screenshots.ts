import { type BrowserContext, chromium } from '@playwright/test'
import { z } from 'zod'
import { safeAsync } from '$common/safe.ts'
import { loadConfigSlice } from '../utils/config.utils.ts'

// Captures product screenshots from a running app into a PNG per configured page.
// A product may declare an account and seed calls; the account is created through the app's own
// tRPC procedures on first run, seeded once, and signed in on later runs.
// Usage: SCREENSHOTS_PASSWORD=... deno task screenshots <product> [page-name ...]
const pageSchema = z.object({
  name: z.string(),
  path: z.string(),
})

const callSchema = z.object({
  procedure: z.string(),
  input: z.record(z.string(), z.unknown()).default({}),
})

const accountSchema = z.object({
  email: z.string(),
  displayName: z.string(),
  timezone: z.string().default('America/Chicago'),
  collective: z.object({
    name: z.string(),
    description: z.string(),
    industry: z.string(),
  }),
  seed: z.array(callSchema).default([]),
})

const productSchema = z.object({
  baseUrl: z.string(),
  output: z.string(),
  pages: z.array(pageSchema),
  account: accountSchema.optional(),
})

const configSchema = z.object({
  width: z.number().default(1366),
  height: z.number().default(1024),
  colorScheme: z.enum(['light', 'dark']).default('dark'),
  products: z.record(z.string(), productSchema).default({}),
})

type Call = z.infer<typeof callSchema>
type Account = z.infer<typeof accountSchema>

const INSTANT_PREFIX = '@instant:'
const FUTURE_PREFIX = '@future:'
const futurePattern = /^(\d+)T(\d{2}):(\d{2})$/

// `@future:3T17:00` becomes an ISO instant three days from now at 17:00 UTC, so seeded events stay ahead of today on every run.
const resolveFuture = (payload: string): string => {
  const match = futurePattern.exec(payload)
  if (!match) {
    throw new Error(`Invalid @future payload "${payload}", expected <days>T<HH:MM>`)
  }
  const [, days, hours, minutes] = match
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + Number(days))
  date.setUTCHours(Number(hours), Number(minutes), 0, 0)
  return date.toISOString()
}

type Serialized = {
  json: Record<string, unknown>
  meta?: { values: Record<string, [['custom', 'Temporal.Instant']]> }
}

// Encodes the input the way superjson does for the project's Temporal.Instant codec, tagging every
// `@instant:` or `@future:` string so the server rebuilds it as an Instant.
const serializeInput = (input: Record<string, unknown>): Serialized => {
  const json: Record<string, unknown> = {}
  const values: Record<string, [['custom', 'Temporal.Instant']]> = {}
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string' && value.startsWith(INSTANT_PREFIX)) {
      json[key] = value.slice(INSTANT_PREFIX.length)
      values[key] = [['custom', 'Temporal.Instant']]
      continue
    }
    if (typeof value === 'string' && value.startsWith(FUTURE_PREFIX)) {
      json[key] = resolveFuture(value.slice(FUTURE_PREFIX.length))
      values[key] = [['custom', 'Temporal.Instant']]
      continue
    }
    json[key] = value
  }
  return Object.keys(values).length > 0 ? { json, meta: { values } } : { json }
}

type CallOptions = {
  context: BrowserContext
  baseUrl: string
  call: Call
}

const callProcedure = async (options: CallOptions): Promise<boolean> => {
  const { context, baseUrl, call } = options
  const response = await context.request.post(`${baseUrl}/proxy/trpc/${call.procedure}?batch=1`, {
    data: { 0: serializeInput(call.input) },
  })
  if (!response.ok()) {
    console.error(`${call.procedure} failed: ${response.status()} ${(await response.text()).slice(0, 200)}`)
  }
  return response.ok()
}

type SignInOptions = {
  context: BrowserContext
  baseUrl: string
  account: Account
}

// Signs in when the account exists, otherwise creates and seeds it. Seeding runs only on creation so re-runs never duplicate rows.
const signIn = async (options: SignInOptions): Promise<void> => {
  const { context, baseUrl, account } = options
  const password = Deno.env.get('SCREENSHOTS_PASSWORD')
  if (!password) {
    throw new Error('SCREENSHOTS_PASSWORD is not set')
  }

  const page = await context.newPage()
  await page.goto(`${baseUrl}/portal/login`, { waitUntil: 'networkidle' })

  const credentials = { email: account.email, password }
  const loggedIn = await callProcedure({ context, baseUrl, call: { procedure: 'portal.account.login', input: credentials } })
  if (loggedIn) {
    console.log(`signed in as ${account.email}`)
    await page.close()
    return
  }

  const setup: Call[] = [
    { procedure: 'portal.account.create', input: credentials },
    { procedure: 'portal.profile.create', input: { displayName: account.displayName, contactPhoneNumber: null, timezone: account.timezone } },
    { procedure: 'governance.collective.create', input: account.collective },
    { procedure: 'governance.dev.createFakeSubscription', input: {} },
    ...account.seed,
  ]
  for (const call of setup) {
    const ok = await callProcedure({ context, baseUrl, call })
    if (!ok) {
      throw new Error(`Account setup stopped at ${call.procedure}`)
    }
  }
  console.log(`created ${account.email} with ${account.seed.length} seed rows`)
  await page.close()
}

const config = await loadConfigSlice({ key: 'screenshots', schema: configSchema })
const [productName, ...pageNames] = Deno.args
const product = productName ? config.products[productName] : undefined

if (!product) {
  console.error(`Unknown product, expected one of: ${Object.keys(config.products).join(', ')}`)
  Deno.exit(1)
}

const pages = pageNames.length > 0 ? product.pages.filter(page => pageNames.includes(page.name)) : product.pages

const capture = async (): Promise<void> => {
  await Deno.mkdir(product.output, { recursive: true })
  const browser = await chromium.launch()
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    colorScheme: config.colorScheme,
    viewport: { width: config.width, height: config.height },
  })

  if (product.account) {
    await signIn({ context, baseUrl: product.baseUrl, account: product.account })
  }

  const page = await context.newPage()
  for (const [index, entry] of pages.entries()) {
    const file = `${product.output}/${String(index + 1).padStart(2, '0')}_${entry.name}.png`
    await page.goto(`${product.baseUrl}${entry.path}`, { waitUntil: 'networkidle' })
    await page.evaluate('document.fonts.ready')
    await page.waitForTimeout(1000)
    await page.screenshot({ path: file })
    console.log(`wrote ${file}`)
  }

  await browser.close()
}

const { error } = await safeAsync(capture)
if (error) {
  console.error(`Could not capture ${productName} from ${product.baseUrl}: ${error.message}`)
  Deno.exit(1)
}
