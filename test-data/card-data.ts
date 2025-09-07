export const validCardDetails = {
  cardNumber: "4111 1111 4555 1142",
  expiry: "03/30",
  cvv: "737",
  nameOnCard: "Test McTestface",
} as const;

export const invalidCardDetails = {
  cardNumber: "1234 5678 9012 3456",
  expiry: "13/99",
  cvv: "12",
  nameOnCard: "",
} as const;

export const expiredCardDetails = {
  cardNumber: "4111 1111 4555 1142",
  expiry: "01/20",
  cvv: "737",
  nameOnCard: "Test McTestface",
} as const;

export const declinedCardDetails = {
  cardNumber: "4000 0000 0000 0002",
  expiry: "03/30",
  cvv: "737",
  nameOnCard: "Test McTestface",
} as const;

export const expectedMaskedCard = "Visa **** **** **** 1142";
export const expectedMaskedDeclinedCard = "Visa **** **** **** 0002";
export const expectedMaskedExpiredCard = "Visa **** **** **** 1142";
