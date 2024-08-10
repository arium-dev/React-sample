import copy from "copy-to-clipboard";
import { error } from "../components/shared/Alert";
import moment from "moment";
import {
  BADGE_TYPES,
  GENERIC_CONSTANTS,
  AdminRoutes,
  ROLES,
  COPY_ERROR,
} from "./Constants";
import { getLocalStorageItem } from "../config/AuthSetting";
import { ClearSession } from "../config/utils";
import { Link } from "react-router-dom";
import ToolTip from "../components/shared/Tooltip";
import { authLogout } from "../services/auth";

export const KYC_STATUS = {
  NOT_VERIFIED: "Not Verified",
  IN_PROGRESS: "In Progress",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  VERIFIED: "Verified",
  PENDING: "Pending",
};

export const copyToClipboard = async (value) => {
  try {
    await copy(value);
  } catch (err) {
    error(COPY_ERROR);
  }
};

function isScientificNotation(value) {
  // Define a regular expression to match scientific notation
  // The pattern matches a decimal coefficient followed by an 'e' or 'E' and an optional sign and exponent
  const scientificNotationPattern = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)$/;

  // Use the test() method to check if the input string matches the pattern
  return scientificNotationPattern.test(value);
}

const ToFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};

function hasMoreThanEightDecimalPlaces(number) {
  // Convert the number to a string
  const numberString = number.toString();
  // Check if there is a decimal point
  if (numberString.includes(".")) {
    // Split the string into integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(".");
    // Check if the length of the decimal part is greater than 8
    if (decimalPart.length > 8) {
      return true;
    }
  }
  return false;
}

function hasMoreThanTwoDecimalPlaces(number) {
  // Convert the number to a string
  const numberString = number.toString();
  // Check if there is a decimal point
  if (numberString.includes(".")) {
    // Split the string into integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(".");
    // Check if the length of the decimal part is greater than 8
    if (decimalPart.length > 2) {
      return true;
    }
  }
  return false;
}

function truncateDecimals(number, decimalPlaces) {
  // Convert the number to a string
  const numberString = number.toString();
  // Find the position of the decimal point
  const decimalIndex = numberString.indexOf(".");
  if (decimalIndex !== -1) {
    const truncatedString = numberString.slice(
      0,
      decimalIndex + decimalPlaces + 1
    );
    return truncatedString;
  } else {
    // If the number is an integer, no need for truncation
    return number;
  }
}

export const fixNumberUpTo8 = (val = 0) => {
  val = parseFloat(val);
  let isScientific = isScientificNotation(val);
  if (isScientific) {
    val = ToFixed(val);
  }
  let isTrue = hasMoreThanEightDecimalPlaces(val);
  if (isTrue) {
    // val = Math.trunc(parseFloat(val) * 1e8) / 1e8;
    val = truncateDecimals(val, 8);
  }
  isScientific = isScientificNotation(val);
  if (isScientific) {
    val = ToFixed(val);
  }
  return val;
};
export const FormatEightDecimals = (val = 0) => {
  val = parseFloat(val);
  let isScientific = isScientificNotation(val);
  if (isScientific) {
    val = ToFixed(val);
  }
  let isTrue = hasMoreThanEightDecimalPlaces(val);
  if (isTrue) {
    // val = Math.trunc(parseFloat(val) * 1e8) / 1e8;
    val = truncateDecimals(val, 8);
  }
  isScientific = isScientificNotation(val);
  if (isScientific) {
    val = ToFixed(val);
  }
  return val;
};

export const FormatTwoDecimals = (val = 0) => {
  val = parseFloat(val);
  let isScientific = isScientificNotation(val);
  if (isScientific) {
    val = ToFixed(val);
  }
  let isTrue = hasMoreThanTwoDecimalPlaces(val);
  if (isTrue) {
    val = truncateDecimals(val, 2);
  }
  isScientific = isScientificNotation(val);
  if (isScientific) {
    val = ToFixed(val);
  }
  return val;
};

var formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export const CurrencyFormattor = (value) => {
  return formatter.format(value);
};

export const formatDate = (date) => {
  return date ? moment(date).format(GENERIC_CONSTANTS.DATE_TIME_FORMAT) : "";
};

export const formatDateOnly = (date) => {
  return date ? moment(date).format(GENERIC_CONSTANTS.DATE_FORMAT) : "";
};

export const formatDateFromNow = (date) => {
  return date ? moment(date).fromNow() : "";
};

export const formatDateDayMonthYear = (date) => {
  return date
    ? moment(date).format(GENERIC_CONSTANTS.DATE_FORMAT_DAY_MONTH_YEAR)
    : "";
};

