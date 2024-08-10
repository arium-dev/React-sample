export const WITHDRAWALS = "withdrawals";
export const WITHDRAW = "withdraw";
export const PDF_FILE = "Receipt.pdf";
export const BSB = "BSB:";
export const ACCOUNT_NUMBER = "Account Number:";
export const CREATE_WITHDRAW = "Create Withdraw";
export const CREATE_TRANSACTION_CSV = "Create-Transactions.csv";
export const CSV_GENERATION_FAILURE = "Failed to generate CSV file";

export const headerValues = {
  deposits: [
    { type: "string", name: "Date", value: "date" },
    { type: "string", name: "Reference", value: "reference" },
    { type: "string", name: "Amount", value: "amount" },
    { type: "string", name: "Status", value: "status" },
  ],
  withdrawals: [
    { type: "string", name: "Bank", value: "bank" },
    { type: "string", name: "Date", value: "createdAt" },
    { type: "string", name: "Amount", value: "amount" },
    { type: "string", name: "Receipt", value: "receipt" },
    { type: "string", name: "Status", value: "status" },
  ],
};

export const sides = {
  deposit: "deposits",
  withdraw: "withdrawals",
};
