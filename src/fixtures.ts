import { test as base } from "@playwright/test";
import { HomePage } from "./objects/pages/home";
import { CartPage } from "./objects/pages/cart";
import { OrderConfirmationPage } from "./objects/pages/order-confirmation";

interface Fixtures {
  home: HomePage;
  cart: CartPage;
  orderConfirmation: OrderConfirmationPage;
};

//Page Objects
export const test = base.extend<Fixtures>({
  home: async ({ page, isMobile }, use) => {
    await use(new HomePage(page, { isMobile }));
  },
  cart: async ({ page, isMobile }, use) => {
    await use(new CartPage(page, { isMobile }));
  },
  orderConfirmation: async ({ page, isMobile }, use) => {
    await use(new OrderConfirmationPage(page, { isMobile }));
  },
});

export { expect } from "@playwright/test";