export const formatFullDate = (date) => {
  return date
    ? moment(date).format(GENERIC_CONSTANTS.DATE_FORMAT_COMPLETE)
    : "";
};

export const capitalizeText = (val) => {
  return val ? val.charAt(0).toUpperCase() + val.slice(1) : "";
};

export const txIdUrl = (path, currency) => {
  return path.split("/").length > 1
    ? path
    : `https://www.blockchain.com/explorer/transactions/${currency || "btc"}/${path}`;
};

export const walletAddressUrl = (path, currency) => {
  return path.split("/").length > 1
    ? path
    : `https://www.blockchain.com/explorer/addresses/${currency || "btc"}/${path}`;
};

export const getKycStatus = (level) => {
  return {
    badge:
      level === 1
        ? BADGE_TYPES.INFO
        : level === 2
          ? BADGE_TYPES.WARNING
          : level === 3
            ? BADGE_TYPES.SUCCESS
            : BADGE_TYPES.DANGER,
    title:
      level === 1
        ? KYC_STATUS.NOT_VERIFIED
        : level === 2
          ? KYC_STATUS.IN_PROGRESS
          : level === 3
            ? KYC_STATUS.APPROVED
            : KYC_STATUS.REJECTED,
  };
};

export const BSBRegex = (e) => {
  let value = e;
  if (value.charAt(3) === "-") {
    value = value.replace(/\D/g, "");
    value = value.substring(0, 3) + "-" + value.substring(3);
  } else {
    value = value.replace(/\D/g, "");
  }

  if (value.length > 3 && value.charAt(3) !== "-") {
    value = value.substring(0, 3) + "-" + value.substring(3);
  }

  return value;
};

//Roles

export const roleAction = {
  USER_DEPOSIT_THRESHOLD_LIMIT: "UserDepositThresholdLimit",
  ADMIN_ACTIONS: "adminActions",
  COIN_ADD_NEW: "coinAddNew",
  COIN_ENABLE_DISABLE: "coinEnableDisable",
  PENDING_DEPOSIT_UPDATE_CONTACT_EMAIL: "pendingDepositUpdateContactEmail",
  WITHDRAW_APPROVE_REJECT: "withdrawApproveReject",
  BUY_ASSET_APPROVE_REJECT: "buyAssetApproveReject",
  WITHDRAW_ASSET_APPROVE_REJECT: "withdrawAssetApproveReject",
  ORGANIZATION_CREATE: "organizationCreate",
  ORGANIZATION_UPDATE: "organizationUpdate",
};

