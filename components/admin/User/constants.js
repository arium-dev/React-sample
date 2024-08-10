export const BSB = "BSB: ";
export const ACCOUNT_NUMBER = "Account Number: ";
export const RESET = "Reset";
export const EEDD_STATUS = "EDD Status";
export const EEDD_STATUS_DESC = "Are you sure you want to verify EDD status?";
export const RESET_BANK = "Confirm Bank Reset";
export const RESET_BANK_DESC =
  "Click reset to trigger a bank account reset for this customer account";
export const _RESET_PASSWORD = "resetPassword";
export const _RESEND_EMAIL = "resendVerification";
export const RESET_PASSWORD_HEADING = "Reset Password";
export const RESET_PASSWORD_DESC =
  "Are you sure you want to send reset password link to user's mail?";
export const RESEND_EMAIL_HEADING = "Resend Verification Email";
export const RESEND_EMAIL_DESC =
  "Are you sure you want to send verification email to the user?";
export const _SUSPEND_USER = "suspendUser";
export const _RECOVER_USER = "recoverUser";
export const VERIFIED = "verified";
export const SUSPENDED = "suspended";
export const GET_MANAGE_SUSPEND_USER_HEADING = (action) => {
  return action === _SUSPEND_USER ? "Suspend User" : "Recover User";
};
export const GET_MANAGE_SUSPEND_USER_DESC = (action) => {
  return action === _SUSPEND_USER
    ? "Are you sure you want to suspend this user?"
    : "Are you sure you want to recover this user?";
};
export const GENERATE_BANK_ACCOUNT = "Generate Bank Account";
export const _EDIT = "edit";
