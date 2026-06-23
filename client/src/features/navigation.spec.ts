import { expect, test } from '@playwright/test'
import { clickNav, failOnPageError, isLightTheme, navLink, themeToggle } from '~/utils/siteSpec.utils'

// Smoke coverage for the site's global chrome: top-nav routing and the theme toggle.
// These catch the cross-page state bugs that visibility-only checks miss.

test.describe('All Navigation Tests', () => {
  test.beforeEach(({ page }) => {
    failOnPageError(page)
  })

  test('the home page loads with the nav present', async ({ page }) => {
    // Arrange / Act
    await page.goto('/')

    // Assert
    await expect(navLink({ page, label: 'Home' })).toBeVisible()
    await expect(navLink({ page, label: 'Work' })).toBeVisible()
  })

  test('clicking Work navigates to the work section', async ({ page }) => {
    // Arrange
    await page.goto('/')

    // Act
    await clickNav({ page, label: 'Work' })

    // Assert
    await expect(page).toHaveURL(/\/work/)
  })

  test('clicking Blog navigates to the blog section', async ({ page }) => {
    // Arrange
    await page.goto('/')

    // Act
    await clickNav({ page, label: 'Blog' })

    // Assert
    await expect(page).toHaveURL(/\/blog/)
  })

  test('the theme toggle flips the document theme', async ({ page }) => {
    // Arrange
    await page.goto('/')
    const before = await isLightTheme(page)

    // Act
    await themeToggle(page).click()

    // Assert
    await expect(async () => {
      expect(await isLightTheme(page)).toBe(!before)
    }).toPass({ timeout: 2_000 })
  })
})
