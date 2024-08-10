import moment from "moment";
import {
  FormatEightDecimals,
  formatDate,
  redirectName,
  methods,
  AdminUrls,
  isAuthorizedAction,
} from "../../../utils";
import Badge from "../../shared/Badge";
import {
  APPROVED,
  IN_PROGRESS,
  REJECTED,
  PENDING,
  ALERT,
  ALERT_HEADING,
  ALERT_CONFIRM_BTN,
  headerValuesWithdraws,
  headerValuesWithdrawsRow,
  ACTIVE,
  TRANSACTION_VIEW,
  VIEW_AS_BATCH,
  calendlyScheduleEventUrl,
  NOT_VERIFIED,
  KYC_STATUS,
  _APPROVED,
  _REJECTED,
  DEPOSIT_TRANSACTION_CSV,
  PENDING_DEPOSIT_TRANSACTION_CSV,
  _DEPOSIT,
  _PENDING_DEPOSIT,
  _LINK_TO_EDD,
  _WITHDRAW,
} from "./constants";
import { error, success } from "../../shared/Alert";
import ToolTip from "../../shared/Tooltip";
import { Link } from "react-router-dom";
import { sweetAlert } from "../../shared/ConfirmBox";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { parseUrl } from "../../../ExecuteHttpRequest/helper";
import { BuyIcon, SellIcon, WithdrawIcon } from "../../../icons";
import {
  GenericConstant,
  OFFSET,
  HTTP_STATUS_CODE,
  PERMISSIONS,
  CSV_GENERATION_FAILURE,
} from "../../../utils/Constants";

export const getDefaultTab = (searchParams, tabData = []) => {
  return searchParams?.get(ACTIVE)
    ? tabData?.find((tab) => tab?.value === searchParams?.get(ACTIVE))?.value ||
        tabData?.[0]?.value
    : tabData?.[0]?.value;
};

export const getMainTabs = (permissions = []) => {
  let menu = [];
  if (isAuthorizedAction(PERMISSIONS.VIEW_DEPOSIT, permissions)) {
    menu.push({
      name: _DEPOSIT,
      value: PERMISSIONS.VIEW_DEPOSIT,
      icon: <BuyIcon className="tab-icon" />,
      isValue: true,
    });
  }
  if (isAuthorizedAction(PERMISSIONS.VIEW_PENDING_DEPOSIT, permissions)) {
    menu.push({
      name: _PENDING_DEPOSIT,
      value: PERMISSIONS.VIEW_PENDING_DEPOSIT,
      icon: <SellIcon className="tab-icon" />,
      isValue: true,
    });
  }
  if (isAuthorizedAction(PERMISSIONS.VIEW_LINK_TO_EDD, permissions)) {
    menu.push({
      name: _LINK_TO_EDD,
      value: PERMISSIONS.VIEW_LINK_TO_EDD,
      icon: <SellIcon className="tab-icon" />,
      isValue: true,
    });
  }
  if (isAuthorizedAction(PERMISSIONS.VIEW_WITHDRAWAL, permissions)) {
    menu.push({
      name: _WITHDRAW,
      value: PERMISSIONS.VIEW_WITHDRAWAL,
      icon: <WithdrawIcon className="tab-icon" />,
      isValue: true,
    });
  }
  return menu;
};

export const initialDepositValues = {
  list: [],
  loading: true,
  page: 1,
  offset: OFFSET,
  search: "",
  total: 0,
};

export const initialPendingDepositValues = {
  list: [],
  loading: true,
  page: 1,
  offset: OFFSET,
  search: "",
  total: 0,
};

export const initialWithdrawValuesFunc = (
  condition,
  selectedTab = GenericConstant._VIEW_AS_BATCH
) => {
  let obj = {
    list: [],
    loading: true,
    page: 1,
    offset: OFFSET,
    search: "",
    total: 0,
    selectedTab: selectedTab,
  };

  if (condition) {
    obj = { ...obj, selectedTab: TRANSACTION_VIEW };
  }

  return obj;
};

export const initialWithdrawValues = {
  list: [],
  loading: true,
  page: 1,
  offset: OFFSET,
  search: "",
  total: 0,
  selectedTab: VIEW_AS_BATCH,
};

export const getTableHeader = (tab) =>
  tab === VIEW_AS_BATCH ? headerValuesWithdraws : headerValuesWithdrawsRow;

export const initialAddEditWithdrawValues = {
  open: false,
  data: null,
};

export const initialEditWithdrawValues = {
  data: [],
  loading: false,
  isEdit: false,
};

