import { expect, type Locator, type Page } from '@playwright/test'; //type Locator: Represents a specific element on the page that you can interact with (like input fields, buttons, etc.).
                                                                    // type Page: Represents a browser tab or a webpage that Playwright interacts with.

export class LoginPage {
  private page: Page;
  private usernameTextbox: Locator;
  private passwordTextbox: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextbox = page.getByPlaceholder('email@example.com'); 
    this.passwordTextbox = page.getByPlaceholder('enter your passsword');
    this.loginButton = page.getByRole('button', { name: 'Login' }); 
  }

  async gotoLoginPage(){
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async login(username: string, password: string){
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }
}
