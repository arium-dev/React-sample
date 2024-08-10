import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { AdminUrls, methods } from "../../../../utils";
import { getCardInitials } from "./constants";

const getBalances = async (setData, permissions) => {
  setData((prev) => ({ ...prev, loading: true }));
  try {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.getBalanceForDashboardUrl
    );

    if (resp.status === 200 && resp?.data) {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: prev?.list?.map((card) => ({
          ...card,
          amount: resp?.data?.[card.value] || 0,
        })),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        loading: false,
        list: getCardInitials(permissions),
      }));
    }
  } catch (err) {
    setData((prev) => ({
      ...prev,
      loading: false,
      list: getCardInitials(permissions),
    }));
  }
};

export { getBalances };
