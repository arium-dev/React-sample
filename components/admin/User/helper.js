import _ from "lodash";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { parseUrl } from "../../../ExecuteHttpRequest/helper";
import {
  AdminUrls,
  FormatTwoDecimals,
  isAuthorizedAction,
  KYC_STATUS,
  methods,
} from "../../../utils";
import {
  GENERIC_MESSAGES,
  GenericConstant,
  HTTP_STATUS_CODE,
  KYC_STATUS_LEVEL,
  OFFSET,
  PERMISSIONS,
  TOGGLE_VARIANT,
} from "../../../utils/Constants";
import { error, success } from "../../shared/Alert";
import { sweetAlert } from "../../shared/ConfirmBox";
import {
  _EDIT,
  _RECOVER_USER,
  _RESEND_EMAIL,
  _RESET_PASSWORD,
  _SUSPEND_USER,
  EEDD_STATUS,
  EEDD_STATUS_DESC,
  GET_MANAGE_SUSPEND_USER_DESC,
  GET_MANAGE_SUSPEND_USER_HEADING,
  RESEND_EMAIL_DESC,
  RESEND_EMAIL_HEADING,
  RESET_BANK,
  RESET_BANK_DESC,
  RESET_PASSWORD_DESC,
  RESET_PASSWORD_HEADING,
  SUSPENDED,
  VERIFIED,
} from "./constants";
import { CONFIRM } from "../../shared/Constants";

export const initialUsersValue = (searchParams) => {
  return {
    list: [],
    loading: true,
    page: 1,
    offset: OFFSET,
    search: searchParams ? searchParams : "",
    total: 0,
  };
};

export const fetchRecipientHandler = async (page, search, setData) => {
  let url = parseUrl(AdminUrls.fetchAllUsers(page, OFFSET, search));

  let resp = await ExecuteHttpRequest(methods.GET, url);

  if (resp.status === HTTP_STATUS_CODE.OK) {
    setData((prev) => ({
      ...prev,
      total: resp?.data?.count || 0,
      loading: false,
      list: resp?.data?.list || [],
      page,
    }));
  } else {
    setData((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const fetchUsers = async (page, search, setData) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));
    await fetchRecipientHandler(page, search, setData);
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: [], total: 0, page }));
  }
};

export const headerUsersValues = [
  { type: "string", name: "Name", value: "name" },
  { type: "string", name: "Account", value: "account" },
  { type: "string", name: "Currency", value: "currency" },
  { type: "string", name: "Edd Status", value: "eddStatus" },
  { type: "string", name: "Bank Status", value: "bankStatus" },
  { type: "string", name: "KYC Status", value: "kycStatus" },
  { type: "string", name: "Action", value: "action" },
];

export const getUserName = (user) => {
  return `${user?.firstName} ${user?.lastName}`;
};

export const getUserEmail = (user) => {
  return user?.email;
};

export const getUserBsb = (user) => {
  return user?.wallet?.data?.bsb;
};

export const getUserAccountNumber = (user) => {
  return user?.wallet?.data?.accountNumber || "";
};

export const getMenuActions = (user, permissions) => {
  if (!user.status) {
    return [
      isAuthorizedAction(
        PERMISSIONS.RESEND_SET_PASSWORD_EMAIL_USER,
        permissions
      ) && {
        value: "resendVerification",
        name: "Resend Verification",
      },
      isAuthorizedAction(PERMISSIONS.EDIT_USER, permissions) && {
        value: "edit",
        name: "Edit",
      },
    ].filter(Boolean);
  } else if (user.status === VERIFIED) {
    return [
      isAuthorizedAction(PERMISSIONS.SUSPEND_USER, permissions) && {
        value: "suspendUser",
        name: "Suspend User",
      },
      isAuthorizedAction(
        PERMISSIONS.RESEND_RESET_PASSWORD_EMAIL_USER,
        permissions
      ) && {
        value: "resetPassword",
        name: "Reset Password",
      },
      isAuthorizedAction(PERMISSIONS.EDIT_USER, permissions) && {
        value: "edit",
        name: "Edit",
      },
    ].filter(Boolean);
  } else if (user?.status === SUSPENDED) {
    return [
      isAuthorizedAction(PERMISSIONS.UNSUSPEND_USER, permissions) && {
        value: "recoverUser",
        name: "Recover User",
      },
      isAuthorizedAction(
        PERMISSIONS.RESEND_RESET_PASSWORD_EMAIL_USER,
        permissions
      ) && {
        value: "resetPassword",
        name: "Reset Password",
      },
      isAuthorizedAction(PERMISSIONS.EDIT_USER, permissions) && {
        value: "edit",
        name: "Edit",
      },
    ].filter(Boolean);
  }
};

const verifyStatus = (userId, setUsers) => {
  setUsers((prev) => ({
    ...prev,
    list: prev.list.map((user) =>
      user?._id === userId ? { ...user, eddVerified: !user.eddVerified } : user
    ),
  }));
};

