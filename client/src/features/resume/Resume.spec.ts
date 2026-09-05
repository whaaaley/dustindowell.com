import { expect, test } from '@playwright/test'
import { useCleanPage } from '$test/utils/page.utils.ts'

const PATH = '/'

test.describe('All Resume Page Tests', () => {
  useCleanPage()

  test.beforeEach(async ({ page }) => {
    await page.goto(PATH)
  })

  test('header shows the name, title, and location with hidden contact details', async ({ page }) => {
    const header = page.getByTestId('site-header')
    await expect(header.getByRole('heading', { level: 1, name: 'Dustin Dowell' })).toBeVisible()
    await expect(header.getByText('SOFTWARE ENGINEER', { exact: true })).toBeVisible()
    await expect(header.getByText('Des Moines, Iowa')).toBeVisible()
    await expect(header.getByTestId('contact-email')).toHaveCount(0)
    expect(await page.content()).not.toContain('dustindowell22@gmail.com')
  })

  test('Show email reveals a mailto link and Show phone reveals a tel link', async ({ page }) => {
    const contact = page.getByTestId('site-contact')
    await contact.getByTestId('reveal-email').click()
    await expect(contact.getByTestId('contact-email')).toHaveAttribute('href', 'mailto:dustindowell22@gmail.com')
    await contact.getByTestId('reveal-phone').click()
    await expect(contact.getByTestId('contact-phone')).toHaveAttribute('href', 'tel:+15156895648')
    await expect(contact.getByTestId('contact-phone')).toHaveText('515-689-5648')
  })

  test('Space on a focused reveal button reveals the email', async ({ page }) => {
    const reveal = page.getByTestId('site-contact').getByTestId('reveal-email')
    await reveal.focus()
    await expect(reveal).toBeFocused()
    await page.keyboard.press(' ')
    await expect(page.getByTestId('site-contact').getByTestId('contact-email')).toBeVisible()
  })

  test('nav links to the resume, the work index, and the PDF', async ({ page }) => {
    const nav = page.getByTestId('site-nav')
    await expect(nav.getByRole('link', { name: 'Resume', exact: true })).toHaveAttribute('href', '/')
    await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work')
    await expect(nav.getByRole('link', { name: 'Download Resume' })).toHaveAttribute('href', '/dustin-dowell-resume.pdf')
    await expect(nav.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/whaaaley')
    await expect(nav.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/dustindowell')
  })

  test('footer links to the licenses page', async ({ page }) => {
    await expect(page.getByTestId('site-footer').getByRole('link', { name: 'Third-Party Licenses' })).toHaveAttribute('href', '/licenses')
  })

  test('renders every resume section in order', async ({ page }) => {
    await expect(page.getByTestId('page-resume').getByRole('heading', { level: 2 })).toHaveText(['PREAMBLE', 'EXPERIENCE', 'TECHNICAL', 'DESIGN', 'EDUCATION'])
  })

  test('lists the six jobs as linked titles with their company rows', async ({ page }) => {
    const resume = page.getByTestId('page-resume')
    await expect(resume.getByRole('heading', { level: 3 }).getByRole('link')).toHaveCount(6)
    await expect(resume.getByText('Symetra - Bellevue, Washington')).toBeVisible()
    await expect(resume.getByText('SevenVerbs - Urbandale, Iowa')).toBeVisible()
  })

  test('a job title link opens the matching work page and the name links back', async ({ page }) => {
    await page.getByTestId('page-resume').getByRole('link', { name: 'LEAD FRONTEND ENGINEER' }).click()
    await expect(page).toHaveURL(/\/work\/alqen\/?$/)
    await expect(page.getByTestId('page-product').getByRole('heading', { level: 2, name: 'ALQEN' })).toBeVisible()
    await page.getByTestId('site-header').getByRole('link', { name: 'Dustin Dowell' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByTestId('page-resume').getByRole('heading', { level: 2, name: 'PREAMBLE' })).toBeVisible()
  })

  test('Tab reaches the first job title link and Enter follows it', async ({ page }) => {
    const link = page.getByTestId('page-resume').getByRole('link', { name: 'SENIOR SOFTWARE ENGINEER II' })
    await link.focus()
    await expect(link).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/work\/symetra\/?$/)
  })
})
