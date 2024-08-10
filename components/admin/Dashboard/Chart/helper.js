import moment from "moment";
import {
  DUMMY_DATA,
  CHART_INITIAL,
  WITHDRAWALS,
  WITHDRAW,
  DATE_FORMAT,
  _24HR,
  DAYS,
  MONTH,
  _7DAYS,
} from "./constants";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { parseUrl } from "../../../../ExecuteHttpRequest/helper";
import { methods, AdminUrls } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";

const getChartDetails = async (setData) => {
  setData((prev) => ({ ...prev, loading: true }));
  try {
    let startDate = "";
    let endDate = "";

    let url = parseUrl(AdminUrls.dashboardChartUrl, {
      startDate: startDate,
      endDate: endDate,
    });

    const resp = await ExecuteHttpRequest(methods.GET, url);

    if (resp.status === HTTP_STATUS_CODE.OK && resp?.data) {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: resp?.data,
        display:
          resp?.data?.deposits?.data?.length > 0
            ? resp?.data?.deposits
            : checkDisplayInfo(prev?.chartType),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        data: DUMMY_DATA,
        display: checkDisplayInfo(prev?.chartType),
      }));
    }
  } catch (err) {
    setData((prev) => ({
      ...prev,
      loading: false,
      data: DUMMY_DATA,
      display: checkDisplayInfo(prev?.chartType),
    }));
  }
};

const tabHandler = (value, data, setData) => {
  if (value === CHART_INITIAL.tab && value !== data.tab) {
    setData((prev) => ({
      ...prev,
      tab: value,
      name: CHART_INITIAL.name,
      display: prev?.data?.deposits || {},
    }));
  } else if (value === WITHDRAWALS && value !== data.tab) {
    setData((prev) => ({
      ...prev,
      tab: value,
      name: WITHDRAW,
      display: prev?.data?.withdraws || {},
    }));
  }
};

const chartTypeModifier = async (value, setData) => {
  setData((prev) => ({ ...prev, chartType: value, loading: true }));
  try {
    let startDate = "";
    let endDate = "";
    if (value === _24HR) {
      startDate = moment();
      endDate = moment();
    } else if (value === _7DAYS) {
      startDate = moment().subtract(7, DAYS);
      endDate = moment();
    }

    let url = parseUrl(AdminUrls.dashboardChartUrl, {
      startDate: startDate,
      endDate: endDate,
    });

    const resp = await ExecuteHttpRequest(methods.GET, url);
    if (resp.status === HTTP_STATUS_CODE.OK && resp?.data) {
      setData((prev) => ({
        ...prev,
        chartType: value,
        loading: false,
        data: resp?.data,
        display:
          prev.tab === CHART_INITIAL.tab
            ? resp?.data?.deposits?.data?.length > 0
              ? resp?.data?.deposits
              : checkDisplayInfo(value)
            : resp?.data?.withdraws?.data?.length > 0
              ? resp?.data?.withdraws
              : checkDisplayInfo(value),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        chartType: value,
        loading: false,
        data: DUMMY_DATA,
        display: checkDisplayInfo(value),
      }));
    }
  } catch (err) {
    setData((prev) => ({
      ...prev,
      chartType: value,
      loading: false,
      data: DUMMY_DATA,
      display: checkDisplayInfo(value),
    }));
  }
};

const checkDisplayInfo = (value) => {
  if (value === _24HR) {
    return {
      data: [0],
      label: [moment().format(DATE_FORMAT)],
    };
  } else if (value === _7DAYS) {
    return {
      data: [0, 0],
      label: [
        moment().subtract(7, DAYS).format(DATE_FORMAT),
        moment().format(DATE_FORMAT),
      ],
    };
  } else {
    return {
      data: [0, 0, 0],
      label: [
        moment().subtract(1, MONTH).format(DATE_FORMAT),
        moment().subtract(15, DAYS).format(DATE_FORMAT),
        moment().format(DATE_FORMAT),
      ],
    };
  }
};

export { getChartDetails, tabHandler, chartTypeModifier };
