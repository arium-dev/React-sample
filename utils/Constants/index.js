export const SUPPORT_EMAIL = process.env.REACT_APP_SUPPORT_EMAIL;
export const OFFSET = process.env.REACT_APP_PAGE_OFFSET || 10;
export const DEBOUNCE_TIME = 1000;

export const mailtoSupport = (
  <a className="text-primary" href={`mailto:${SUPPORT_EMAIL}`}>
    {SUPPORT_EMAIL}
  </a>
);

export const PageTitles = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/account-setting": "Settings",
  "/accounts": "Accounts",
  "/currency": "Currency",
  "/transaction-history": "Transaction History",
  "/admin/settings": "Settings",
  "/activity": "Activity",
  "/admin/dashboard": "Dashboard",
  "/admin/fiat-management": "Fiat Management",
  "/admin/admins": "User Management",
  "/admin/users": "Users",
  "/admin/coins": "Coin Management",
  "/admin/rolling-reserve": "Coin Management",
  "/admin/transaction-history": "Transaction History",
  "/admin/rtgs-imt": "Rtgs/Imt Payments",
  "/admin/api-keys": "API Keys",
  "/admin/activity": "Activity",
  "/admin/transaction-fee": "Transaction Fee",
};

export const PageViewRoutes = [
  "/transaction-history",
  "/transaction-history",
  "/activity",
  "/admin/fiat-management",
  "/admin/admins",
  "/admin/users",
  "/admin/rolling-reserve",
  "/admin/activity",
  "/admin/transaction-history",
  "/admin/organizations",
  "/admin/rtgs-imt",
  "/admin/currency",
];

export const Routes = {
  LOGIN: "/login",
  REGISTER: "/register",
  SET_PASSWORD: "/set-password",
  VERIFY_2FA: "/verify-2fa",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  DASHBOARD: "/dashboard",
  ACCOUNT_SETTING: "/account-setting",
  CONFIRMATION: "/confirmation/:token",
  CONFIRMATION_TOKEN: "/confirmation/:token",
  TRANSACTION_HISTORY: "/transaction-history",
  SETTINGS: "/settings",
  ACTIVITY: "/activity",
  ACCOUNTS: "/accounts",
  CURRENCY: "/currency",
  CHANGE_EMAIL_VERIFY: "/change-email-verify/:token",
  SCHEDULE_MEETING: "/schedule-meeting/:token",
  BASE: "/",
};

export const AdminRoutes = {
  DASHBOARD: "/admin/dashboard",
  ADMINS: "/admin/admins",
  USERS: "/admin/users",
  FIAT_MANAGEMENT: "/admin/fiat-management",
  COINS: "/admin/coins",
  ROLLING_RESERVE: "/admin/rolling-reserve",
  TRANSACTION_HISTORY: "/admin/transaction-history",
  RTGS_IMT: "/admin/rtgs-imt",
  API_KEYS: "/admin/api-keys",
  ACTIVITY: "/admin/activity",
  SETTINGS: "/admin/settings",
  TRANSACTION_FEE: "/admin/transaction-fee",
};

