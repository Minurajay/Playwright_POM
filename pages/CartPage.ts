import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  private checkoutButton: Locator;
  private removeButton: Locator;
  private buyNowButton: Locator;
  private productName: Locator;
  private productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
    this.removeButton = page.locator(".btn.btn-danger"); // Locator for the Remove button
    this.buyNowButton = page.locator("//button[normalize-space()='Buy Now']"); // Locator for the Buy Now button
    // this.productName = page.getByRole('heading', { name: 'IPHONE 13 PRO' }); // Locator for the product name in the cart
    // this.productPrice = page.getByText('$ 231500', { exact: true }); // Locator for the product price in the cart
    this.productName = page.locator("div[class='cartSection'] h3").first()

    this.productPrice = page.locator("div[class='prodTotal cartSection'] p").first(); // Generic locator for the product price in the cart

  }

  async clickCheckout() {
    await expect(async () => {
      await this.checkoutButton.waitFor({ state: 'visible', timeout: 20000 });
      await this.checkoutButton.click();
    }).toPass({
      intervals: [1_000, 2_000, 3_000, 5_000],
      timeout: 30_000,
    });
  }

  async assertRemoveButtonEnabled() {
    await expect(this.removeButton).toBeVisible({ timeout: 10000 }); // Ensure Remove button is visible
    await expect(this.removeButton).toBeEnabled(); // Ensure Remove button is enabled
  }

  async assertBuyNowButtonEnabled() {
    await expect(this.buyNowButton).toBeVisible({ timeout: 10000 }); // Ensure Buy Now button is visible
    await expect(this.buyNowButton).toBeEnabled(); // Ensure Buy Now button is enabled
  }

  // Method to retrieve product name and price with explicit wait
  async assertProductDetails(expectedName: string, expectedPrice: string): Promise<void> {
    // Wait for product details to be visible
    await this.productName.waitFor({ state: 'visible', timeout: 30000 });
    await this.productPrice.waitFor({ state: 'visible', timeout: 30000 });

    const actualName = (await this.productName.textContent())?.trim() || '';
    const actualPrice = (await this.productPrice.textContent())?.trim() || '';

    // Assertions
    expect(actualName).toBe(expectedName);
    expect(actualPrice).toBe(expectedPrice);
  }

}
