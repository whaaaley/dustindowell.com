import { chromium } from '@playwright/test'
import { z } from 'zod'
import { safeAsync } from '$common/safe.ts'
import { loadConfigSlice } from '../utils/config.utils.ts'

// Captures product screenshots from a running app into a PNG per configured page.
// Usage: deno task screenshots <product> [page-name ...]
const pageSchema = z.object({
  name: z.string(),
  path: z.string(),
})

const productSchema = z.object({
  baseUrl: z.string(),
  storageState: z.string().optional(),
  output: z.string(),
  pages: z.array(pageSchema),
})

const configSchema = z.object({
  width: z.number().default(1366),
  height: z.number().default(1024),
  colorScheme: z.enum(['light', 'dark']).default('dark'),
  products: z.record(z.string(), productSchema).default({}),
})

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
    storageState: product.storageState,
    ignoreHTTPSErrors: true,
    colorScheme: config.colorScheme,
    viewport: { width: config.width, height: config.height },
  })
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
