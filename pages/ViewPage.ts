import { type Locator, type Page, expect } from '@playwright/test';

export class ViewPage {
  private page: Page;
  private addToCartButton: Locator;
  private cartButton: Locator;
  private cartCount: Locator;
  private productName: Locator;
  private productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator(".btn.btn-primary");
    this.cartButton = page.getByRole('button', { name: '   Cart' });
    this.cartCount = page.locator("button[class='btn btn-custom'] label");
    // this.productName = page.getByRole('heading', { name: 'IPHONE 13 PRO' }) // Locator for the product name
    // this.productPrice = page.getByRole('heading', { name: '$' }); // Locator for the product price
    this.productName = page.locator("div[class='col-lg-6 rtl-text'] div h2")
    this.productPrice = page.locator("div[class='col-lg-6 rtl-text'] div h3");
  }

  // await this.addToCartButton.waitFor({ state: 'visible' });
  // await this.page.waitForTimeout(1000);

  // Method to add the product to the cart
  async addProductToCart() {
    await expect(async () => {
      await this.addToCartButton.waitFor({ state: 'visible' });
      await this.addToCartButton.click();
      await expect(this.cartCount).toHaveText(/^\d+$/, { timeout: 1000 }); // Assertion to check whether the cart count is updated
    }).toPass({
      intervals: [500, 1_000, 2_000, 3_000], // Retry at increasing intervals
      timeout: 10_000 // Overall timeout of 10 seconds
    });
  }

  // Method to view the cart
  async viewCart() {
    await this.cartButton.click();
  }

  // Method to retrieve product name and price
  async getProductDetails(): Promise<{ name: string; price: string }> {
    await this.productName.waitFor({ state: 'visible', timeout: 30000 });
    await this.productPrice.waitFor({ state: 'visible', timeout: 30000 });
    const name = await this.productName.textContent();
    const price = await this.productPrice.textContent();

    return {
      name: name?.trim() || '',       //ensures that the method trim() is called 
      price: price?.trim() || '',     // only if name or price is not null or undefined.

    };
  }
}