export const initialSinglePendingDeposit = {
  open: false,
  type: null,
  data: null,
  emailLoading: false,
  statusLoading: false,
  isEdit: false,
};

export const initialVerify2FAWithdraw = {
  open: false,
  proceedWithdraw: null,
};

const getStatusComp = (item) => {
  const getStatus = (status) => {
    switch (status) {
      case APPROVED:
        return GenericConstant.APPROVED;
      case IN_PROGRESS:
      case PENDING:
        return GenericConstant.PENDING;
      case REJECTED:
        return GenericConstant.REJECTED;
      default:
        return "";
    }
  };
  return (
    <Badge status={item?.status} className="text-capitalize">
      {getStatus(item?.status)}
    </Badge>
  );
};

const formatFiatDepositList = (data) => {
  return data?.length > 0
    ? data.map((item) => {
        return {
          date: formatDate(item.createdAt),
          user: (
            <div className="d-flex gap-4">
              <span className="cursor-pointer">
                <ToolTip title={item?.userName} placement="left">
                  <Link
                    to={
                      item?.userId
                        ? `/admin/users?userId=${item.userId}`
                        : "/admin/users"
                    }
                  >
                    {item?.userName}
                  </Link>
                </ToolTip>
              </span>
            </div>
          ),
          reference: item?.lodgementRef || "--",
          amount: `$${FormatEightDecimals(item?.amount || 0)}`,
          status: getStatusComp(item),
        };
      })
    : [];
};

export const getPendingDepositActionValues = (permissions) => {
  let menu = [];
  if (isAuthorizedAction(PERMISSIONS.APPROVE_PENDING_DEPOSIT, permissions)) {
    menu.push({ id: "approve", label: "Approve" });
  }
  if (isAuthorizedAction(PERMISSIONS.REJECT_PENDING_DEPOSIT, permissions)) {
    menu.push({ id: "reject", label: "Reject" });
  }
  return menu;
};

export const getRescheduleLink = (row) => {
  const event =
    row.eventSlot && row.eventSlot[0] && row.eventSlot[0].data
      ? JSON.parse(row.eventSlot[0].data)
      : null;

  const uuid =
    (event &&
      event.uri &&
      event.uri.split("/")[event.uri.split("/").length - 1]) ||
    "";

  let now = new Date();
  now = moment(now).add(1, GenericConstant._MINUTES);
  const endDateTime = moment(event?.end_time);
  const diff = endDateTime.diff(now);

  return calendlyScheduleEventUrl(diff, uuid);
};

export const getUuid = (row) => {
  const event =
    row.eventSlot && row.eventSlot[0] && row.eventSlot[0].data
      ? JSON.parse(row.eventSlot[0].data)
      : null;
  return (
    (event &&
      event.uri &&
      event.uri.split("/")[event.uri.split("/").length - 1]) ||
    ""
  );
};

export const approveRejectHandler = async (
  status,
  item,
  setPendingDeposits,
  setPendingDeposit
) => {
  await sweetAlert(ALERT, ALERT_HEADING, null, ALERT_CONFIRM_BTN)
    .then(async () => {
      setPendingDeposit((prev) => ({
        ...prev,
        statusLoading: true,
        data: item,
      }));

      const getStatus = (s) =>
        s?.toLowerCase() === GenericConstant._APPROVE
          ? GenericConstant._APPROVED
          : GenericConstant._REJECT
            ? GenericConstant._REJECTED
            : "";

      const payload = {
        status: getStatus(status),
      };

      const resp = await ExecuteHttpRequest(
        methods.PUT,
        AdminUrls.approveOrRejectDepositUrl(item?._id),
        payload
      );

      if (resp.status === HTTP_STATUS_CODE.OK) {
        setPendingDeposits((prev) => ({
          ...prev,
          list:
            prev.list.length > 0
              ? prev.list.filter((deposit) => deposit?.id !== resp?.data?.id)
              : [],
          total: prev.total - 1,
        }));
        success(resp.message);
      } else {
        error(resp.message);
      }

      setPendingDeposit(initialSinglePendingDeposit);
    })
    .catch((err) => {});
};

export const getWithdrawSubmittedByName = (item) => {
  if (item?.submittedBy?.firstName && item?.submittedBy?.lastName) {
    return redirectName(
      item?.submittedBy?.firstName + " " + item?.submittedBy?.lastName,
      item?.submittedBy?.role,
      item?.submittedBy?._id
    );
  } else return "";
};

