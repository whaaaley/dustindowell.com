import { expect, type Locator, test } from '@playwright/test'
import { expectState, fixture } from '$test/utils/behavior.utils.ts'

const PATH = '/playground'

const nextIn = (region: Locator) => region.getByRole('button', { name: 'Next image' })

test.describe('Slider behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PATH)
  })

  test('next arrow advances activeIndex', async ({ page }) => {
    const region = fixture(page, 'slider-size-md')
    await region.getByRole('button', { name: 'Next image' }).click()
    await expectState(region, { activeIndex: 1 })
  })

  test('previous arrow wraps from the first image to the last', async ({ page }) => {
    const region = fixture(page, 'slider-size-md')
    await region.getByRole('button', { name: 'Previous image' }).click()
    await expectState(region, { activeIndex: 4 })
  })

  test('clicking a thumbnail selects that image', async ({ page }) => {
    const region = fixture(page, 'slider-size-lg')
    await region.getByRole('button', { name: 'Show image 4' }).click()
    await expectState(region, { activeIndex: 3 })
  })

  test('no thumbnails: arrows still move through the images', async ({ page }) => {
    const region = fixture(page, 'slider-bare')
    await expect(region.getByRole('button', { name: /Show image/ })).toHaveCount(0)
    await region.getByRole('button', { name: 'Next image' }).click()
    await expectState(region, { activeIndex: 1 })
  })

  test('pre-seeded: hydrated activeIndex marks the matching thumbnail on first paint', async ({ page }) => {
    const region = fixture(page, 'slider-preseeded')
    await expectState(region, { activeIndex: 2 })
    await expect(region.getByRole('button', { name: 'Show image 3' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('Tab traversal: the next arrow takes focus, Shift+Tab releases it', async ({ page }) => {
    const region = fixture(page, 'slider-keyboard')
    const next = nextIn(region)
    await next.focus()
    await expect(next).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(next).not.toBeFocused()
  })

  test('ArrowRight on a focused control advances, ArrowLeft wraps back to the last', async ({ page }) => {
    const region = fixture(page, 'slider-keyboard')
    await nextIn(region).focus()
    await page.keyboard.press('ArrowRight')
    await expectState(region, { activeIndex: 1 })
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await expectState(region, { activeIndex: 4 })
  })
})
