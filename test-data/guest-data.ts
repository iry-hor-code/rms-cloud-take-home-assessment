export const validGuestDetails = {
  title: "Mr",
  firstName: "Test",
  lastName: "McTestface",
  email: "test@test.com",
  mobile: "0406555555",
  addressLine: "116 Harrick Rd, Keilor Park VIC 3042, Australia",
} as const;

export const invalidGuestDetails = {
  title: "Mr",
  firstName: "",
  lastName: "",
  email: "invalid-email",
  mobile: "123",
  addressLine: "",
} as const;

export const additionalGuestDetails = {
  gender: "Male",
  phoneAh: "0406555555",
  resNote: "This is a test res note.",
} as const;

export const invalidAdditionalGuestDetails = {
  gender: "",
  phoneAh: "123",
  resNote: "",
} as const;
