import { type Locator, type Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly calendarIcon: Locator;
    readonly guestsDropdown: Locator;
    readonly searchButton: Locator;
    readonly pricesContainer: Locator;
    readonly childrenSelectorPlusButton: Locator;
    readonly doneButton: Locator;
    readonly seePricesButton: Locator;
    readonly addToCartButton: Locator;
    readonly firstSeePricesButton: Locator;
    readonly firstAddToCartButton: Locator;
    readonly firstPricesContainerSeePricesButton: Locator;
    readonly checkoutButton: Locator;
    readonly isMobile: boolean;

    constructor(page: Page, opts?: { isMobile?: boolean }) {
        this.page = page;
        this.isMobile = !!opts?.isMobile;
        this.calendarIcon = page.getByTestId("CalendarMonthOutlinedIcon");
        this.guestsDropdown = page.getByRole("textbox", { name: "Guests" });
        this.searchButton = page.getByTestId("search");
        this.pricesContainer = page.getByTestId("see-prices-container");
        this.childrenSelectorPlusButton = page.getByTestId(
            "guest-selector-plusButton-children",
        );
        this.doneButton = page.getByRole("button", { name: "Done" });
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

        // Click Done button only on mobile devices
        if (this.isMobile) {
            await this.doneButton.click();
        }
    }

    async increaseNumberOfChildren(count: number) {
        await this.guestsDropdown.click();
        for (let i = 0; i < count; i++) {
            await this.childrenSelectorPlusButton.click();
        }
        
        // Click Done button only on mobile devices
        if (this.isMobile) {
            await this.doneButton.click();
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