export const LABELS = {
  EMAIL: "Email*",
  EMAIL_2: "E-mail*",
  NEW_EMAIL: "New Email*",
  RECIPIENT_EMAIL: "Recipient Email",
  SEARCH_EMAIL: "Search Email",
  PASSWORD: "Password*",
  CONFIRM_PASSWORD: "Confirm Password*",
  NAME: "Name*",
  FIRST_NAME: "First Name*",
  LAST_NAME: "Last Name*",
  _FIRST_NAME: "First Name",
  _LAST_NAME: "Last Name",
  DOB: "DOB*",
  DATE_OF_BIRTH: "Date of Birth",
  ROLE: "Role*",
  VERIFICATION_CODE: "Verification Code*",
  CONTACT_NUMBER: "Phone",
  CONTACT_NO: "Contact No.",
  CURRENT_PASSWORD: "Current Password*",
  NEW_PASSWORD: "New Password*",
  CONFIRM_NEW_PASSWORD: "Confirm New Password*",
  PRICE: "Price",
  AMOUNT: "Amount",
  TOTAL: "Total",
  GO_TO_BACK: "Go to Back",
  ERROR_404: "404",
  ACCOUNT_NOT_FOUND: "The page you were looking for is not found",
  ACCOUNT_NOT_FOUND_DESC:
    "You may have mistyped the address or the page may have moved.",
  BSB: "BSB*",
  BANK_ACCOUNT_NUMBER: "Bank Account Number*",
  BANK_ACCOUNT_TITLE: "Bank Account Title*",
  COINS: "Coins",
  COIN_REQUIRED: "Coin*",
  BALANCE_REQUIRED: "Balance*",
  QUANTITY_REQUIRED: "Quantity*",
  VARIANT_FACTOR_REQUIRED: "Variant Factor*",
  NOTES: "Write Notes*",
  VIDEO_LINK: "Video Link*",
  DATE_OF_BIRTH_REQUIRED: "Date of Birth*",
  DEPOSIT_THRESHOLD_LIMIT: "Deposit Threshold Limit",
  CONTACT_EMAIL: "Contact Email*",
  SEARCH: "Search",
  YOU_SEND: "You Send",
  RECIPIENT_RECEIVE: "Recipient Receive",
};

export const PLACEHOLDERS = {
  EMAIL: "Enter your email",
  NEW_EMAIL: "Enter New Email Address",
  EMAIL_EXAMPLE: "user@example.com",
  EMAIL_REGISTER: "name@example.com",
  PASSWORD: "Enter your password",
  CONFIRM_PASSWORD: "Enter your confirm password",
  FIRST_NAME: "John",
  LAST_NAME: "Doe",
  _FIRST_NAME: "Charles",
  _LAST_NAME: "Shedden",
  DOB: "dd/mm/yyyy",
  ROLE: "Role",
  VERIFICATION_CODE: "Enter verification code",
  CONTACT_NUMBER: "(+61) 3843 9876",
  CURRENT_PASSWORD: "Enter Current Password",
  PRICE: "0.00",
  BSB: "123-456",
  BANK_ACCOUNT_NUMBER: "123456789",
  BANK_ACCOUNT_TITLE: "John Doe",
  USER_NAME: "User Name",
  COINS: "Select coin",
  SELECT_COIN: "Select coin",
  TYPE_SELECT_COIN: "Type or select coin",
  ENTER_QUANTITY: "Enter quantity",
  A$100: "A$100",
  SEND_EMAIL: "Resend Email",
  APPROVE_REJECT: "Approve / Reject",
  NOTES: "Write Notes",
  VIDEO_LINK: "Video Link",
  THRESHOLD_LIMIT: "e.g, 10000",
  CONTACT_EMAIL: "Contact Email",
  SELECT_USER: "Type or select user",
  AMOUNT: "Enter Amount",
  REF_ID: "Enter Reference ID",
  ACCOUNT_NUMBER: "Enter Account#",
  API_KEY_NAME: "API Key Name",
  SET_PASSWORD: "Enter New Password",
  SET_CONFIRM_PASSWORD: "Re-Enter New Password",
  SET_EMAIL: "Enter email address",
  PLACEHOLDER_EMAIL: "shedden@armyspy.com",
  CURRENCY_RATE: "Currency Rate",
  AMOUNT_RECEIVE: "Amount Receive",
  FEE: "Enter Fee",
};

export const TYPE = {
  TEXT: "text",
  PASSWORD: "password",
  DATE: "date",
  NUMBER: "number",
  RANGE: "range",
  CHECKBOX: "checkbox",
};

export const BUTTON_TYPE = {
  SUBMIT: "submit",
  BUTTON: "button",
};

export const AUTOCOMPLETE = {
  OFF: "off",
  ON: "on",
};

