import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { AdminUrls, methods, FormatTwoDecimals } from "../../../utils";
import {
  GenericConstant,
  HTTP_STATUS_CODE,
  OFFSET,
  TOGGLE_VARIANT,
} from "../../../utils/Constants";
import { sweetAlert } from "../../shared/ConfirmBox";
import { error, success } from "../../shared/Alert";
import * as Constants from "./constants";

export const headerValuesOrganization = [
  { type: Constants.STRING, name: Constants.SENDER, value: Constants._SENDER },
  { type: Constants.STRING, name: Constants.PRICE, value: Constants._PRICE },
  {
    type: Constants.STRING,
    name: Constants.RECEIVER,
    value: Constants._RECEIVER,
  },
  { type: Constants.STRING, name: Constants.DATE, value: Constants._DATE },
  { type: Constants.STRING, name: Constants.STATUS, value: Constants._STATUS },
];

export const defaultValues = {
  list: [],
  loading: false,
  page: 1,
  offset: OFFSET,
  search: "",
  total: 0,
};

export const fetchTransactions = async (page, search, setData) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.fetchTransactionsUrl(page, OFFSET, search)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list:
          resp?.data?.list && resp.data.list.length > 0
            ? resp.data.list.map((item) => ({
                ...item,
                statusLoading: false,
              }))
            : [],
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
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: [], total: 0, page }));
  }
};

export const recipientName = (userInfo) => {
  return `${userInfo?.firstName} ${userInfo?.lastName}`;
};

export const recipientEmail = (userInfo) => {
  return userInfo?.email;
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

export const getTransactionStatus = (status) => {
  const statusesArr = [
    { status: Constants.PENDING, variant: TOGGLE_VARIANT.WARNING },
    {
      status: GenericConstant._PENDING_INVITATION,
      variant: TOGGLE_VARIANT.WARNING,
    },
    { status: Constants.REJECTED, variant: TOGGLE_VARIANT.DANGER },

    { status: Constants.APPROVED, variant: TOGGLE_VARIANT.SUCCESS },
  ];

  return (
    statusesArr.find((kycStatus) => kycStatus.status === status) ||
    statusesArr[0]
  );
};

export const transactionStatusActionValues = [
  { id: Constants.APPROVED, label: Constants._APPROVED },
  //   { id: "pending", label: "Pending" },
  //   {
  //     id: GenericConstant._PENDING_INVITATION,
  //     label: GenericConstant.PENDING_INVITATION,
  //   },
  { id: Constants.REJECTED, label: Constants._REJECTED },
];

export const updateTransactionViewHandler = async (
  status,
  item,
  setTransactions
) => {
  await sweetAlert(
    Constants.ALERT,
    Constants.ALERT_HEADING,
    null,
    Constants.ALERT_CONFIRM_BTN
  )
    .then(async () => {
      setTransactions((prev) => ({
        ...prev,
        list:
          prev.list.length > 0 &&
          prev.list.map((transaction) => ({
            ...transaction,
            statusLoading: transaction?._id === item?._id ? true : false,
          })),
      }));
      const payload = {
        status: status.toLowerCase(),
      };
      const resp = await ExecuteHttpRequest(
        methods.PUT,
        AdminUrls.updateTransactionStatus(item?._id),
        payload
      );

      if (resp.status === 200) {
        success(resp?.message);
        setTransactions((prev) => ({
          ...prev,
          list:
            prev.list.length > 0 &&
            prev.list.map((transaction) =>
              transaction?._id === item?._id
                ? {
                    ...transaction,
                    status: status.toLowerCase(),
                    statusLoading: false,
                  }
                : transaction
            ),
        }));
      } else {
        setTransactions((prev) => ({
          ...prev,
          list:
            prev.list.length > 0 &&
            prev.list.map((transaction) =>
              transaction?._id === item?._id
                ? {
                    ...transaction,
                    statusLoading: false,
                  }
                : transaction
            ),
        }));
        error(resp.message);
      }
    })
    .catch((err) => {});
};