export const methods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const AdminUrls = {
  fetchAdminsUrl: "/admin/admins?page={page}&limit={OFFSET}&query={search}",
  fetchAdminProfileUrl: "/admins/settings",
  changeUserPasswordUrl: "/admins/settings/changePassword",
  updateProfile: "/admins/settings",
  verifyResetTwoFAUrl: "/admins/settings/verifyResetTwoFa",
  getResetTwoFAUrl: "/admins/settings/resetTwoFa",
  verifyTwoFactorUrl: "/admin/admins/verifyTwoFA",
  verifyTwoFaUrl: "/admins/settings/verifyTwoFa",
  disableTwoFAUrl: "/admin/admins/disableTwoFa",
  fetchActivitiesUrl:
    "/admins/activities?page={page}&offset={OFFSET}&searchQuery={search}",
  deleteAdminUrl: "/admin/admins?id={id}",
  suspendRecoverAdminUrl: "/admin/admins/manage-suspension/",
  sendVerificationMailUrl: (id) => {
    return `/admin/admins/send-verification-mail/${id}`;
  },
  createOrUpdateAdminUrl: "/admin/admins",
  fetchApiKeysUrl: "/admin/apiKeys?page={page}&offset={OFFSET}&search={search}",
  apiKeyToggleUrl: (id) => {
    return `/admin/apiKeys/${id}`;
  },
  generateApiKeyUrl: (id) => {
    return `/admin/apiKeys/generate/${id}`;
  },
  createApiKeyUrl: "/admin/apiKeys/",
  editApiKeyUrl: (id) => {
    return `/admin/apiKeys/${id}`;
  },
  fetchCoinUrl: "/admin/coins",
  fetchCoinHistoryUrl:
    "/admin/coins/coinsHistory?page={page}&offset={OFFSET}&searched={search}",
  coinActivationUrl: (id) => {
    return `/admin/coins/activation/${id}`;
  },
  createCoinUrl: "/admin/coins/",
  editFactorUrl: (id) => {
    return `/admin/coins/factor/${id}`;
  },
  reserveHistoryUrl:
    "/admin/reserve-history?page={page}&offset={OFFSET}&searched={search}",
  rollingHistoryUrl:
    "/admin/rolling-history?page={page}&offset={OFFSET}&searched={search}",
  transactionSummary: "/admins/dashboard/transactionSummary",
  dashboardChartUrl:
    "/admins/dashboard/dashBoardCharts?startDate={startDate}&endDate={endDate}",
  getBalanceForDashboardUrl: "/admins/dashboard/getBalances",
  dashboardDetailUrl: "/admins/dashboard/dashBoardDetails",
  dashboardPendingDepositUrl: "/admins/dashboard/pendingTransactions",
  approveOrRejectDepositUrl: (id) => {
    return `/admins/transactions/updateDeposit/${id}`;
  },
  fetchDepositUrl:
    "/admins/transactions/deposits?page={page}&offset={OFFSET}&search={search}",
  fetchPendingDepositUrl:
    "/admins/transactions/pendingDeposits?page={page}&offset={OFFSET}&search={search}",
  fetchBatchWithdrawalsUrl:
    "/admins/transactions/withdrawals/batch?page={page}&offset={OFFSET}&search={search}",
  fetchWithdrawalsTransactionsUrl:
    "/admins/transactions/withdrawals/withdraw?page={page}&offset={OFFSET}&search={search}",
  fetchWithdrawalsTransactionsByBatchIdUrl:
    "/admins/transactions/withdrawals/withdraw/",
  generateDepositCsvUrl: "/admins/transactions/generateDepositCsv",
  generatePendingDepositUrl: "/admins/transactions/generatePendingDepositCsv",

  fetchEddTransactionUrl:
    "/admins/edd-verifications?page={page}&offset={OFFSET}&search={search}",
  sendEmailOfTypeForEddUrl: (id) =>
    `/admins/edd-verifications/send-email/${id}`,
  addNotesForEddUrl: (id) => `/admins/edd-verifications/update-note/${id}`,
  contactEmailUrl: "/admin/users/contact-email",
  addVideoLinkUrl: (id) => `/admins/edd-verifications/update-link/${id}`,
  deleteWithDrawalUrl: (id) => {
    return `/admin/withdrawals/${id}`;
  },
  editWithdrawalStatusUrl: (batchId) => {
    return `/admins/transactions/withdrawals/proceedWithdraw/${batchId}`;
  },
  fetchUsersWallets: "/admins/users/usersWallets",
  createUserUrl: "/admin/users/",
  editUserUrl: (id) => {
    return `/admins/users/${id}`;
  },
  createWithdrawal: "/admins/transactions/withdrawals",
  editWithdrawalUrl: (batchId) => {
    return `/admins/transactions/withdrawals/${batchId}`;
  },
  fetchRtgsImtPaymentsUr:
    "/admin/swiftPayments?page={page}&offset={OFFSET}&search={search}",
  rtgsImtPaymentStatusUrl: "/admin/swiftPayments/status",
  buyAssetStatusUrl: (id, status) => {
    return `/admin/trades/updateBuyAsset/${id}/${status}`;
  },
  fetchCryptoTransactionHistoryUrl:
    "/admin/trades/{side}?page={page}&offset={OFFSET}&search={search}",
  generateTradeCsv: (side) => {
    return `/admin/trades/generateTradesCsv/${side}`;
  },
  fetchingAllUsers: "/admin/users?page={page}&limit={OFFSET}&query={search}",
  suspendOrRecoverUser: "/admin/users/manage-suspension/",
  deleteUser: "/admin/users?id={id}",
  userSendVerificationMailUrl: (id) => {
    return `/admin/users/send-verification-mail/${id}`;
  },
  userVerifyEddUrl: (id) => {
    return `/admins/users/edd-status/${id}`;
  },
  resetUserBank: (id) => {
    return `/admins/users/bank-reset/${id}`;
  },
  resetUserPassword: (id) => {
    return `/admin/users/reset-password-mail/${id}`;
  },
  createUserBankAccount: (id) => {
    return `/admin/users/create-bank-account/${id}`;
  },
  fetchUserByIdUrl: (id) => {
    return `/admin/users/${id}`;
  },
  fetchUserLogsUrl:
    "/admin/userLogs?page={page}&offset={OFFSET}&searchQuery={search}&userId={id}",
  fetchUserActivitiesUrl: (id, page, OFFSET, search) => {
    return `/admin/users/activities/${id}?page=${page}&offset=${OFFSET}&searchQuery=${search ? encodeURIComponent(search) : ""}`;
  },
  fetchUserWithdrawalUrl: (id, page, OFFSET, search) => {
    return `/admin/users/withdrawals/${id}?page=${page}&offset=${OFFSET}&searched=${search ? encodeURIComponent(search) : ""}`;
  },
  fetchUserDepositUrl: (id, page, OFFSET, search) => {
    return `/admin/users/deposits/${id}?page=${page}&offset=${OFFSET}&searched=${search ? encodeURIComponent(search) : ""}`;
  },
  fetchSideTradeUrl: (side, page, OFFSET, search, userId) => {
    return `/admin/trades/${side}?page=${page}&offset=${OFFSET}&search=${search ? encodeURIComponent(search) : ""}&userId=${userId}`;
  },
  kycStatusChangeUrl: (id) => {
    return `/admins/users/change-kyc-status/${id}`;
  },
  fetchTransactionsUrl: (page, OFFSET, search) => {
    return `/admins/transactions/?page=${page}&offset=${OFFSET}&searched=${search}`;
  },

  updateTransactionStatus: (id) => {
    return `/admins/transactions/approveTransaction/${id}`;
  },
  fetchRecentTransactions: "/admins/transactions/?page=1&offset=10",
  fetchAllTransactionFee: "/admins/transactions/getAllTransactionFee",
  updateFee: "/admins/settings/updateTransactionFee",
  fetchAllUsers: (page, offset, search) => {
    return `/admins/users?page=${page}&offset=${offset}&searched=${search ? encodeURIComponent(search) : ""}`;
  },
  getUserTransactions: (id) => {
    return `/admins/transactions/getUserTransactions/${id}`;
  },
  resetPassword: (id) => {
    return `/admins/users/reset-password/${id}`;
  },
  resendEmail: (id) => {
    return `/admins/users/resend-verification/${id}`;
  },
  manageSuspension: (id) => {
    return `/admins/users/manage-suspension/${id}`;
  },
  fetchTransactionsUrl: (page, OFFSET, search) => {
    return `/admins/transactions/?page=${page}&offset=${OFFSET}&searched=${search ? encodeURIComponent(search) : ""}`;
  },
  generateDepositBank: (id) => {
    return `/admins/users/generate-deposit-bank/${id}`;
  },
};

