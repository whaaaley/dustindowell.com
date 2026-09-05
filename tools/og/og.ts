import { chromium } from '@playwright/test'
import { z } from 'zod'
import { safeAsync } from '$common/safe.ts'
import { loadConfigSlice } from '../utils/config.utils.ts'

// Screenshots the /banner page of a running site into the social preview image.
const configSchema = z.object({
  baseUrl: z.string().default('http://localhost:8787'),
  output: z.string().default('../client/public/og-home.png'),
})

const config = await loadConfigSlice({ key: 'og', schema: configSchema })
const baseUrl = Deno.env.get('OG_BASE_URL') ?? config.baseUrl

const capture = async (): Promise<void> => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(`${baseUrl}/banner`)
  const banner = page.getByTestId('page-banner')
  await banner.waitFor()
  await page.evaluate('document.fonts.ready')
  await banner.screenshot({ path: config.output })
  await browser.close()
}

const { error } = await safeAsync(capture)
if (error) {
  console.error(`Could not capture the banner from ${baseUrl}: ${error.message}`)
  Deno.exit(1)
}
console.log(`wrote ${config.output}`)
