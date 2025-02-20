import { expect, Locator, Page } from '@playwright/test';

export class OrderSummaryPage {
  private page: Page;
  private header: Locator;
  private deliveryEmail: Locator;
  private deliveryCountry: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.email-title'); // Locator for the "Order Summary" header using the CSS selector
    this.deliveryEmail = page.locator("//div[contains(@class, 'address')][div[contains(text(), 'Delivery Address')]]/p[1]"); // Using the xpath locator for email in delivery address
    this.deliveryCountry = page.locator("//div[contains(@class, 'address')][div[contains(text(), 'Delivery Address')]]/p[2]")
  }


  async validateHeader(): Promise<void> {
    // Assert that the header is visible on the page
    await expect(this.header).toBeVisible({ timeout: 5000 }); // Ensures the header is visible within a 5-second timeout

    // Optionally, validate the text of the header (case-insensitive)
    await expect(this.header).toHaveText(/order summary/i); // Checks that the header contains "Order Summary" (case-insensitive)
  }

  async assertDeliveryEmail(expectedEmail: string): Promise<void> {
    await expect(this.deliveryEmail).toContainText(expectedEmail, { timeout: 5000 });
  }

  async assertDeliveryCountry(expectedCountry: string): Promise<void> {
    await expect(this.deliveryCountry).toContainText(`Country - ${expectedCountry}`, { timeout: 5000 });
  }
}
