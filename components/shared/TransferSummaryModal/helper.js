import {
  CURRENCY,
  AMOUNT_TO_SEND,
  FEE,
  RECEIPT_EMAIL,
  PAYMENT_METHODE,
  AMOUNT_TO_BE_RECEIVED,
} from "./constants";

export const summary = [
  {
    label: CURRENCY,
    key: "currencyCode",
    class: "text-uppercase",
  },
  {
    label: AMOUNT_TO_SEND,
    key: "amount",
    class: "",
    unit: "$",
  },
  {
    label: FEE,
    key: "feeAmount",
    class: "",
    unit: "$",
  },
  {
    label: AMOUNT_TO_BE_RECEIVED,
    key: "amountReceived",
    class: "",
    unit: "$",
  },
  {
    label: RECEIPT_EMAIL,
    key: "email",
    class: "",
  },
  {
    label: PAYMENT_METHODE,
    key: "paymentMethode",
    class: "text-capitalize",
  },
];