export const GENERIC_MESSAGES = {
  SOMETHING_WENT_WRONG: "Something went wrong",
  NO_DATA_AVAILABLE: "Sorry, no data available",
  NO_RESULTS_TO_DISPLAY: "No results to display",
  NO_DATA_TO_DISPLAY: "No results to display",
  ADMINS: "Admins",
  USERS: "Users",
  CREATE_ADMIN: "Create Admin",
  GENERATE_BANK_ACCOUNT: "Generate Bank Account",
  RESET: "Reset",
};

export const AUTO_FOCUS = {
  ON: "autofocus",
};
export const BADGE_TYPES = {
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
  DANGER: "danger",
  LIGHT: "light",
  PRIMARY: "primary",
};

export const DROPDOWN_TYPES = {
  PRIMARY: "primary",
};

export const MODAL_CLASS = {
  LG: "modal-lg",
  XL: "modal-xl",
};

export const DATE_FORMAT = {
  REGULAR: "YYYY-MM-DD HH:mm",
  DATE_MONTH: "DD MMMM YYYY",
};

export const TOOLTIP_PLACEMENT = {
  TOP: "top",
};
export const GENERIC_CONSTANTS = {
  DATE_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
  DATE_FORMAT: "YYYY-MM-DD",
  DATE_FORMAT_DAY_MONTH_YEAR: "D MMMM, YYYY",
  DATE_FORMAT_COMPLETE: "dddd, DD MMMM, YYYY [at] HH:mm",
};

