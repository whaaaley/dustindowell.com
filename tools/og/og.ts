import { chromium } from '@playwright/test'
import { safeAsync } from '$common/safe.ts'

const baseUrl = Deno.env.get('OG_BASE_URL') ?? 'http://localhost:5180'
const outputPath = 'public/og-home.png'

const capture = async (): Promise<void> => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(`${baseUrl}/banner`)
  const banner = page.getByTestId('page-banner')
  await banner.waitFor()
  await page.evaluate(() => document.fonts.ready)
  await banner.screenshot({ path: outputPath })
  await browser.close()
}

const { error } = await safeAsync(capture)
if (error) {
  console.error(`Could not capture the banner from ${baseUrl}: ${error.message}`)
  Deno.exit(1)
}
console.log(`wrote ${outputPath}`)
