import { expect, test } from '@playwright/test'
import { useCleanPage } from '$test/utils/page.utils.ts'

test.describe('All Not Found Page Tests', () => {
  useCleanPage()

  test('an unknown URL renders the not-found page with a noindex robots tag', async ({ page }) => {
    await page.goto('/nothing-here')
    await expect(page.getByTestId('page-not-found').getByRole('heading', { level: 2, name: 'PAGE NOT FOUND' })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  test('links lead back to the resume and the work index', async ({ page }) => {
    await page.goto('/nothing-here')
    const notFound = page.getByTestId('page-not-found')
    await expect(notFound.getByRole('link', { name: 'Back to the resume' })).toHaveAttribute('href', '/')
    await notFound.getByRole('link', { name: 'See the work' }).click()
    await expect(page).toHaveURL(/\/work\/?$/)
  })
})
