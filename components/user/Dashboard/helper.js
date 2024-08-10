import { Badge } from "react-bootstrap";
import { ERRORS } from "../../../utils/validation/constants";
import * as z from "zod";
import { parseUrl } from "../../../ExecuteHttpRequest/helper";
import { UserUrls, methods } from "../../../utils";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { GenericConstant, HTTP_STATUS_CODE } from "../../../utils/Constants";
import { RECIPIENT_USER, SENDER_USER } from "./constants";
import { error } from "../../shared/Alert";

export const recentTransactionTableHeader = [
  { name: "Email", value: "email" },
  { name: "Price", value: "price" },
  { name: "Date", value: "date" },
  { name: "Status", value: "status" },
];

export const initialRecentTransactions = {
  loading: false,
  data: [],
};

export const getCurrencyExchangeInitialValues = (currency = "") => {
  return {
    destinationCurrency: currency,
    amountInAud: 0,
    currencyRate: currency?.conversionRate || 0,
    logo: currency?.logo,
    amountReceived: 0,
  };
};

export const currencyExchangeSchema = z.object({
  amountInAud: z
    .number({
      required_error: ERRORS.AMOUNT_REQUIRED,
      invalid_type_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
    })
    .positive(ERRORS.NON_ZERO_VALUE_REQUIRED),
  currencyRate: z
    .number({
      required_error: ERRORS.RATE_REQUIRED,
      invalid_type_error: ERRORS.NUMERICAL_VALUE_REQUIRED,
    })
    .positive(ERRORS.NON_ZERO_VALUE_REQUIRED),
});

export const initialIncomeOutcomeValues = {
  loading: false,
  data: [],
};

export const fetchIncomeOutcome = async (setData) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    let url = parseUrl(UserUrls.fetchIncomeOutcome);
    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        total: resp.total || resp.count || 0,
        loading: false,
        data: resp?.data,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: [],
        total: 0,
        page: 0,
      }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, data: [] }));
  }
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

export const fetchRecentTransactions = async (setData, userId) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    let url = parseUrl(UserUrls.fetchRecentTransactions);
    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: getUpdatedData(resp, userId),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, data: [] }));
  }
};

export const getName = (row) => {
  const key = row?.own ? RECIPIENT_USER : SENDER_USER;
  return row?.[key]?.firstName + " " + row?.[key]?.lastName;
};

export const getEmail = (row) => {
  const key = row?.own ? RECIPIENT_USER : SENDER_USER;
  return row?.[key]?.email;
};

export const generateDepositWallet = async (refresh, setLoading) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    UserUrls.createDepositWalletUrl
  );
  if (
    resp.status === HTTP_STATUS_CODE.OK &&
    resp.data &&
    resp.data.type &&
    resp.data.data
  ) {
    refresh();
    setLoading(false);
  } else {
    error(resp.message);
    setLoading(false);
  }
};
