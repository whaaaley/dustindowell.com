import { expect, test } from '@playwright/test'
import { useCleanPage } from '$test/utils/page.utils.ts'

test.describe('All Licenses Page Tests', () => {
  useCleanPage()

  test('index lists every package as a link with its version and license', async ({ page }) => {
    await page.goto('/licenses')
    const licenses = page.getByTestId('page-licenses')
    await expect(licenses.getByRole('heading', { level: 2, name: 'LICENSES' })).toBeVisible()
    await expect(licenses.getByRole('heading', { level: 3, name: 'vue', exact: true })).toBeVisible()
    await expect(licenses.getByRole('link', { name: 'vue', exact: true })).toHaveAttribute('href', '/licenses/vue')
  })

  test('clicking a package opens its notice page with the license text', async ({ page }) => {
    await page.goto('/licenses')
    await page.getByTestId('page-licenses').getByRole('link', { name: 'vue', exact: true }).click()
    await expect(page).toHaveURL(/\/licenses\/vue\/?$/)
    const license = page.getByTestId('page-license')
    await expect(license.getByRole('heading', { level: 2, name: 'VUE' })).toBeVisible()
    await expect(license.locator('pre')).toBeVisible()
    await license.getByRole('link', { name: 'All licenses' }).click()
    await expect(page).toHaveURL(/\/licenses\/?$/)
  })

  test('an unknown package slug shows the not-found page', async ({ page }) => {
    await page.goto('/licenses/not-a-package')
    await expect(page.getByTestId('page-not-found')).toBeVisible()
  })

  test('the footer link reaches the index from the resume', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('site-footer').getByRole('link', { name: 'Third-Party Licenses' }).click()
    await expect(page).toHaveURL(/\/licenses\/?$/)
    await expect(page.getByTestId('page-licenses')).toBeVisible()
  })
})
