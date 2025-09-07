import { expect, type Locator, type Page } from "@playwright/test";

export class OrderConfirmationPage {
  readonly page: Page;
  readonly reservationSummaryHeading: Locator;
  readonly printBookingButton: Locator;
  readonly nameValue: Locator;
  readonly emailValue: Locator;
  readonly mobileValue: Locator;
  readonly durationValue: Locator;
  readonly checkInValue: Locator;
  readonly checkOutValue: Locator;
  readonly bookingSummary: Locator;
  readonly cardMaskedValue: Locator;
  readonly propertyInformationText: Locator;
  readonly homeOutlinedIcon: Locator;
  readonly danielLakeyQATestingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reservationSummaryHeading = page.getByRole("heading", {
      name: "Reservation Summary",
    });
    this.printBookingButton = page.getByRole("button", {
      name: "Print Booking",
    });
    this.nameValue = page.getByTestId("booking-confirmation-Name-0");
    this.emailValue = page.getByTestId("booking-confirmation-Email-1");
    this.mobileValue = page.getByTestId("booking-confirmation-Mobile Number-2");
    this.durationValue = page.getByTestId("booking-confirmation-Duration-0");
    this.checkInValue = page.getByTestId("booking-confirmation-Check-in-1");
    this.checkOutValue = page.getByTestId("booking-confirmation-Check-out-2");
    this.bookingSummary = page.locator("#bookingSummary");
    this.cardMaskedValue = page
      .getByTestId("booking-confirmation-Card-0")
      .locator("span");
    this.propertyInformationText = page.getByText("Property Information");
    this.homeOutlinedIcon = page.getByTestId("HomeOutlinedIcon");
    this.danielLakeyQATestingLink = page.getByRole("link", {
      name: "Daniel Lakey QA Testing",
    });
  }

  async assertLoaded() {
    //Needed as sometimes the page was not fully loaded when the assertions were run.
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForURL("**/bookingConfirmation/**");
    
    await expect(this.reservationSummaryHeading).toBeVisible();
    await expect(this.printBookingButton).toBeVisible();
  }

  async assertGuestDetails({ name, email, mobile }: { name: string; email: string; mobile: string }) {
    await expect(this.nameValue).toContainText(name);
    await expect(this.emailValue).toContainText(email);
    await expect(this.mobileValue).toContainText(mobile);
  }

  async assertReservationDates({
    durationText,
    checkInDate,
    checkOutDate,
  }: {
    durationText: string;
    checkInDate: string;
    checkOutDate: string;
  }) {
    await expect(this.durationValue).toContainText(durationText);
    await expect(this.checkInValue).toContainText(checkInDate);
    await expect(this.checkOutValue).toContainText(checkOutDate);
  }

  async assertPaymentSummaryContains({ texts }: { texts: string[] }) {
    for (const text of texts) {
      await expect(this.bookingSummary).toContainText(text);
    }
  }

  async assertMaskedCard(maskedText: string) {
    await expect(this.cardMaskedValue).toContainText(maskedText);
  }

  async assertPropertyInformationVisible() {
    await expect(this.propertyInformationText).toBeVisible();
    await expect(this.homeOutlinedIcon).toBeVisible();
    await expect(this.danielLakeyQATestingLink).toBeVisible();
  }

  async assertValidOrderConfirmation({
    guestName,
    guestEmail,
    guestMobile,
    durationText,
    checkInDate,
    checkOutDate,
    maskedCard,
  }: {
    guestName: string;
    guestEmail: string;
    guestMobile: string;
    durationText: string;
    checkInDate: string;
    checkOutDate: string;
    maskedCard: string;
  }) {
    await this.assertLoaded();
    await this.assertGuestDetails({ name: guestName, email: guestEmail, mobile: guestMobile });
    await this.assertReservationDates({ durationText, checkInDate, checkOutDate });
    await this.assertPaymentSummaryContains({ texts: ["Card", "Total Amount"] });
    await this.assertMaskedCard(maskedCard);
    await this.assertPropertyInformationVisible();
  }
}
