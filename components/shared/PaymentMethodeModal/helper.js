export const paymentMethodes = [
  {
    name: "fiat wallet",
    title: "Current Balance",
    description:
      "Open a multi currency account and add funds toinstantly pay for your transfers.",

    enabled: true,
  },
  {
    name: "debit-card",
    title: "Debit Card",
    description: "Send from your Visa or Mastercard.",
    enabled: false,
  },
  {
    name: "credit-card",
    title: "Credit Card",
    description: "Send from your Visa or Mastercard.",
    enabled: false,
  },
  {
    name: "bank-transfer",
    title: "Bank Transfer",
    description: "Transfer the money to Wise using your bank account.",
    enabled: false,
  },
  {
    name: "swift-transfer",
    title: "Swift Transfer",
    description:
      "Send money internationally. Your bank will charge you extra fees.",
    enabled: false,
  },
];
