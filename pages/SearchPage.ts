import { type Locator, type Page, expect } from '@playwright/test';

export class SearchPage {
  private page: Page;
  private searchTextbox: Locator;
  private productCardViewButton: Locator;
  private searchResult: Locator;
  private productName: Locator;
  private productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTextbox = page.getByRole('textbox', { name: 'search' });
    this.productCardViewButton = page.locator('text=View').first();
    this.searchResult = page.locator('.product-name'); 
    this.productName = page.locator('.product-title').first(); // Locator for the product name in search results
    this.productPrice = page.locator('.product-price').first(); // Locator for the product price in search results
  }

  // Assertion to verify you're on the Home page
  async assertOnHomePage() {
    const homeElement = this.page.locator("p[_ngcontent-jok-c34='']:text('Home')");
    await expect(homeElement).toBeVisible({ timeout: 5000 }); // Assert the Home text is visible
  }

  // Assertion to check that 6 product images are displayed on the page
  async assertSixProductImages() {    //pass the count and the parameter
    const productImages = this.page.locator('img'); // Assuming all product images have <img> tags
    const count = await productImages.count();
    expect(count).toBe(6); // Ensure there are exactly 6 images
  }

  // Assertion to validate that the searched product appears in the results
  async assertSearchedProductInResults(productName: string) {
    const productNameLocator = this.page.locator(`text=${productName}`); // Check if the product name appears in the results
    await expect(productNameLocator).toBeVisible({ timeout: 5000 }); // Assert that the product name is visible in the results
  }

  // Method to get product details from the search result (name and price)
  async getProductDetails() {
    const name = await this.productName.textContent();
    const price = await this.productPrice.textContent();
    return { name: name?.trim(), price: price?.trim() }; // Return product name and price for use in ViewPage
  }

  async searchForProduct(productName: string) {
    await this.searchTextbox.click();
    await this.searchTextbox.fill(productName);
    await this.searchTextbox.press('Enter');
  }

  async viewProduct() {
    await expect(async () => {
      await this.productCardViewButton.waitFor({ state: 'visible', timeout: 20000 });
      await this.productCardViewButton.click();
    }).toPass({
      intervals: [1_000, 2_000, 3_000, 5_000],
      timeout: 30_000,
    });
  }
    // await expect(this.productCardViewButton).toBeVisible({ timeout: 10000 });
    
  }

