import { test } from '../../utils/fixtures'; // Import the fixture
import testDataSets from '../../data/testData.json';

test.describe('End-to-End Test', () => {
  for (const testData of testDataSets) {
    test(`Testing for ${testData.login.email}`, async ({
      page, loginPage, searchPage, viewPage, cartPage,
      checkoutPage, orderConfirmPage, orderHistoryPage, orderSummaryPage
    }) => {

      await test.step('Login', async () => {
        await loginPage.gotoLoginPage();
        await loginPage.login(testData.login.email, testData.login.password);
      });

      await test.step('Search and view product', async () => {
        await searchPage.searchForProduct(testData.search.product);
        await searchPage.viewProduct();
      });

      await test.step('Add viewed product to cart', async () => {
        const viewProductDetails = await viewPage.getProductDetails();
        await viewPage.addProductToCart();
        await viewPage.viewCart();
        await cartPage.assertProductDetails(viewProductDetails.name, viewProductDetails.price);
      });

      await test.step('Checkout from cart', async () => {
        await cartPage.assertBuyNowButtonEnabled();
        await cartPage.assertRemoveButtonEnabled();
        await cartPage.clickCheckout();
      });

      await test.step('Enter details and place the order', async () => {
        await checkoutPage.assertPreFilledEmail(testData.login.email);
        await checkoutPage.assertCreditCardNumber(testData.checkout.creditCardNumber);
        await checkoutPage.selectExpiryMonthDate(testData.checkout.expiryMonth, testData.checkout.expiryDate);
        await checkoutPage.fillCheckoutDetails(
          testData.checkout.cvv,
          testData.checkout.name,
          testData.checkout.country
        );
      });

      await test.step('Confirm order and go to order history', async () => {
        await orderConfirmPage.assertConfirmationHeader();
        const orderId = await orderConfirmPage.getOrderId();
        await orderConfirmPage.clickOrderHistoryButton();
        await orderHistoryPage.assertOrderExists(orderId);
        await orderHistoryPage.clickViewButton();
      });

      await test.step('Verify order details in order summary', async () => {
        await orderSummaryPage.validateHeader();
        await orderSummaryPage.assertDeliveryEmail(testData.login.email);
        await orderSummaryPage.assertDeliveryCountry(testData.checkout.country);
      });
    });
  }
});