export const fetchDeposits = async (page, search, setDeposits) => {
  try {
    setDeposits((prev) => ({ ...prev, loading: true }));
    let url = parseUrl(AdminUrls.fetchDepositUrl, {
      page: page,
      OFFSET: OFFSET,
      search: search,
    });

    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      const { list, count } = resp.data;
      setDeposits((prev) => ({
        ...prev,
        total: count,
        loading: false,
        search,
        list: formatFiatDepositList(list),
        page,
      }));
    } else {
      setDeposits((prev) => ({
        ...prev,
        loading: false,
        list: [],
        total: 0,
        page,
      }));
    }
  } catch (err) {
    setDeposits((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const fetchPendingDeposits = async (
  page,
  search,
  setPendingDeposits
) => {
  try {
    setPendingDeposits((prev) => ({ ...prev, loading: true }));
    let url = parseUrl(AdminUrls.fetchPendingDepositUrl, {
      page: page,
      OFFSET: OFFSET,
      search: search,
    });

    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      const { count, list } = resp.data;
      setPendingDeposits((prev) => ({
        ...prev,
        total: count,
        loading: false,
        list: list,
        page,
      }));
    } else {
      setPendingDeposits((prev) => ({
        ...prev,
        loading: false,
        list: [],
        total: 0,
        page,
      }));
    }
  } catch (err) {
    setPendingDeposits((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const fetchEddTransactions = async (page, search, setData) => {
  try {
    setData((prev) => ({ ...prev, loading: true }));
    let url = parseUrl(AdminUrls.fetchEddTransactionUrl, {
      page: page,
      OFFSET: OFFSET,
      search: search,
    });

    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK) {
      const { count, list } = resp.data;
      setData((prev) => ({
        ...prev,
        total: count,
        loading: false,
        list: list,
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

const fetchWithdrawsHandler = async (page, search, setWithdraws) => {
  let url = parseUrl(AdminUrls.fetchBatchWithdrawalsUrl, {
    page: page,
    OFFSET: OFFSET,
    search: search,
  });

  const resp = await ExecuteHttpRequest(methods.GET, url);

  const formatWithdrawData = (data = []) => {
    if (data?.length === 0) return [];
    else {
      return data.map((i) => {
        return {
          ...i,
          withdraws: [],
          withdrawCount: i.withdraws.length,
          loading: false,
        };
      });
    }
  };

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const { list, count } = resp?.data;
    setWithdraws((prev) => ({
      ...prev,
      total: count,
      loading: false,
      list: formatWithdrawData(list),
      page,
    }));
  } else {
    setWithdraws((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

const fetchTransactionViewHandler = async (page, search, setWithdraws) => {
  let url = parseUrl(AdminUrls.fetchWithdrawalsTransactionsUrl, {
    page: page,
    OFFSET: OFFSET,
    search: search,
  });
  const resp = await ExecuteHttpRequest(methods.GET, url);

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const { count, list } = resp.data;
    setWithdraws((prev) => ({
      ...prev,
      total: count,
      loading: false,
      list:
        list?.length > 0 &&
        list.map((item) => ({
          ...item,
          withdrawLoading: false,
        })),
      page,
    }));
  } else {
    setWithdraws((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const fetchWithdraws = async (
  page,
  search,
  setWithdraws,
  selectedTab
) => {
  try {
    setWithdraws((prev) => ({ ...prev, loading: true }));

    if (selectedTab === VIEW_AS_BATCH) {
      await fetchWithdrawsHandler(page, search, setWithdraws);
    } else {
      await fetchTransactionViewHandler(page, search, setWithdraws);
    }

    setWithdraws((prev) => ({ ...prev, loading: false }));
  } catch (err) {
    setWithdraws((prev) => ({
      ...prev,
      loading: false,
      list: [],
      total: 0,
      page,
    }));
  }
};

export const getStatusLabel = (level) => {
  return !level || level === 1
    ? NOT_VERIFIED
    : level === 2
      ? KYC_STATUS.IN_PROGRESS
      : level === 3
        ? _APPROVED
        : _REJECTED;
};

export const generateDepositCSV = async () => {
  const resp = await ExecuteHttpRequest(
    methods.GET,
    AdminUrls.generateDepositCsvUrl
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const blob = new Blob([resp?.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = DEPOSIT_TRANSACTION_CSV;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    error(CSV_GENERATION_FAILURE);
  }
};

export const generatePendingDepositCSV = async () => {
  const resp = await ExecuteHttpRequest(
    methods.GET,
    AdminUrls.generatePendingDepositUrl
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const blob = new Blob([resp?.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = PENDING_DEPOSIT_TRANSACTION_CSV;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    error(CSV_GENERATION_FAILURE);
  }
};
