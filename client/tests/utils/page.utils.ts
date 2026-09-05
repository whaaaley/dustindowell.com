import { type Page, test } from '@playwright/test'

// Fail any test that lets an uncaught exception reach the page.
export const failOnPageError = (page: Page) => {
  page.on('pageerror', (error) => {
    throw new Error(`Uncaught page error: ${error.message}`)
  })
}

export const useCleanPage = () => {
  test.beforeEach(({ page }) => {
    failOnPageError(page)
  })
}