export const GenericConstant = {
  _SENT: "sent",
  _RECEIVED: "received",
  _ADMIN: "admin",
  _STRING: "string",
  _SUPER_ADMIN: "superadmin",
  _STATUS: "status",
  _WALLET: "wallet",
  _APPROVE: "approve",
  _REJECT: "reject",
  _APPROVED: "approved",
  _REJECTED: "rejected",
  _CONFIRMED: "confirmed",
  _IN_PROGRESS: "inProgress",
  _PENDING: "pending",
  _UN_APPROVED: "unApproved",
  _CANCELLED: "cancelled",
  _PENDING_INVITATION: "pendingInvitation",
  PENDING_INVITATION: "Pending Invitation",
  _LIGHT: "light",
  _SMALL: "small",
  _MEDIUM: "medium",
  _LARGE: "large",
  _LEFT: "left",
  _RIGHT: "right",
  _CENTER: "center",
  _ASC: "asc",
  _DESC: "desc",
  _DIV: "div",
  _RECT: "rect",
  _NONE: "none",
  _DEFAULT: "default",
  _ROLE: "role",
  _SUPER: "super",
  _SUPERVISOR: "supervisor",
  _BLANK: "_blank",
  _PRIMARY: "primary",
  _SECONDARY: "secondary",
  _CREATED_AT: "createdAt",
  _UPDATED_AT: "updatedAt",
  _XS: "xs",
  _SM: "sm",
  _MD: "md",
  _LG: "lg",
  _XL: "xl",
  _SUBMIT: "submit",
  _TEXT: "text",
  _EMAIL: "email",
  _DATE: "date",
  _NUMBER: "number",
  _OFF: "off",
  _ON: "on",
  _NOTES: "notes",
  _VIDEO_LINK: "videoLink",
  _ENABLED: "enabled",
  _DISABLED: "disabled",
  _USER: "user",
  _TOKEN: "token",
  _RESERVE_HISTORY: "reserveHistory",
  _VIEW_AS_BATCH: "viewAsBatch",
  LOGOUT: "Logout",
  SUBMIT: "Submit",
  OK: "Ok",
  CANCEL: "Cancel",
  NEXT: "Next",
  CONFIRM: "Confirm",
  AUD: "AUD",
  USD: "USD",
  $: "$",
  ROWS: "Rows",
  ROWS_PER_PAGE_OPTIONS: [25, 50, 100, 200],
  OFFSET: OFFSET,
  HUNDRED: 100,
  FIFTY: 50,
  HUNDRED_PERCENT: "100%",
  SKELETON_ROWS: 3,
  TRUE: true,
  FALSE: false,
  DATE_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
  START_KYC: "Start KYC",
  _ERROR: "error",
  _SUCCESS: "success",
  _INFO: "info",
  _WARNING: "warning",
  REFRESH: "Refresh",
  UPDATE_COIN: "Update Coin",
  ADD_COIN: "Add Coin",
  COINS: "Coins",
  COIN: "Coin",
  PRICE: "Price",
  FACTOR: "Factor",
  VARIANT_FACTOR: "Variant Factor",
  _BUY: "buy",
  _SELL: "sell",
  _USDC: "USDC",
  _MINUTES: "minutes",
  _WITHDRAW: "withdraw",
  _DEPOSIT: "deposit",
  ADD_RESERVE: "Add Reserve",
  BALANCE: "Balance",
  SELECT_COIN: "Type or Select coin",
  ROLLING_RESERVES: "Rolling Reserve",
  USER_ALERT_TRANSACTION_MESSAGE:
    "Please note that AUD deposits may require EDD (Enhanced Due Diligence) by our compliance team.",
  AUD_TO_USD_CONVERSION_ALERT_MESSAGE:
    "Please convert the AUD Balance into USD Balance to buy on the desired price",
  USER_ALERT_BANK_ACCOUNT_MESSAGE:
    "Press confirm to add your bank account details to your nominated whitelist. Please note any future changes will require you to contact support.",
  PLEASE_ENABLED_TWO_FA: "Please enable  2FA to approve the fiat withdrawal",
  GOOGLE_TWO_FA_VERIFICATION: "Google 2FA Verification",
  TWO_FA_REQUIRED_FOR_WITDRAW_APPROVAL:
    "2FA Verification required for withdraw approval",

  VERIFY_IDENTITY: "Identity Verification Required",
  VERIFY_IDENTITY_DESC:
    "Verification is required to continue with any further trading activity. If you have not competed KYC then please have the following available for verification.",
  REQUIRED_DOCS: "Required Documents:",
  PROOF_IDENTITY_1: "Gov ID Proof of identity(Passport/Driver’s License)",
  PROOF_IDENTITY_2: "Proof of Address (Bank Statement, Utility Bill)",
  ALERT: "Alert",
  CONTACT_TO_SUPPORT_MESSAGE: (
    <p>
      {`If you have any query you can contact us with our support team by sending email to `}
      <a className="text-primary" href={`mailto:${SUPPORT_EMAIL}`}>
        {SUPPORT_EMAIL}
      </a>
      {` we will get back to you.`}
    </p>
  ),
  NEBULA_TRADING: "Nebula Trading",
  ADMIN_: "Admin",
  ADMIN: "admin",
  UN_APPROVED: "UnApproved",
  UN_APPROVE: "UnApprove",
  CANCELLED: "Cancelled",
  APPROVED: "Approved",
  PENDING: "Pending",
  REJECTED: "Rejected",
  APPROVE: "Approve",
  IN_PROGRESS: "In Progress",
};

export const TRANSFER_STEP = {
  EXCHANGE_RATE: "exchangeRate",
  ADD_RECIPIENT: "addRecipient",
  PAYMENT_METHODE: "paymentMethode",
  CURRENCY_EXCHANGE: "currencyExchange",
  CONFIRM_TRANSACTION: "confirmTransaction",
  GREETING: "greeting",
};

export const REGIX = {
  BSB: /^[0-9]{3}-[0-9]{3}$/,
  NUMBER: /^[0-9]+$/,
  NON_NEGATIVE_NUMBER: /^\d*\.?\d*$/,
};

// export const ADMIN_ROLES = [GenericConstant.ADMIN];

export const SUPER_ADMIN_ROLES = [
  GenericConstant._SUPERVISOR,
  GenericConstant._SUPER_ADMIN,
  GenericConstant._ADMIN,
];

export const ROLES = {
  USER: GenericConstant._USER,
  ADMIN: GenericConstant.ADMIN,
  SUPER: GenericConstant._SUPER,
  SUPER_ADMIN: GenericConstant._SUPER_ADMIN,
  SUPERVISOR: GenericConstant._SUPERVISOR,
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NOT_EXECUTE: 210,
  NOT_FOUND: 404,
  Expectation_Failed: 417,
  CONFLICT: 409,
};

