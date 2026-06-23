import { expect, test } from '@playwright/test'
import { demoFrame, expectFrameSrc, failOnPageError, sidebarItem, viewTab } from '~/utils/siteSpec.utils'

// Smoke coverage for the demos section.
// Verifies a demo page renders, the sidebar pages between demos, and view tabs swap the iframe src.

const NOTES_PATH = '/work/demos/onclick-notes'

test.describe('All Demos Tests', () => {
  test.beforeEach(({ page }) => {
    failOnPageError(page)
  })

  test('a demo page renders its preview iframe', async ({ page }) => {
    // Arrange / Act
    await page.goto(NOTES_PATH)

    // Assert
    await expect(demoFrame(page)).toBeVisible()
  })

  test('the demos sidebar navigates between demos', async ({ page }) => {
    // Arrange
    await page.goto(NOTES_PATH)

    // Act
    await sidebarItem({ page, id: 'demo-clickmart' }).click()

    // Assert
    await expect(page).toHaveURL(/\/work\/demos\/clickmart/)
  })

  test('view tabs swap the previewed source', async ({ page }) => {
    // Arrange
    await page.goto(NOTES_PATH)
    await expectFrameSrc({ page, src: /\/onclick-notes\/editor/ })

    // Act
    await viewTab({ page, label: 'Home' }).click()

    // Assert
    await expectFrameSrc({ page, src: /\/onclick-notes\/$/ })
  })
})
