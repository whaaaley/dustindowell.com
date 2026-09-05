import { chromium } from '@playwright/test'

const baseUrl = Deno.env.get('OG_BASE_URL') ?? 'http://localhost:5180'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(`${baseUrl}/banner`)
await page.getByTestId('page-banner').waitFor()
await page.evaluate(() => document.fonts.ready)
await page.getByTestId('page-banner').screenshot({ path: 'public/og-home.png' })
await browser.close()
console.log('wrote public/og-home.png')
