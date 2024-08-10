import Amount1 from "../../../../images/amount1.svg";
import Amount2 from "../../../../images/amount2.svg";
import Amount3 from "../../../../images/amount3.svg";
import Amount4 from "../../../../images/amount4.svg";
import { isAuthorizedAction } from "../../../../utils";
import { PERMISSIONS } from "../../../../utils/Constants";
import { STATUS } from "../Details/constants";

const GET_CARDS = (permissions) => {
  let cards = [
    {
      title: "Total Amount Received",
      value: "totalDepositAmount",
      icon: Amount1,
      url: "/admin/fiat-management",
    },
    {
      title: "Total Amount Withdrawn",
      value: "totalWithdrawAmount",
      icon: Amount3,
      url: "/admin/fiat-management?active=view_withdrawal",
    },
  ];

  if (
    isAuthorizedAction(PERMISSIONS.VIEW_DEPOSIT_BALANCE_DASHBOARD, permissions)
  ) {
    cards.push({
      title: "Deposit Balance",
      value: "depositBalance",
      icon: Amount2,
      url: "/admin/fiat-management",
      state: { search: STATUS.APPROVED },
    });
  }

  if (
    isAuthorizedAction(
      PERMISSIONS.VIEW_WITHDRAWAL_BALANCE_DASHBOARD,
      permissions
    )
  ) {
    cards.push({
      title: "Withdrawal Balance",
      value: "withdrawBalance",
      icon: Amount4,
      url: "/admin/fiat-management?active=view_withdrawal",
      state: { search: STATUS.APPROVED },
    });
  }

  return cards;
};

const CARD_VALUES = {
  RECEIVED: "received",
  DEPOSIT: "deposit",
  WITHDRAWN: "withdrawn",
  WITHDRAWAL: "withdrawal",
};

const getCardInitials = (permissions) => {
  return { loading: true, list: GET_CARDS(permissions) };
};

export { CARD_VALUES, getCardInitials };
