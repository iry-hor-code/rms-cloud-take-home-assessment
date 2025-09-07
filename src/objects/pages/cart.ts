import { type Locator, type Page, type FrameLocator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly titleCombobox: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly mobileTextbox: Locator;
  readonly addressFinderTextbox: Locator;
  readonly addressFirstSuggestion: Locator;
  readonly phoneAhTextbox: Locator;
  readonly genderCombobox: Locator;
  readonly birthdayCombobox: Locator;
  readonly setButton: Locator;
  readonly resNoteTextbox: Locator;
  readonly payButton: Locator;
  readonly nameOnCardTextbox: Locator;
  readonly payNowButton: Locator;
  readonly cardNumberFrame: FrameLocator;
  readonly expiryFrame: FrameLocator;
  readonly cvvFrame: FrameLocator;
  readonly cardNumberTextbox: Locator;
  readonly expiryDateTextbox: Locator;
  readonly securityCodeTextbox: Locator;
  readonly isMobile: boolean;

  constructor(page: Page, opts?: { isMobile?: boolean }) {
    this.page = page;
    this.isMobile = !!opts?.isMobile;
    this.titleCombobox = page.getByRole("combobox", { name: "Title" });
    this.firstNameTextbox = page.getByRole("textbox", { name: "First Name *" });
    this.lastNameTextbox = page.getByRole("textbox", { name: "Last Name *" });
    this.emailTextbox = page.getByRole("textbox", { name: "Email Address *" });
    this.mobileTextbox = page.getByRole("textbox", { name: "Mobile Number *" });
    this.addressFinderTextbox = page.getByRole("textbox", {
      name: "Address Finder",
    });
    this.addressFirstSuggestion = page.locator("#address-finder-option-0");
    this.phoneAhTextbox = page.getByRole("textbox", { name: "Phone AH" });
    this.genderCombobox = page.getByRole("combobox", { name: "Gender" });
    this.birthdayCombobox = page.getByRole("combobox", { name: "Birthday" });
    this.setButton = page.getByRole("button", { name: "SET" });
    this.resNoteTextbox = page.getByRole("textbox", { name: "Res Note" });
    this.payButton = page.getByTestId("book-now-btn-summary");
    this.nameOnCardTextbox = page.getByRole("textbox", {
      name: "Name on card",
    });
    this.payNowButton = page.getByRole("button", { name: "Pay A$" });
    this.cardNumberFrame = page.frameLocator(
      'iframe[title="Iframe for card number"]',
    );
    this.expiryFrame = page.frameLocator(
      'iframe[title="Iframe for expiry date"]',
    );
    this.cvvFrame = page.frameLocator(
      'iframe[title="Iframe for security code"]',
    );
    this.cardNumberTextbox = this.cardNumberFrame.getByRole("textbox", {
      name: "Card number",
    });
    this.expiryDateTextbox = this.expiryFrame.getByRole("textbox", {
      name: "Expiry date",
    });
    this.securityCodeTextbox = this.cvvFrame.getByRole("textbox", {
      name: "Security code",
    });
  }

  async addYourDetails({
    firstName,
    lastName,
    email,
    mobile,
    addressLine,
    title,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    addressLine: string;
    title?: string;
  }) {
    if (title) {
      await this.titleCombobox.click();
      await this.page.getByRole("option", { name: title, exact: true }).click();
    }
    await this.firstNameTextbox.click();
    await this.firstNameTextbox.fill(firstName);

    await this.lastNameTextbox.click();
    await this.lastNameTextbox.fill(lastName);

    await this.emailTextbox.click();
    await this.emailTextbox.fill(email);

    await this.mobileTextbox.click();
    await this.mobileTextbox.fill(mobile);

    await this.addressFinderTextbox.click();
    await this.addressFinderTextbox.fill(addressLine);
    await this.addressFirstSuggestion.click();
  }

  async addAdditionalDetails({
    gender,
    phoneAh,
    resNote,
  }: {
    gender: string;
    phoneAh: string;
    resNote: string;
  }) {
    await this.genderCombobox.click();
    await this.page.getByRole("option", { name: gender, exact: true }).click();
    await this.selectDateOfBirth();

    await this.resNoteTextbox.click();
    await this.resNoteTextbox.fill(resNote);

    await this.phoneAhTextbox.click();
    await this.phoneAhTextbox.fill(phoneAh);
  }

  //TODO: Refactor this to use a more robust method of selecting the date of birth.
  async selectDateOfBirth({ month = "January", day = "1", year = "2000" }: { month?: string; day?: string; year?: string } = {}) {
    await this.birthdayCombobox.click();
    await this.page.getByRole("button", { name: "September 2025" }).click();
    await this.page.getByRole("button", { name: "2025" }).click();
    await this.page.getByRole("button", { name: "Previous page" }).click();
    await this.page.getByRole("button", { name: "Previous page" }).click();
    await this.page.getByRole("button", { name: year }).click();
    await this.page.getByRole("button", { name: month }).click();
    await this.page
      .getByRole("button", { name: `Saturday, ${month} ${day},` })
      .click();

    // Click Set button only on mobile devices
    if (this.isMobile) {
      await this.setButton.click();
    }
  }

  async clickPay() {
    await this.payButton.click();
  }

  async fillCardDetails({
    cardNumber,
    expiry,
    cvv,
    nameOnCard,
  }: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    nameOnCard: string;
  }) {
    await this.cardNumberTextbox.click();
    await this.cardNumberTextbox.fill(cardNumber);

    await this.expiryDateTextbox.click();
    await this.expiryDateTextbox.fill(expiry);

    await this.securityCodeTextbox.click();
    await this.securityCodeTextbox.fill(cvv);

    await this.nameOnCardTextbox.click();
    await this.nameOnCardTextbox.fill(nameOnCard);
  }

  async clickPayNow() {
    await this.payNowButton.click();
  }
}