const verifyEddHandler = async (userId, setUsers) => {
  try {
    verifyStatus(userId, setUsers);

    const resp = await ExecuteHttpRequest(
      methods.PUT,
      AdminUrls.userVerifyEddUrl(userId)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      success(resp.message);
    } else {
      verifyStatus(userId, setUsers);

      error(resp?.message);
    }
  } catch (err) {
    verifyStatus(userId, setUsers);
    error(err?.message);
  }
};

export const handleEddVerify = async (userId, setUsers) => {
  if (userId) {
    await sweetAlert(
      EEDD_STATUS,
      EEDD_STATUS_DESC,
      userId,
      GenericConstant.CONFIRM
    )
      .then(async () => {
        await verifyEddHandler(userId, setUsers);
      })
      .catch((err) => {});
  }
};

const resetBankStatus = (userId, setUsers, loading) => {
  setUsers((prev) => ({
    ...prev,
    list: prev.list.map((user) =>
      user?._id === userId
        ? {
            ...user,
            withdrawWallet: {
              ...user.withdrawWallet,
              loadingBank: loading,
            },
          }
        : user
    ),
  }));
};

const resetBankHandler = async (userId, setUsers) => {
  try {
    resetBankStatus(userId, setUsers, true);
    const resp = await ExecuteHttpRequest(
      methods.PUT,
      AdminUrls.resetUserBank(userId)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      success(resp.message);

      setUsers((prev) => ({
        ...prev,
        list: prev.list.map((user) =>
          user?._id === userId
            ? {
                ...user,
                withdrawWallet: {},
              }
            : user
        ),
      }));
    } else {
      error(resp?.message);
      resetBankStatus(userId, setUsers, false);
    }
  } catch (err) {
    resetBankStatus(userId, setUsers, false);
    error(err?.message);
  }
};

export const handleResetWithdrawBank = (userId, setUsers) => {
  sweetAlert(RESET_BANK, RESET_BANK_DESC, userId, GENERIC_MESSAGES.RESET)
    .then(async () => {
      await resetBankHandler(userId, setUsers);
    })
    .catch((err) => {});
};

const generateBankStatus = (userId, setUsers, loading) => {
  setUsers((prev) => ({
    ...prev,
    list: prev.list.map((user) =>
      user?._id === userId
        ? {
            ...user,
            wallet: {
              ...user?.wallet,
              loadingBank: loading,
            },
          }
        : user
    ),
  }));
};

const generateDepositBankHandler = async (userId, setUsers) => {
  try {
    generateBankStatus(userId, setUsers, true);

    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.generateDepositBank(userId)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      success(resp.message);

      setUsers((prev) => ({
        ...prev,
        list: prev.list.map((user) =>
          user?._id === userId
            ? {
                ...user,
                wallet: resp?.data,
              }
            : user
        ),
      }));
    } else {
      error(resp?.message);
      generateBankStatus(userId, setUsers, false);
    }
  } catch (err) {
    generateBankStatus(userId, setUsers, false);
    error(err?.message);
  }
};

export const handleGenerateDepositBank = async (userId, setUsers) => {
  await generateDepositBankHandler(userId, setUsers);
};

export const initialTransactionsValue = {
  list: [],
  loading: true,
  page: 0,
  offset: OFFSET,
  search: "",
  total: 0,
};

