import { UserUrls, formatDate, methods } from "../../../../utils";
import { success, error } from "../../../shared/Alert";
import Badge from "../../../shared/Badge";
import { capitalize } from "lodash";
import { OFFSET, HTTP_STATUS_CODE } from "../../../../utils/Constants";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import {
  WITHDRAWALS,
  PDF_FILE,
  ACCOUNT_NUMBER,
  BSB,
  CREATE_TRANSACTION_CSV,
  CSV_GENERATION_FAILURE,
} from "./constants";
import { mainTabs } from "../constants";

export const getDefaultTab = () => {
  return mainTabs[0].name.toLowerCase();
};
export const getInitialData = (side = "") => {
  return {
    side: side,
    list: [],
    loading: false,
    page: 1,
    offset: OFFSET,
    search: "",
    total: 0,
  };
};

const modifyDepositsTransactions = (data) => {
  return data.map((item) => {
    return {
      id: item?.id || item?._id,
      reference: item?.reference || "-",
      amount: `$${item?.amount}`,
      date: formatDate(item?.createdAt),
      status: <Badge status={item?.status}>{capitalize(item?.status)}</Badge>,
    };
  });
};

const modifyWithdrawalsTransactions = (data) => {
  return data.map((item) => {
    return {
      ...item,
      bank: (
        <div>
          <div className="d-flex">
            <span className="fw-bold me-1">{BSB}</span>
            <span>{item.bsb}</span>
          </div>
          <div className="d-flex">
            <span className="fw-bold me-1">{ACCOUNT_NUMBER}</span>
            <span>{item.accountNumber}</span>
          </div>
        </div>
      ),
      receipt: item.receipt ? (
        <a href={item.receipt} rel="noreferrer" target="_blank">
          {PDF_FILE}
        </a>
      ) : (
        "-"
      ),
      amount: `$${item.amount}`,
      createdAt: formatDate(item.createdAt),
      status: <Badge status={item.status}>{capitalize(item.status)}</Badge>,
    };
  });
};

const modifyData = {
  deposits: modifyDepositsTransactions,
  withdrawals: modifyWithdrawalsTransactions,
};

// fetch fiat transactions on the base of side(deposit/withdraw)
export const fetchFiatTransactionsData = async (
  side = "",
  page = 1,
  offset = OFFSET,
  search,
  setData
) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));

    const resp = await ExecuteHttpRequest(
      methods.GET,
      UserUrls.fetchFiatTransactionUrl(side, page, offset, search)
    );
    if (resp.status === HTTP_STATUS_CODE.OK) {
      setData((prev) => ({
        ...prev,
        page,
        offset,
        search,
        list: modifyData[side](resp.data),
        loading: false,
        total: resp.count,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: [],
        total: 0,
        page: 1,
      }));
    }
  } catch (err) {
    error(err?.message);
    setData((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page: 1,
    }));
  }
};

export const modifyBanks = (userWallet = {}) => {
  const withdrawBank = userWallet.withdraw;

  return withdrawBank
    ? [
        {
          ...withdrawBank,
          accountNumber: withdrawBank?.accountNumber || 0,
          label: `${withdrawBank?.accountTitle || ""} (${withdrawBank?.accountNumber || 0})`,
        },
      ]
    : [];
};

export const handleCreateFiatWithdraw = async (
  data,
  setLoading,
  handleRefresh,
  handleRefreshBalance,
  onCloseModal,
  userWallet
) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    UserUrls.createFiatWithdraw,
    { walletId: userWallet?.withdraw?.id, amount: data?.amount }
  );

  if (resp && resp.status === HTTP_STATUS_CODE.OK) {
    success(resp?.message);
    handleRefresh();
    handleRefreshBalance();
    onCloseModal();
    setLoading(false);
  } else {
    error(resp.message);
    setLoading(false);
  }
};

export const isWithdrawals = (side = "") => {
  return side === WITHDRAWALS;
};

export const generateWithdrawCSV = async () => {
  const resp = await ExecuteHttpRequest(
    methods.GET,
    UserUrls.generateWithdrawTransactionsCSV
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const blob = new Blob([resp?.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = CREATE_TRANSACTION_CSV;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    error(CSV_GENERATION_FAILURE);
  }
};
