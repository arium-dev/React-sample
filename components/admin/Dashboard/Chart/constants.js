const LIST_TYPE = [
  { title: "24Hr", value: "24hr" },
  { title: "7 Days", value: "7days" },
  { title: "1 Month", value: "1month" },
];

const TABS = [
  { title: "Deposit", value: "deposit" },
  { title: "Withdrawals", value: "withdrawals" },
];

const DUMMY_LIST = {
  data: [],
  label: [],
};

const DUMMY_DATA = { deposits: DUMMY_LIST, withdraws: DUMMY_LIST };

const CHART_INITIAL = {
  loading: false,
  chartType: "1month",
  tab: "deposit",
  name: "Deposit",
  data: DUMMY_DATA,
  display: DUMMY_LIST,
};

const WITHDRAWALS = "withdrawals";
const WITHDRAW = "Withdraw";
const DATE_FORMAT = "MMMM DD";
const _24HR = "24hr";
const DAYS = "days";
const MONTH = "month";
const _7DAYS = "7days";

export {
  DUMMY_DATA,
  DUMMY_LIST,
  CHART_INITIAL,
  LIST_TYPE,
  TABS,
  WITHDRAWALS,
  WITHDRAW,
  DATE_FORMAT,
  _24HR,
  DAYS,
  MONTH,
  _7DAYS,
};
