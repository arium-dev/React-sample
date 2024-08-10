import { INFO, TRANSACTION, AMOUNT } from "./constants";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls, isAuthorizedAction } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";
import { AdminRoutes, PERMISSIONS } from "../../../../utils/Constants";

const getDetails = async (setData) => {
  setData((prev) => ({ ...prev, loading: true }));
  try {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.dashboardDetailUrl
    );

    if (resp.status === HTTP_STATUS_CODE.OK && resp?.data) {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: prev?.list?.map((info) => ({
          ...info,
          value: resp?.data?.[info.key] || 0,
        })),
      }));
    } else {
      setData((prev) => ({ ...prev, loading: false, list: INFO }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: INFO }));
  }
};

const getAmountData = async (setData, permissions) => {
  setData((prev) => ({ ...prev, loading: true }));
  try {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.dashboardPendingDepositUrl
    );

    if (resp.status === HTTP_STATUS_CODE.OK && resp?.data) {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: prev?.list?.map((pending) => ({
          ...pending,
          value: `${resp?.data?.[pending.key] || 0}`,
          url:
            isAuthorizedAction(pending.action, permissions) &&
            pending.action === PERMISSIONS.VIEW_PENDING_DEPOSIT
              ? `${AdminRoutes.FIAT_MANAGEMENT}?active=${pending.action}`
              : isAuthorizedAction(pending.action, permissions) &&
                  pending.action === PERMISSIONS.VIEW_WITHDRAWAL
                ? `${AdminRoutes.FIAT_MANAGEMENT}?active=${pending.action}&search=unApproved`
                : "",
        })),
      }));
    } else {
      setData((prev) => ({ ...prev, loading: false, list: AMOUNT }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: AMOUNT }));
  }
};

const getTransactionSummary = async (setData) => {
  setData((prev) => ({ ...prev, loading: true }));
  try {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.transactionSummary
    );

    if (resp.status === HTTP_STATUS_CODE.OK && resp?.data) {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: prev?.list?.map((reserve) => ({
          ...reserve,
          value: resp.data?.[reserve.key]
            ? parseFloat(resp.data?.[reserve.key]).toFixed(5)
            : 0,
        })),
      }));
    } else {
      setData((prev) => ({ ...prev, loading: false, list: TRANSACTION }));
    }
  } catch (err) {
    setData((prev) => ({ ...prev, loading: false, list: TRANSACTION }));
  }
};

export { getDetails, getAmountData, getTransactionSummary };