export const AuthUrls = {
  forgetPasswordUrl: "/auth/forgotPassword",
  loginUrl: "/auth",
  registerUrl: "/auth/register",
  userEmailStatusUrl: "/auth/status/email",
  generateTwoFaUrl: (id) => {
    return `/auth/generateTwoFa/${id}`;
  },
  enableTwoFaUrl: "/auth/enableTwoFaAndLogin",
  scheduleMeetingUrl: "/calendly/schedule",
  checkEventSlotUrl: "/calendly/check",
  confirmationUrl: "/auth/confirmation",
  resetPasswordUrl: "/auth/resetPassword",
  verifyTwoFaAndLoginUrl: "/auth/verifyTwoFaAndLogin",
  logoutUrl: "/auth/logout",
  resendEmailVerification: "/auth/resend-verification-email",
};

export const UserUrls = {
  userProfileUrl: "/users/profile",
  getSumSubTokenUrl: "/users/profile/sumsubtoken?id={id}",
  updateKycLevelUrl: "/users/profile/changeKYCLevel",
  changeUserEmailUrl: "/users/profile/changeEmail",
  changeUserPasswordUrl: "/users/profile/changePassword",
  userResetTwoFaUrl: "/users/profile/resetTwoFa",
  verifyResetTwoFaUrl: "/users/profile/verifyResetTwoFa",
  verifyCurrentPasswordUrl: "/users/profile/verifyCurrentPassword",
  verifyChangeEmailUrl: (token, verificationCode) => {
    return `/auth/verifyChangeEmail/${token}?verificationCode=${verificationCode}`;
  },
  fetchUserLogsUrls:
    "/users/userLogs?page={page}&offset={OFFSET}&searchQuery={search}",
  fetchUserActivitiesUrl:
    "/users/activities?page={page}&offset={OFFSET}&searchQuery={search}",
  fetchCoinPriceUrl: (uuid) => {
    return `/users/coins/coinPrice/${uuid}`;
  },
  userBuyTradeUrl: "/users/trades/buy",
  userSellTradeUrl: "/users/trades/sell",
  userWithDrawTradeUrl: "/users/trades/withdraw",
  createDepositWalletUrl: "/users/wallets/createDepositWallet",
  createWithdrawalWalletUrl: "/users/wallets/createWithdrawalWallet",
  updateWithDrawBankUrl: (id) => {
    return `/users/profile/bankAccount/withdraw/${id}`;
  },
  fetchCryptoTransactionUrl: (side, page, offset, search) => {
    return `/users/trades/${side}?page=${page}&offset=${offset}&search=${search}`;
  },
  fetchFiatTransactionUrl: (side, page, offset, search) => {
    return `/users/transactions/${side}?page=${page}&offset=${offset}&searched=${search}`;
  },
  createFiatWithdraw: "/users/transactions/withdraws",
  userBalanceUrl: "/users/wallets/getBalance",
  getTransactionFeeUrl: "/users/wallets/getTransactionFee",
  userCryptoBalanceUrl: "/users/profile/cryptoBalance",
  fetchCoinUrl: "/users/coins",
  fetchAllCoinUrl: "/users/coins/all",
  userFetchTradeUrl: "/users/trades",
  fetchBankDetailUrl: "/users/profile/bankDetail",
  fetchingRecipientEmail: `/users/recipients/getRecipientByEmail`,
  createRecipient: "/users/recipients",
  deleteRecipientUrl: (id) => {
    return `/users/recipients/${id}`;
  },
  fetchRecipientsUrl:
    "/users/recipients?page={page}&offset={OFFSET}&searched={search}",
  fetchTransactionsUrl:
    "/users/recipients/getRecipientTransactions?recipientId={recipientId}&page={page}&offset={OFFSET}&searched={search}",
  fetchWalletsUrl: "/users/wallets",
  fetchCurrencyUrl: (role) =>
    `/${role === "user" ? "users" : "admins"}/currencies`,
  fetchUserTransactionUrl: (page, offset, search) => {
    return `/users/transactions?page=${page}&offset=${offset}&searched=${search}`;
  },
  fetchIncomeOutcome: "/users/transactions/income-outcome",
  fetchRecentTransactions: "/users/transactions?page=1&offset=10",
  generateWithdrawTransactionsCSV: "/users/transactions/withdrawals/generate",
  createTransferRequest: "/users/transactions/transfer",
};

