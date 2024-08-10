import _ from "lodash";
import { FormatTwoDecimals } from "../../../utils";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { parseUrl } from "../../../ExecuteHttpRequest/helper";
import { methods, UserUrls } from "../../../utils";
import {
  GenericConstant,
  HTTP_STATUS_CODE,
  OFFSET,
  TRANSFER_STEP,
} from "../../../utils/Constants";
import { error } from "../../shared/Alert";
import {
  headerTransactionViewValues,
  RECIPIENT_USER,
  SENDER_USER,
} from "./constants";

export const getInitialRecipientValue = () => {
  return {
    list: [],
    loading: false,
    page: 1,
    offset: OFFSET,
    search: "",
    total: 0,
  };
};

const getUpdatedData = (resp, userId) => {
  return resp?.data?.list.length > 0
    ? resp?.data?.list.map((item) => {
        return {
          ...item,
          own: item?.userId === userId,
          status:
            item?.status === GenericConstant._APPROVED
              ? item?.userId === userId
                ? GenericConstant._SENT
                : GenericConstant._RECEIVED
              : item?.status,
        };
      })
    : [];
};

const fetchTransactionViewHandler = async (page, search, setData, userId) => {
  try {
    let url = parseUrl(UserUrls.fetchUserTransactionUrl(page, OFFSET, search));

    let resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list: getUpdatedData(resp, userId),
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
    setData((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const fetchRecipients = async (page, search, setData, userId) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    await fetchTransactionViewHandler(page, search, setData, userId);
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: [], total: 0, page }));
  }
};

export const handleTransferRequest = async (
  formData,
  setModal,
  handleRefreshBalance = () => {},
  handleRefresh
) => {
  setModal((prev) => ({ ...prev, loading: true }));
  const resp = await ExecuteHttpRequest(
    methods.POST,
    UserUrls.createTransferRequest,
    formData
  );

  setModal((prev) => ({ ...prev, loading: false }));
  if (resp.status === HTTP_STATUS_CODE.OK) {
    setModal((prev) => ({
      ...prev,
      loading: false,
      type: TRANSFER_STEP.GREETING,
      data: null,
      formData: null,
    }));

    setTimeout(() => {
      handleRefreshBalance();
    }, 1000);
    handleRefreshBalance();

    handleRefresh && handleRefresh();
  } else {
    error(resp?.message);
    setModal((prev) => ({ ...prev, loading: false }));
  }
};

export const recipientName = (recipientInfo) => {
  return `${recipientInfo?.firstName} ${recipientInfo?.lastName}`;
};

export const recipientEmail = (recipientInfo) => {
  return recipientInfo?.email;
};

export const getName = (row) => {
  const key = row?.own ? RECIPIENT_USER : SENDER_USER;
  return row?.[key]?.firstName + " " + row?.[key]?.lastName;
};

export const getEmail = (row) => {
  const key = row?.own ? RECIPIENT_USER : SENDER_USER;
  return row?.[key]?.email;
};

export const getTableHeader = () => headerTransactionViewValues;

export const fetchTransactionsByRecipientHandler = async (
  recipientId,
  page,
  search = "",
  setTransactions,
  userId
) => {
  try {
    let url = parseUrl(UserUrls.fetchTransactionsUrl, {
      page: page,
      OFFSET: OFFSET,
      search: search,
      recipientId: recipientId,
    });

    let resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      const updatedData = getUpdatedData(resp, userId);

      setTransactions((prev) => ({
        ...prev,
        total: resp?.data?.count || 0,
        loading: false,
        list:
          page === 1
            ? updatedData
            : _.uniqBy([...prev.list, ...updatedData], "_id"),

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

const exchangeAmount = (amount, conversionRate) => {
  let multiply = amount * conversionRate;
  return FormatTwoDecimals(multiply);
};

export const sourceCurrencyPrice = (userId, transaction) => {
  if (userId === transaction.userId) {
    return FormatTwoDecimals(transaction?.amount);
  } else {
    return FormatTwoDecimals(transaction?.transactionDetails?.amount);
  }
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
