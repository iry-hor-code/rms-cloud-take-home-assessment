import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly calendarIcon: Locator;
  readonly guestsTextbox: Locator;
  readonly searchButton: Locator;
  readonly pricesContainer: Locator;
  readonly guestSelectorPlusButton: Locator;
  readonly seePricesButton: Locator;
  readonly addToCartButton: Locator;
  readonly firstSeePricesButton: Locator;
  readonly firstAddToCartButton: Locator;
  readonly firstPricesContainerSeePricesButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.calendarIcon = page.getByTestId("CalendarMonthOutlinedIcon");
    this.guestsTextbox = page.getByRole("textbox", { name: "Guests" });
    this.searchButton = page.getByTestId("search");
    this.pricesContainer = page.getByTestId("see-prices-container");
    this.guestSelectorPlusButton = page.getByTestId(
      "guest-selector-plusButton-children",
    );
    this.seePricesButton = page.getByTestId("see-prices-btn-rates-page");
    this.addToCartButton = page.getByTestId("add-to-cart-btn-rates-page");
    this.firstSeePricesButton = page
      .getByTestId("see-prices-btn-rates-page")
      .first();
    this.firstAddToCartButton = page
      .getByTestId("add-to-cart-btn-rates-page")
      .first();
    this.firstPricesContainerSeePricesButton = page
      .getByTestId("see-prices-container")
      .first()
      .getByTestId("see-prices-btn-rates-page");
    this.checkoutButton = page.getByTestId("btnCheckoutOnCart");
  }

  async goto() {
    await this.page.goto("https://alphaibe12.rmscloud.com/22749/1");
  }

  async selectDates(checkInDate: string, checkOutDate: string) {
    await this.calendarIcon.click();
    await this.page.getByRole("button", { name: checkInDate }).click();
    await this.page.getByRole("button", { name: checkOutDate }).click();
  }

  async increaseNumberOfGuests(childCountToAdd: number) {
    await this.guestsTextbox.click();
    for (let i = 0; i < childCountToAdd; i++) {
      await this.guestSelectorPlusButton.click();
    }
  }

  async search() {
    await this.searchButton.click();
  }

  async viewPricesForFirstListedRoom() {
    await this.firstPricesContainerSeePricesButton.click();
  }

  async addFirstAvailableRateToCart() {
    await this.firstAddToCartButton.click();
  }

  async proceedToCheckoutFromCartContentComponent() {
    await this.checkoutButton.click();
  }
}
