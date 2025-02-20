import { expect, Locator, Page } from '@playwright/test';

export class OrderConfirmPage {
  private page: Page;
  private orderHistoryButton: Locator;
  private confirmationHeader: Locator; // Locator for the confirmation header
  private orderIdLabel: Locator; // Locator for the Order ID


  constructor(page: Page) {
    this.page = page;
    this.orderHistoryButton = page.locator('label:has-text("Orders History Page")') // Adjust the selector if needed
    this.confirmationHeader = page.locator("//h1[normalize-space()='Thankyou for the order.']"); // Locator for the confirmation header
    this.orderIdLabel = page.locator("label[class='ng-star-inserted']"); // Locator for the Order ID
  }

  async clickOrderHistoryButton() {
    await this.orderHistoryButton.waitFor({ state: 'visible' });
    await this.orderHistoryButton.click();
  }
  // Assert the confirmation header text directly in the OrderConfirmPage
  async assertConfirmationHeader() {
    // Wait for the confirmation header to be visible
    await this.confirmationHeader.waitFor({ state: 'visible', timeout: 5000 });

    // Get the text of the header
    const headerText = await this.confirmationHeader.textContent();

    // Assert that the header text matches the expected value
    expect(headerText?.trim()).toBe('Thankyou for the order.');
  }

  // Extract and return the Order ID displayed on the page
  async getOrderId(): Promise<string> {
    // Wait for the Order ID label to be visible
    await this.orderIdLabel.waitFor({ state: 'visible', timeout: 5000 });

    // Get the text content of the label
    const orderIdText = await this.orderIdLabel.textContent();

    // Trim and return the Order ID
    return orderIdText?.trim() || '';
  }
}
