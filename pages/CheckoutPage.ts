import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private firstTextInput: Locator;
  private secondTextInput: Locator;
  private selectCountryInput: Locator;
  private dropdownOptions: Locator;
  private placeOrderButton: Locator;
  private creditCardInput: Locator; // Locator for credit card input
  private emailInput: Locator; // Locator for email input
  private expiryMonth: Locator;
  private expiryDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstTextInput = page.locator('input[type="text"]').nth(1); // Replace with actual selector
    this.secondTextInput = page.locator('input[type="text"]').nth(2); // Replace with actual selector
    this.selectCountryInput = page.getByPlaceholder('Select Country');
    ; // Replace with actual selector
    this.dropdownOptions = page.locator('section.ta-results.list-group button.ta-item'); // Targets dropdown options
    this.placeOrderButton = page.locator('.btnn.action__submit.ng-star-inserted')
      ; // Replace with actual selector
    this.creditCardInput = page.locator('input[type="text"]').first(); // Credit card input field
    this.emailInput = page.locator('input[type="text"]').nth(4); // Email input field
    this.expiryMonth = page.getByRole('combobox').first();
    this.expiryDate = page.getByRole('combobox').nth(1);
  }

  // Method to assert pre-filled email
  async assertPreFilledEmail(expectedEmail: string) {
    // Ensure the email input is visible

    await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });

    // Get the email input value
    const emailValue = await this.emailInput.inputValue();

    // Assert that the email matches the expected value
    expect(emailValue).toBe(expectedEmail);
  }

  // Method to assert credit card number
  async assertCreditCardNumber(expectedCardNumber: string) {
    // Ensure the credit card input is visible
    await this.creditCardInput.waitFor({ state: 'visible', timeout: 30000 });

    // Get the credit card input value
    const cardNumberValue = await this.creditCardInput.inputValue();

    // Assert that the credit card number matches the expected value
    expect(cardNumberValue).toBe(expectedCardNumber);
  }
  async fillCheckoutDetails(cvv: string, cardName: string, country: string) {
    // Fill CVV and cardholder name
    await this.firstTextInput.fill(cvv);
    await this.secondTextInput.fill(cardName);

    // Select the country from dropdown
    await this.selectCountryFromDropdown(country);

    // Submit the form
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await expect(this.placeOrderButton).toBeVisible();
    await this.placeOrderButton.click();

     // Return the selected country for assertion
    return country;
  }

  private async selectCountryFromDropdown(country: string) {
    // Focus on the input field
    await this.selectCountryInput.fill('');

    // Type the country name
    await this.selectCountryInput.type(country, { delay: 100 });

    // Wait for dropdown options to be visible
    await expect(this.dropdownOptions.first()).toBeVisible();

    // Filter and select the desired country
    const countryOption = this.dropdownOptions.filter({ hasText: country });
    await expect(countryOption.first()).toBeVisible({ timeout: 5000 });
    await countryOption.first().click();
  }

  async selectExpiryMonthDate(month: string, date: string) {
    await this.expiryMonth.selectOption(month);
    await this.expiryDate.selectOption(date);
  }
}
