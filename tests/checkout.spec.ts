import { test } from '@playwright/test';
import { HomePage } from '../objects/pages/home';
import { CartPage } from '../objects/pages/cart';
import { OrderConfirmationPage } from '../objects/pages/order-confirmation';

test('user can complete a successful checkout', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);
  const orderConfirmation = new OrderConfirmationPage(page);

  await home.goto();
  await home.increaseNumberOfGuests(2);
  //TODO: Parameterise and randomise these dates.
  await home.selectDates('Wednesday, October 1,', 'Friday, October 10,');
  await home.search();
  await home.viewPricesForFirstListedRoom();
  await home.addFirstAvailableRateToCart();
  await home.proceedToCheckoutFromCartContentComponent();

  await cart.addYourDetails({
    title: 'Mr',
    firstName: 'Test',
    lastName: 'McTestface',
    email: 'test@test.com',
    mobile: '0406555555',
    addressLine: '116 Harrick Rd, Keilor Park VIC 3042, Australia',
  });

  await cart.addAdditionalDetails({
    gender: 'Male',
    phoneAh: '0406555555',
    resNote: 'This is a test res note.',
  });

  await cart.clickPay();
  await cart.fillCardDetails({
    cardNumber: '4111 1111 4555 1142',
    expiry: '03/30',
    cvv: '737',
    nameOnCard: 'Test McTestface',
  });

  await cart.clickPayNow();

  await orderConfirmation.assertLoaded();
  await orderConfirmation.assertGuestDetails('Test McTestface', 'test@test.com', '0406555555');
  //TODO: Parameterise and randomise these dates.
  await orderConfirmation.assertReservationDates('9 Nights', 'Wed 01 Oct 2025', 'Fri 10 Oct 2025');
  await orderConfirmation.assertPaymentSummaryContains('Card', 'Total Amount');
  await orderConfirmation.assertMaskedCard('Visa **** **** **** 1142');
  await orderConfirmation.assertPropertyInformationVisible();

  //Reload the page to test that the page information is persisted.
  await orderConfirmation.page.reload();
  
  await orderConfirmation.assertLoaded();
  await orderConfirmation.assertGuestDetails('Test McTestface', 'test@test.com', '0406555555');
  //TODO: Parameterise and randomise these dates.
  await orderConfirmation.assertReservationDates('9 Nights', 'Wed 01 Oct 2025', 'Fri 10 Oct 2025');
  await orderConfirmation.assertPaymentSummaryContains('Card', 'Total Amount');
  await orderConfirmation.assertMaskedCard('Visa **** **** **** 1142');
  await orderConfirmation.assertPropertyInformationVisible();
});