export const fetchTransactionsByUserHandler = async (
  userId,
  page,
  search = "",
  setTransactions
) => {
  try {
    let url = parseUrl(AdminUrls.getUserTransactions(userId));

    let resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setTransactions((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list:
          page === 1
            ? resp?.data?.list
            : _.uniqBy([...prev.list, ...resp?.data?.list], "_id"),

        page,
      }));
    } else {
      setTransactions((prev) => ({
        ...prev,
        loading: false,
        list: [],
        total: 0,
        page,
      }));
    }
  } catch (err) {
    setTransactions((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const toggleCollapse = (id, setData) => {
  setData((prev) => ({
    ...prev,
    list:
      prev?.list?.length > 0 &&
      prev.list.map((user) =>
        user._id === id ? { ...user, collapsed: !user.collapsed } : user
      ),
  }));
};

export const headerTransactionValues = [
  { type: "string", name: "Price", value: "price" },
  { type: "string", name: "Date", value: "date" },
  { type: "string", name: "Status", value: "status" },
];

const exchangeAmount = (amount, conversionRate) => {
  let multiply = amount * conversionRate;
  return FormatTwoDecimals(multiply);
};

export const exchangeCurrencyPrice = (userId, transaction) => {
  if (userId === transaction.userId) {
    return exchangeAmount(
      parseFloat(transaction?.amount),
      parseFloat(transaction?.conversionRate)
    );
  } else {
    return exchangeAmount(
      parseFloat(transaction?.transactionDetails?.amount),
      parseFloat(transaction?.conversionRate)
    );
  }
};

export const getStatus = (status) => {
  if (status === GenericConstant._PENDING_INVITATION)
    return GenericConstant.PENDING_INVITATION;
  else return status;
};

export const sourceCurrencyPrice = (userId, transaction) => {
  if (userId === transaction.userId) {
    return FormatTwoDecimals(transaction?.amount);
  } else {
    return FormatTwoDecimals(transaction?.transactionDetails?.amount);
  }
};

const resetPasswordHandler = async (id) => {
  try {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.resetPassword(id)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      success(resp.message);
    } else {
      error(resp?.message);
    }
  } catch (err) {
    error(err?.message);
  }
};

const resendEmailHandler = async (id) => {
  try {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.resendEmail(id)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      success(resp.message);
    } else {
      error(resp?.message);
    }
  } catch (err) {
    error(err?.message);
  }
};

const manageSuspensionHandler = async (id, action, setUsers) => {
  try {
    const resp = await ExecuteHttpRequest(
      methods.PUT,
      AdminUrls.manageSuspension(id),
      { status: action === _SUSPEND_USER ? "suspend" : "recover" }
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setUsers((prev) => ({
        ...prev,
        list: prev.list.map((user) =>
          user?._id === id
            ? {
                ...user,
                status: action === _SUSPEND_USER ? "suspended" : "verified",
              }
            : user
        ),
      }));
      success(resp.message);
    } else {
      error(resp?.message);
    }
  } catch (err) {
    error(err?.message);
  }
};

export const userActionHandler = async (action, value, setUsers, setUser) => {
  if (action === _RESET_PASSWORD) {
    await sweetAlert(
      RESET_PASSWORD_HEADING,
      RESET_PASSWORD_DESC,
      value,
      CONFIRM
    )
      .then(async () => {
        await resetPasswordHandler(value?._id);
      })
      .catch((err) => {});
  } else if (action === _RESEND_EMAIL) {
    await sweetAlert(RESEND_EMAIL_HEADING, RESEND_EMAIL_DESC, value, CONFIRM)
      .then(async () => {
        await resendEmailHandler(value?._id);
      })
      .catch((err) => {});
  } else if (action === _SUSPEND_USER || action === _RECOVER_USER) {
    await sweetAlert(
      GET_MANAGE_SUSPEND_USER_HEADING(action),
      GET_MANAGE_SUSPEND_USER_DESC(action),
      value,
      CONFIRM
    )
      .then(async () => {
        await manageSuspensionHandler(value?._id, action, setUsers);
      })
      .catch((err) => {});
  } else if (action === _EDIT) {
    setUser((prev) => ({ isOpen: true, user: value }));
  }
};

export const isDepositBankExists = (user) => {
  return user?.wallet?.data?.accountNumber && user?.wallet?.data?.bsb;
};

export const initialUserValue = {
  isOpen: false,
  user: null,
};

export const getKycStatus = (level) => {
  let kycStatuses = [
    { status: KYC_STATUS.REJECTED, variant: TOGGLE_VARIANT.DANGER },
    { status: KYC_STATUS.NOT_VERIFIED, variant: TOGGLE_VARIANT.DANGER },
    { status: KYC_STATUS.PENDING, variant: TOGGLE_VARIANT.WARNING },
    { status: KYC_STATUS.VERIFIED, variant: TOGGLE_VARIANT.SUCCESS },
  ];
  return kycStatuses[level];
};

export const kycStatusActionValues = [
  { id: KYC_STATUS.REJECTED, label: "Rejected" },
  { id: KYC_STATUS.NOT_VERIFIED, label: "Not Verified" },
  { id: KYC_STATUS.PENDING, label: "Pending" },
  { id: KYC_STATUS.VERIFIED, label: "Verified" },
];

export const updateKycHandler = async (status, user, setData) => {
  await sweetAlert()
    .then(async () => {
      setData((prev) => ({
        ...prev,
        list: prev.list.map((prevUser) =>
          prevUser._id === user._id
            ? {
                ...prevUser,
                kycLoading: true,
              }
            : prevUser
        ),
      }));

      const payload = {
        level: KYC_STATUS_LEVEL.get(status.toLowerCase()),
      };

      const resp = await ExecuteHttpRequest(
        methods.PUT,
        AdminUrls.kycStatusChangeUrl(user?._id),
        payload
      );

      if (resp.status === 200) {
        success(resp?.message);

        setData((prev) => ({
          ...prev,
          list: prev.list.map((prevUser) =>
            prevUser._id === user._id
              ? {
                  ...prevUser,
                  kycLoading: false,
                  level: KYC_STATUS_LEVEL.get(status.toLowerCase()),
                }
              : prevUser
          ),
        }));
      } else {
        setData((prev) => ({
          ...prev,
          list: prev.list.map((prevUser) =>
            prevUser._id === user._id
              ? {
                  ...prevUser,
                  kycLoading: false,
                }
              : prevUser
          ),
        }));
        error(resp.message);
      }
    })
    .catch((err) => {});
};