export const rolePermissionRestricted = {
  super: [],
  supervisor: [
    roleAction.USER_DEPOSIT_THRESHOLD_LIMIT,
    roleAction.PENDING_DEPOSIT_UPDATE_CONTACT_EMAIL,
    roleAction.WITHDRAW_APPROVE_REJECT,
    roleAction.BUY_ASSET_APPROVE_REJECT,
    roleAction.WITHDRAW_ASSET_APPROVE_REJECT,
  ],
  admin: [
    roleAction.USER_DEPOSIT_THRESHOLD_LIMIT,
    roleAction.ADMIN_ACTIONS,
    roleAction.COIN_ADD_NEW,
    roleAction.COIN_ENABLE_DISABLE,
    roleAction.PENDING_DEPOSIT_UPDATE_CONTACT_EMAIL,
    roleAction.WITHDRAW_APPROVE_REJECT,
    roleAction.BUY_ASSET_APPROVE_REJECT,
    roleAction.WITHDRAW_ASSET_APPROVE_REJECT,
    roleAction.ORGANIZATION_CREATE,
    roleAction.ORGANIZATION_UPDATE,
  ],
};

export const isAuthorizedAction = (action = "", permissions = []) => {
  if (!action) return false;
  const role = getLocalStorageItem(encryptedKeys.userInfo)?.role;
  if (role?.toLowerCase() === ROLES.SUPER_ADMIN) return true;
  else return permissions && permissions.includes(action);
};

export const isAuthorized = (action = "") => {
  const role = getLocalStorageItem(encryptedKeys.userInfo)?.role;
  return !rolePermissionRestricted[role].includes(action);
};

export const redirectName = (name = "", role = ROLES.USER, id = "") => {
  return (
    <span>
      <ToolTip title={name} placement="left">
        <Link
          to={
            role === ROLES.USER
              ? id
                ? `${AdminRoutes.USERS}?userId=${id}`
                : AdminRoutes.USERS
              : AdminRoutes.ADMINS
          }
        >
          {name}
        </Link>
      </ToolTip>
    </span>
  );
};

export const Logout = async () => {
  authLogout();
  await ClearSession();
  window.location = "/login";
};

export const encryptedKeys = {
  token: "X7gF9Lm",
  user: "r8kT2Vb",
  permissions: "W9hP1Qs",
  userInfo: "y3dN6Jw",
  loginKey: "L7kD5Xt",
  maintenanceDate: "T1wN6Qy",
};
