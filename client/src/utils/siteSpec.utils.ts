import { expect, type Locator, type Page } from '@playwright/test'
import { kebabCase } from 'change-case'

// Shared Playwright helpers for the personal site's e2e specs.
// Params are typed objects so call sites read as labelled arguments, matching the governance formSpec.utils conventions.

// Fail the test on any uncaught page exception during a flow.
// A thrown render error is invisible to visibility assertions but is the real symptom of a cross-page state bug.
export const failOnPageError = (page: Page): void => {
  page.on('pageerror', (error) => {
    throw new Error(`Uncaught page error: ${error.message}`)
  })
}

type NavLinkParams = {
  page: Page
  label: string
}

// Resolve a top-nav link by its label (the `nav-<kebab-label>` testid NavBar emits).
export const navLink = ({ page, label }: NavLinkParams): Locator => (
  page.getByTestId(`nav-${kebabCase(label)}`)
)

// Click a top-nav link and wait for the SPA route to settle.
export const clickNav = async ({ page, label }: NavLinkParams): Promise<void> => {
  await navLink({ page, label }).click()
}

// The light/dark theme toggle in the footer (the `theme-toggle` testid).
export const themeToggle = (page: Page): Locator => (
  page.getByTestId('theme-toggle')
)

// Read whether the document is in light mode; the site flips a `light` class on <html>.
export const isLightTheme = async (page: Page): Promise<boolean> => (
  page.evaluate(() => document.documentElement.classList.contains('light'))
)

type SidebarItemParams = {
  page: Page
  id: string
}

// Resolve a sidebar-detail list item by its slug id (the `sidebar-item-<id>` testid).
export const sidebarItem = ({ page, id }: SidebarItemParams): Locator => (
  page.getByTestId(`sidebar-item-${id}`)
)

type ViewTabParams = {
  page: Page
  label: string
}

// Resolve a demo page's view-switcher tab by label (the `view-tab-<kebab-label>` testid).
export const viewTab = ({ page, label }: ViewTabParams): Locator => (
  page.getByTestId(`view-tab-${kebabCase(label)}`)
)

// The embedded demo preview iframe (the `demo-frame` testid).
export const demoFrame = (page: Page): Locator => (
  page.getByTestId('demo-frame')
)

type ExpectFrameParams = {
  page: Page
  src: string | RegExp
}

// Assert the demo iframe is visible and points at the expected source.
// The iframe loads a cross-origin app, so we verify the src wiring rather than its inner content.
export const expectFrameSrc = async ({ page, src }: ExpectFrameParams): Promise<void> => {
  const frame = demoFrame(page)

  await expect(frame).toBeVisible()
  await expect(frame).toHaveAttribute('src', src)
}
