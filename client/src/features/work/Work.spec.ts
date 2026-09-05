import { expect, test } from '@playwright/test'
import { useCleanPage } from '$test/utils/page.utils.ts'

test.describe('All Work Page Tests', () => {
  useCleanPage()

  test('index lists every product with a link, meta row, and tagline', async ({ page }) => {
    await page.goto('/work')
    const work = page.getByTestId('page-work')
    await expect(work.getByRole('heading', { level: 2, name: 'WORK' })).toBeVisible()
    await expect(work.getByRole('heading', { level: 3 }).getByRole('link')).toHaveCount(6)
    await expect(work.getByText('Platforms ✦ Sep 2022 - Jun 2025')).toBeVisible()
  })

  test('clicking a product opens its page with the header block and body', async ({ page }) => {
    await page.goto('/work')
    await page.getByTestId('page-work').getByRole('link', { name: 'COMPOSE' }).click()
    await expect(page).toHaveURL(/\/work\/compose\/?$/)
    const product = page.getByTestId('page-product')
    await expect(product.getByRole('heading', { level: 2, name: 'COMPOSE' })).toBeVisible()
    await expect(product.getByText('A/B testing platform with code and no-code tools and Shopify integration.')).toBeVisible()
    await expect(product.getByRole('heading', { level: 2, name: 'ABOUT' })).toBeVisible()
  })

  test('a product with screenshots renders the slider after ABOUT and responds to the next arrow', async ({ page }) => {
    await page.goto('/work/compose')
    const slider = page.getByTestId('page-product').getByRole('region', { name: '' })
    await expect(slider).toBeVisible()
    await expect(slider.getByText('1 / 9', { exact: false })).toBeVisible()
    await slider.getByRole('button', { name: 'Next image' }).click()
    await expect(slider.getByText('2 / 9', { exact: false })).toBeVisible()
  })

  test('a product without screenshots renders no slider', async ({ page }) => {
    await page.goto('/work/symetra')
    const product = page.getByTestId('page-product')
    await expect(product.getByRole('heading', { level: 2, name: 'SYMETRA' })).toBeVisible()
    await expect(product.getByRole('region')).toHaveCount(0)
  })

  test('an unknown slug shows the not-found page', async ({ page }) => {
    await page.goto('/work/does-not-exist')
    await expect(page.getByTestId('page-not-found').getByRole('heading', { level: 2, name: 'PAGE NOT FOUND' })).toBeVisible()
  })

  test('Tab reaches the next arrow and ArrowRight advances the slider', async ({ page }) => {
    await page.goto('/work/compose')
    const slider = page.getByTestId('page-product').getByRole('region')
    const next = slider.getByRole('button', { name: 'Next image' })
    await next.focus()
    await expect(next).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect(slider.getByText('2 / 9', { exact: false })).toBeVisible()
  })
})