export const SERVICE_ERROR = "Something went wrong, Please try again.";
export const CSV_GENERATION_FAILURE = "Failed to generate CSV file";
export const COPY_ERROR = "Cannot copy";

export const MODE = {
  ON_TOUCHED: "onTouched",
};
export const withdrawStatusActions = [
  { id: "unApproved", label: "UnApprove", value: "unApproved" },
  { id: "approved", label: "Approve", value: "approved" },
  { id: "cancelled", label: "Cancel", value: "cancelled" },
];

export const HTTP_REQUEST_ERROR = {
  INCORRECT_METHOD: (method) => {
    return `Unsupported method: ${method}`;
  },
};
export const BADGE_VARIANT = {
  DANGER: "badge-danger",
  WARNING: "badge-warning",
  PRIMARY: "badge-primary",
};

export const DELAY_1000 = 1000;

export const TOGGLE_VARIANT = {
  WARNING: "outline-warning",
  SUCCESS: "outline-success",
  DANGER: "outline-danger",
};

export const TEXT_VARIANT = {
  WARNING: "text-warning",
  INFO: "text-info",
  SUCCESS: "text-success",
  DANGER: "text-danger",
};
export const _2FA_SECRET = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

export const ZERO = 0;
export const ONE = 1;
export const TWO = 2;
export const THREE = 3;
export const SIX = 6;
export const TEN = 10;
export const FIVE_HUNDRED = 500;
export const HUNDRED = 100;
export const THOUSAND = 1000;
export const COPY_TO_CLIPBOARD_TIME = 6000;
export const ONE_MILLION = 1000000;

