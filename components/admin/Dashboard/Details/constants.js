import { PERMISSIONS } from "../../../../utils/Constants";

export const STATUS = {
  PENDING: "pending",
  REJECTED: "rejected",
  APPROVED: "approved",
  UN_APPROVED: "unApproved",
};

const INFO = [
  {
    title: "Total Users",
    key: "usersArr",
    value: "",
    url: "/admin/users",
  },
  {
    title: "Total Withdrawals",
    key: "totalWithdraws",
    value: "",
    url: "/admin/fiat-management?active=view_withdrawal",
  },
  {
    title: "Pending KYC",
    key: "pendingKyc",
    value: "",
    url: "/admin/users?search=not verified",
  },
  {
    title: "Uncleared Funds",
    key: "unclearFundCount",
    value: "",
    // url: "/admin/fiat-management?active=withdraw",
  },
];

const INFO_INITIAL = { loading: true, list: INFO };

const AMOUNT = [
  {
    title: "Deposit Amount",
    key: "totalPendingDepositAmount",
    value: "$0",
    url: "/admin/fiat-management?active=view_pending_deposit",
    action: PERMISSIONS.VIEW_PENDING_DEPOSIT,
  },
  {
    title: "Withdrawal Amount",
    key: "totalPendingWithdrawAmount",
    value: "$0",
    url: "/admin/fiat-management?active=view_withdrawal&search=pending",
    state: { search: STATUS.UN_APPROVED },
    action: PERMISSIONS.VIEW_WITHDRAWAL,
  },
];

const AMOUNT_INITIAL = { loading: true, list: AMOUNT };

const TRANSACTION = [
  {
    title: "Total Amount Sent",
    key: "totalAmountSent",
    value: "",
    url: "/admin/transaction-history",
  },
  {
    title: "Total Amount Received",
    key: "totalAmountReceived",
    value: "",
    url: "/admin/transaction-history",
  },
  {
    title: "Total Fee Collected",
    key: "totalFees",
    value: "",
    url: "/admin/transaction-history",
  },
];

const DEFAULT_TRANSACTION_SUMMARY = {
  loading: true,
  create: false,
  list: TRANSACTION,
};

const PENDING = "Pending";

const TRANSACTION_SUMMARY = "Transaction Summary";

export {
  INFO,
  INFO_INITIAL,
  AMOUNT,
  AMOUNT_INITIAL,
  TRANSACTION,
  DEFAULT_TRANSACTION_SUMMARY,
  PENDING,
  TRANSACTION_SUMMARY,
};
