import { parseUrl } from "../../../../ExecuteHttpRequest/helper";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { AdminUrls, UserUrls, methods } from "../../../../utils";
import { GenericConstant, HTTP_STATUS_CODE } from "../../../../utils/Constants";
import { capitalize } from "lodash";

export const initialRecentTransactions = {
  loading: false,
  data: [],
};

export const fetchRecentTransactions = async (setData, userId) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    let url = parseUrl(AdminUrls.fetchRecentTransactions);
    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: resp?.data?.list || [],
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

export const recentTransactionTableHeader = [
  { name: "Sender", value: "sender" },
  { name: "Receiver", value: "receiver" },
  { name: "Transaction Fee", value: "transactionFee" },
  { name: "Price", value: "price" },
  { name: "Date", value: "date" },
  { name: "Status", value: "status" },
];

export const getStatus = (status) => {
  if (status === GenericConstant._PENDING_INVITATION)
    return GenericConstant.PENDING_INVITATION;
  else {
    return status ? capitalize(status) : "";
  }
};

export const getStatusColor = (status) => {
  return status === GenericConstant._PENDING
    ? GenericConstant._PENDING
    : status === GenericConstant._PENDING_INVITATION
      ? GenericConstant.PENDING_INVITATION
      : status === GenericConstant._APPROVED
        ? GenericConstant._RECEIVED
        : GenericConstant._REJECTED;
};
