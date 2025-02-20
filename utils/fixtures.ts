import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { SearchPage } from '../pages/SearchPage';
import { ViewPage } from '../pages/ViewPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmPage } from '../pages/OrderConfirmPage';
import { OrderHistoryPage } from '../pages/OrderHistoryPage';
import { OrderSummaryPage } from '../pages/OrderSummaryPage';

type MyFixtures = {
  loginPage: LoginPage;
  searchPage: SearchPage;
  viewPage: ViewPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmPage: OrderConfirmPage;
  orderHistoryPage: OrderHistoryPage;
  orderSummaryPage: OrderSummaryPage;
};

// Extending Playwright's test function
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  searchPage: async ({ page }, use) => { await use(new SearchPage(page)); },
  viewPage: async ({ page }, use) => { await use(new ViewPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  orderConfirmPage: async ({ page }, use) => { await use(new OrderConfirmPage(page)); },
  orderHistoryPage: async ({ page }, use) => { await use(new OrderHistoryPage(page)); },
  orderSummaryPage: async ({ page }, use) => { await use(new OrderSummaryPage(page)); },
});

