import { BuyIcon, SellIcon, WithdrawIcon } from "../../../icons";

export const BATCH = "batch";
export const DEPOSIT = "deposit";
export const PENDING_DEPOSIT = "pending deposit";
export const WITHDRAW = "withdraw";
export const TRANSACTION = "transaction";
export const FIAT_MANAGEMENT = "Fiat Management";
export const APPROVED = "approved";
export const IN_PROGRESS = "inProgress";
export const PENDING = "pending";
export const REJECTED = "rejected";
export const ADD_NOTES = "Add Notes";
export const UPDATE_NOTES = "Update Notes";
export const ADD_VIDEO_CALL_LINK = "Add Video Call Link";
export const ADD_EMAIL = "Add Email";
export const CLICK_TO_RESCHEDULE = "Click to Reschedule";
export const NOTES = "note";
export const VIDEO_LINK = "link";
export const EMAIL = "email";
export const VISIT_LINK = "Click to visit Link";
export const SEND_EMAIL = "sendEmail";
export const WITHDRAWS = "Withdraws";
export const BSB = "BSB: ";
export const ACCOUNT_NUMBER = "Account Number: ";
export const ALERT = "Alert";
export const ALERT_HEADING = "Are you sure you want to do this action?";
export const ALERT_CONFIRM_BTN = "Confirm";
export const ENABLE_2FA_ERROR =
  "Please enable 2FA to approve the fiat withdrawal";
export const NOT_VERIFIED = "Not Verified";
export const KYC_PENDING = "Pending";
export const VERIFIED = "Verified";
export const STATUS = "status";
export const _APPROVED = "APPROVED";
export const _REJECTED = "REJECTED";
export const _NOT_VERIFIED = "not verified";
export const _VERIFIED = "verified";

export const KYC_STATUS = {
  NOT_VERIFIED: "Not Verified",
  IN_PROGRESS: "In Progress",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
};

export const TWELVE = 12;

export const ACTIVE = "active";
export const TRANSACTION_VIEW = "transactionView";
export const VIEW_AS_BATCH = "viewAsBatch";

export const DEPOSIT_TRANSACTION_CSV = "Deposit-Transactions.csv";
export const PENDING_DEPOSIT_TRANSACTION_CSV =
  "Pending-Deposit-Transactions.csv";

export const EDIT = "edit";
export const DELETE_WITHDRAW = "Delete Withdraw";
export const DELETE = "Delete";
export const WITHDRAW_DELETE_MESSAGE =
  "Are you sure you want to delete this withdraw?";
export const _DEPOSIT = "Deposit";
export const _PENDING_DEPOSIT = "Pending Deposit";
export const _LINK_TO_EDD = "Link to EDD";
export const _WITHDRAW = "Withdraw";
export const _EDIT = "Edit";

export const headerValuesDeposit = [
  { type: "string", name: "Date", value: "date" },
  { type: "string", name: "User", value: "user" },
  { type: "string", name: "Reference", value: "reference" },
  { type: "string", name: "Amount", value: "amount" },
  { type: "string", name: "Status", value: "status" },
];

export const headerValuesPendingDeposit = [
  { type: "string", name: "Date", value: "date" },
  { type: "string", name: "User", value: "user" },
  { type: "string", name: "Reference", value: "reference" },
  { type: "string", name: "Amount", value: "amount" },
  { type: "string", name: "Actions", value: "actions" },
];

export const headerValuesLinkToEdd = [
  { type: "string", name: "Date", value: "date" },
  { type: "string", name: "User", value: "user" },
  { type: "string", name: "EDD Status", value: "eddStatus" },
  { type: "string", name: "Email To Send", value: "emailToSend" },
  { type: "string", name: "Notes", value: "notes" },
  { type: "string", name: "Link To EDD", value: "videoLink" },
  { type: "string", name: "Reschedule Event", value: "rescheduleEvent" },
];

export const headerValuesWithdraws = [
  { type: "string", name: "Batch ID", value: "batchId" },
  { type: "string", name: "Submitted By", value: "submittedBy" },
  { type: "string", name: "Created At", value: "createdAt" },
  { type: "string", name: "Updated At", value: "updatedAt" },
  { type: "string", name: "Total Requests", value: "totalRequests" },
  { type: "string", name: "Total Amount", value: "totalAmount" },
  { type: "string", name: "Status", value: "status" },
  {
    type: "menu",
    name: "Action",
    value: "action",
  },
];

export const headerValuesWithdrawsRow = [
  { type: "string", name: "User", value: "user" },
  { type: "string", name: "Bank Details", value: "bankDetails" },
  { type: "string", name: "Reference ID", value: "referenceId" },
  { type: "string", name: "Created At", value: "createdAt" },
  { type: "string", name: "Updated At", value: "updatedAt" },
  { type: "string", name: "Amount", value: "amount" },
  { type: "string", name: "KYC", value: "kyc" },
  { type: "string", name: "Status", value: "status" },
  { type: "string", name: "	Receipt", value: "receipt" },
];

export const mainTabs = [
  {
    name: "Deposit",
    value: "deposit",
    icon: <BuyIcon className="tab-icon" />,
  },
  {
    name: "Pending Deposit",
    value: "pendingDeposit",
    icon: <SellIcon className="tab-icon" />,
  },
  {
    name: "Withdraw",
    value: "withdraw",
    icon: <WithdrawIcon className="tab-icon" />,
  },
];

export const pendingDepositEmailValues = [
  { id: "initialEmail", label: "Initial", status: 1 },
  { id: "followUpEmail", label: "Follow up", status: 2 },
  { id: "finalEmail", label: "Final", status: 3 },
];

export const pendingDepositActionValues = [
  { id: "approve", label: "Approve" },
  { id: "reject", label: "Reject" },
];

export const WithdrawTabs = [
  { title: "View as Batch", value: "viewAsBatch" },
  { title: "Transaction View", value: "transactionView" },
];
export const menuActions = [
  { value: "edit", name: "Edit" },
  { value: "delete", name: "Delete" },
];

export const calendlyScheduleEventUrl = (diff, uuid) => {
  return `https://calendly.com/app/scheduled_events/user/me?period=${
    diff >= 0 ? "upcoming" : "past"
  }&uuid=${uuid}`;
};
