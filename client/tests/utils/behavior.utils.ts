import { expect, type Locator, type Page } from '@playwright/test'

export const fixture = (page: Page, id: string): Locator => (
  page.getByTestId(id)
)

export const stateOf = async (region: Locator): Promise<Record<string, unknown>> => {
  const box = region.getByTestId('state-box')
  await box.waitFor({ state: 'visible' })
  const text = await box.innerText()
  return JSON.parse(text)
}

// Polls, since a state box re-renders a tick after the interaction that changed it.
export const expectState = async (region: Locator, expected: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(expected)) {
    await expect.poll(async () => (await stateOf(region))[key]).toEqual(value)
  }
}
