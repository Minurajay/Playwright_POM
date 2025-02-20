import { expect, Locator, Page } from '@playwright/test';

export class OrderHistoryPage {
  private page: Page;
  private viewButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewButton = page.getByRole('button', { name: 'View' }).first(); //Working try to do it in a different way
  }

  /**
   * Asserts that a specific Order ID is present in the order history table.
   * @param orderId - The Order ID to search for.
   */
  async assertOrderExists(orderId: string): Promise<void> {
    // Wait for the table rows to load
    await this.page.waitForSelector('tbody tr', { state: 'visible', timeout: 5000 });

    // Create a flexible locator for the Order ID (trim spaces and check without pipes if present)
    const orderIdLocator = this.page.locator(`tbody tr th`, {          //removes all | characters from the orderId and trims any extra spaces at the start or end, 
    hasText: orderId.replace(/\|/g, '').trim(),                         // leaving a clean version of the orderId to match the text in the DOM.
    });

    // Validate that the Order ID is present
    await expect(orderIdLocator).toBeVisible();
    // console.log(`Order ID "${orderId}" is present in the order history table.`);
  }

  async clickViewButton(): Promise<void> {
    await expect(this.viewButton).toBeVisible({ timeout: 10000 }); // Asserts that the "View" button is visible within a 10-second timeout.
    await expect(this.viewButton).toBeEnabled(); // Ensures the "View" button is enabled before attempting to click.

    await this.viewButton.click(); // Clicks the "View" button.
  }
}
