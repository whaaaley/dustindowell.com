import { expect, test } from '@playwright/test'
import { useCleanPage } from '$test/utils/page.utils.ts'

test.describe('All Licenses Page Tests', () => {
  useCleanPage()

  test('lists third-party packages with their license text', async ({ page }) => {
    await page.goto('/licenses')
    const licenses = page.getByTestId('page-licenses')
    await expect(licenses.getByRole('heading', { level: 2, name: 'LICENSES' })).toBeVisible()
    await expect(licenses.getByRole('heading', { level: 3 }).first()).toBeVisible()
    await expect(licenses.locator('pre').first()).toBeVisible()
  })

  test('the footer link reaches the page from the resume', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('site-footer').getByRole('link', { name: 'Third-party licenses' }).click()
    await expect(page).toHaveURL(/\/licenses\/?$/)
    await expect(page.getByTestId('page-licenses')).toBeVisible()
  })
})
