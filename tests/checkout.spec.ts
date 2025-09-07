import { test } from "@playwright/test";
import { HomePage } from "../objects/pages/home";
import { CartPage } from "../objects/pages/cart";
import { OrderConfirmationPage } from "../objects/pages/order-confirmation";
import { validGuestDetails, additionalGuestDetails } from "../test-data/guest-data";
import { validCardDetails, expectedMaskedCard } from "../test-data/card-data";

//TODO: Clear bookings via API in after hook to prevent system from becoming booked out.
test("user can complete a successful checkout", async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);
  const orderConfirmation = new OrderConfirmationPage(page);

  await home.goto();
  await home.increaseNumberOfChildren(2);
  //TODO: Parameterise and randomise these dates. 
  await home.selectDates("Friday, September 12,", "Friday, September 19,");
  await home.search();
  await home.viewPricesForFirstListedRoom();
  await home.addFirstAvailableRateToCart();
  await home.proceedToCheckoutFromCartContentComponent();

  await cart.addYourDetails(validGuestDetails);
  await cart.addAdditionalDetails(additionalGuestDetails);
  await cart.clickPay();
  await cart.fillCardDetails(validCardDetails);
  await cart.clickPayNow();

  //TODO: Parameterise and randomise these dates.
  await orderConfirmation.assertValidOrderConfirmation({
    guestName: `${validGuestDetails.firstName} ${validGuestDetails.lastName}`,
    guestEmail: validGuestDetails.email,
    guestMobile: validGuestDetails.mobile,
    durationText: "7 Nights",
    checkInDate: "Fri 12 Sep 2025",
    checkOutDate: "Fri 19 Sep 2025",
    maskedCard: expectedMaskedCard,
  });

  //Reload the page to test that the page information is persisted.
  await orderConfirmation.page.reload();

  //TODO: Parameterise and randomise these dates.
  await orderConfirmation.assertValidOrderConfirmation({
    guestName: `${validGuestDetails.firstName} ${validGuestDetails.lastName}`,
    guestEmail: validGuestDetails.email,
    guestMobile: validGuestDetails.mobile,
    durationText: "7 Nights",
    checkInDate: "Fri 12 Sep 2025",
    checkOutDate: "Fri 19 Sep 2025",
    maskedCard: expectedMaskedCard,
  });
});
