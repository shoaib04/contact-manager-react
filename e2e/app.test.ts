import { expect, test } from '@playwright/test'

test('serves the application at the root path', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#root > *').first()).toBeVisible()
})

test('serves the SPA entry for a direct nested path', async ({ page }) => {
  await page.goto('/__foundation-smoke__')
  await expect(page.locator('#root > *').first()).toBeVisible()
})