export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_USER: "view_user",
  CREATE_USER: "create_user",
  EDIT_USER: "edit_user",
  SUSPEND_USER: "suspend_user",
  UNSUSPEND_USER: "unsuspend_user",
  RESEND_SET_PASSWORD_EMAIL_USER: "resend_set_password_email_user",
  RESEND_RESET_PASSWORD_EMAIL_USER: "resend_reset_password_email_user",
  EDD_VERIFIED_USER: "edd_verified_user",
  GENERATE_BANK_ACCOUNT_NO_USER: "generate_bank_account_no_user",
  RESET_WITHDRAW_BANK_USER: "reset_withdraw_bank_user",
  EDIT_DEPOSIT_THRESHOLD_LIMIT_USER: "edit_deposit_threshold_limit_user",
  VIEW_ADMIN: "view_admin",
  CREATE_ADMIN: "create_admin",
  EDIT_ADMIN: "edit_admin",
  SUSPEND_ADMIN: "suspend_admin",
  UNSUSPEND_ADMIN: "unsuspend_admin",
  RESEND_SET_PASSWORD_EMAIL_ADMIN: "resend_set_password_email_admin",
  RESEND_RESET_PASSWORD_EMAIL_ADMIN: "resend_reset_password_email_admin",
  DELETE_ADMIN: "delete_admin",
  VIEW_COIN: "view_coin",
  CREATE_COIN: "create_coin",
  DISABLE_COIN: "disable_coin",
  ENABLE_COIN: "enable_coin",
  EDIT_VARIANT_FACTOR_COIN: "edit_variant_factor_coin",
  ADD_ROLLING_RESERVE: "add_rolling_reserve",
  VIEW_RESERVE_HISTORY: "view_reserve_history",
  VIEW_ROLLING_HISTORY: "view_rolling_history",
  VIEW_PENDING_DEPOSIT: "view_pending_deposit",
  VIEW_LINK_TO_EDD: "view_link_to_edd",
  RESEND_EDD_EMAIL_PENDING_DEPOSIT: "resend_edd_email_pending_deposit",
  ADD_NOTES_PENDING_DEPOSIT: "add_notes_pending_deposit",
  EDIT_NOTES_PENDING_DEPOSIT: "edit_notes_pending_deposit",
  APPROVE_PENDING_DEPOSIT: "approve_pending_deposit",
  REJECT_PENDING_DEPOSIT: "reject_pending_deposit",
  ADD_EDD_LINK_PENDING_DEPOSIT: "add_edd_link_pending_deposit",
  EDIT_EDD_LINK_PENDING_DEPOSIT: "edit_edd_link_pending_deposit",
  RESCHEDULE_EDD_PENDING_DEPOSIT: "reschedule_edd_pending_deposit",
  ADD_CONTACT_EMAIL_PENDING_DEPOSIT: "add_contact_email_pending_deposit",
  EDIT_CONTACT_EMAIL_PENDING_DEPOSIT: "edit_contact_email_pending_deposit",
  EXPORT_PDF_PENDING_DEPOSIT: "export_pdf_pending_deposit",
  EXPORT_PDF_DEPOSIT: "export_pdf_deposit",
  VIEW_DEPOSIT: "view_deposit",
  VIEW_WITHDRAWAL: "view_withdrawal",
  CREATE_BATCH_WITHDRAWAL: "create_batch_withdrawal",
  CREATE_NEW_USER_WITHDRAWAL: "create_new_user_withdrawal",
  UPDATE_BATCH_STATUS_WITHDRAWAL: "update_batch_status_withdrawal",
  UPDATE_TRANSACTION_STATUS_WITHDRAWAL: "update_transaction_status_withdrawal",
  EDIT_BATCH_WITHDRAWAL: "edit_batch_withdrawal",
  DELETE_BATCH_WITHDRAWAL: "delete_batch_withdrawal",
  VIEW_BUY_ASSET_TRADE: "view_buy_asset_trade",
  EXPORT_PDF_BUY_ASSET_TRADE: "export_pdf_buy_asset_trade",
  UPDATE_STATUS_BUY_ASSET_TRADE: "update_status_buy_asset_trade",
  VIEW_SELL_ASSET_TRADE: "view_sell_asset_trade",
  EXPORT_PDF_SELL_ASSET_TRADE: "export_pdf_sell_asset_trade",
  VIEW_WITHDRAW_CRYPTO_TRADE: "view_withdraw_crypto_trade",
  EXPORT_PDF_WITHDRAW_CRYPTO_TRADE: "export_pdf_withdraw_crypto_trade",
  VIEW_DEPOSIT_CRYPTO_TRADE: "view_deposit_crypto_trade",
  VIEW_API_KEY: "view_api_key",
  CREATE_API_KEY: "create_api_key",
  UPDATE_API_KEY: "update_api_key",
  VIEW_ACTIVITY: "view_activity",
  VIEW_RTGS_IMT: "view_rtgs_imt",
  UPDATE_STATUS_RTGS_IMT: "update_status_rtgs_imt",
  VIEW_PROFILE_SETTING: "view_profile_setting",
  UPDATE_PROFILE_SETTING: "update_profile_setting",
  CHANGE_PASSWORD_PROFILE_SETTING: "change_password_profile_setting",
  RESET_TWO_FA_PROFILE_SETTING: "reset_two_fa_profile_setting",
  UPDATE_KYC_STATUS_USER: "update_kyc_status_user",
  VIEW_DEPOSIT_BALANCE_DASHBOARD: "view_deposit_balance_dashboard",
  VIEW_WITHDRAWAL_BALANCE_DASHBOARD: "view_withdrawal_balance_dashboard",
  APPROVE_TRANSACTION: "approve_transaction",
  REJECT_TRANSACTION: "reject_transaction",
  UPDATE_TRANSACTION_FEE: "update_transaction_fee",
};

export const SIDES = {
  BUY: "buy",
  WITHDRAW: "withdraw",
  SELL: "sell",
};

export const KYC_STATUS = {
  REJECTED: "rejected",
  NOT_VERIFIED: "not verified",
  PENDING: "pending",
  VERIFIED: "verified",
};

export const KYC_STATUS_LEVEL = new Map([
  ["rejected", 0],
  ["not verified", 1],
  ["pending", 2],
  ["verified", 3],
]);
