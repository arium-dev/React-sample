import { ONE_MILLION } from "../Constants";
export const LENGTH = {
  MAX_30: "Maximum 30 characters",
  MAX_60: "Maximum 60 characters",
};

export const ERRORS = {
  NUMERICAL_VALUE_REQUIRED: "Input numerical value to continue",
  NON_ZERO_VALUE_REQUIRED: "Value must be above 0",

  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email",
  FIRST_NAME_REQUIRED: "First name is required",
  FIRST_NAME_INVALID: "First name must contain only alphabetic characters",
  NAME_REQUIRED: "Name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  LAST_NAME_INVALID: "Last name must contain only alphabetic characters",
  NAME_INVALID: "Name must contain only alphanumeric characters and spaces",
  DOB_REQUIRED: "Date of birth is required",
  DOB_MIN_INVALID: "Minimum age requirement of 18 years",
  DOB_MAX_INVALID: "Maximum date range greater than 1900",
  CONTACT_NUMBER_INVALID: "Please enter a valid contact number",
  CURRENT_PASSWORD_REQUIRED: "Current password is required",
  NEW_PASSWORD_INVALID:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Character",
  DUPLICATE_NEW_PASSWORD: "New password should be different from old password",
  PASSWORD_NOT_MATCHED: "Passwords do not match",
  VERIFICATION_CODE_REQUIRED: "Verification code is required",
  VERIFICATION_CODE_INVALID: "Please input the 6 digits 2FA code",
  COIN_REQUIRED: "Select a coin to continue",
  QUANTITY_MIN_REQUIRED: "Minimum 0.00000001 required",
  AMOUNT_MIN_REQUIRED: "Minimum 0.01 required",
  WALLET_ADDRESS_REQUIRED: "Enter wallet address to continue",
  WALLET_ADDRESS_INVALID: "Invalid address",
  BSB_REQUIRED: "Please enter valid BSB",
  BANK_ACCOUNT_NUMBER_REQUIRED: "Bank Account Number is required",
  BANK_ACCOUNT_MAX_LENGTH:
    "Bank Account Number must be at most 20 characters long",
  BANK_ACCOUNT_TITLE_REQUIRED: "Bank Account Title is required",
  BANK_ACCOUNT_TITLE_MAX_LENGTH:
    "Bank Account Title must be at most 100 characters long",
  BANK_ACCOUNT_TITLE_INVALID:
    "Bank Account Title must contain only letters, spaces, and apostrophes",
  BANK_ACCOUNT_REQUIRED: "Select bank account to continue",
  WITHDRAW_MIN_AMOUNT_REQUIRED: "Minimum 10 required",
  AMOUNT_REQUIRED: "Amount is required",
  ID_REQUIRED: "Id is required",
  PASSWORD_REQUIRED: "Password is required",
  LOGIN_KEY_REQUIRED: "Login Key is required",
  COIN_SELECTION_REQUIRED: "Coin must be selected",
  FACTOR_INVALID: "Factor should be between 0 and 100",
  BALANCE_NON_ZERO_REQUIRED: "Balance should be greater than 0",
  NOTES_REQUIRED: "Please enter notes",
  NOTES_INVALID_LENGTH: "Notes should be less than 1000 characters",
  VIDEO_CALL_LINK_REQUIRED: "Please enter video call link",
  ADD_EMAIL_REQUIRED: "Please enter email",
  ADD_EMAIL_INVALID: "Please enter a valid email",
  ORGANIZATION_NAME_REQUIRED: "Organization Name is required",
  ORGANIZATION_NAME_INVALID:
    "Organization name must contain only alphanumeric characters and spaces",
  RATE_REQUIRED: "Rate is required",
  LABEL_REQUIRED: "Label is required",
  MAX_LIMIT_1000000: `Maximum limit is ${ONE_MILLION}`,
  CURRENCY_REQUIRED: "Currency is required",
  TRANSACTION_FEE_INVALID_RANGE: "Fee must be between 0 and 100.",
  TRANSACTION_FEE_INVALID_DIGITS:
    "Fee must have at most 2 digits after the decimal point.",
};

export const GENERIC = {
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};
