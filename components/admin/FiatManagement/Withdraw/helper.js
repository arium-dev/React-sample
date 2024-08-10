import { error, success } from "../../../shared/Alert";
import { sweetAlert } from "../../../shared/ConfirmBox";
import { initialWithdrawValues } from "../helper";
import * as Constants from "../constants";
import {
  redirectName,
  methods,
  AdminUrls,
  isAuthorizedAction,
} from "../../../../utils";
import {
  ROLES,
  HTTP_STATUS_CODE,
  PERMISSIONS,
  TOGGLE_VARIANT,
  KYC_STATUS_LEVEL,
} from "../../../../utils/Constants";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";

export const toggleCollapse = async (id, setWithdraws, isWithdraws = false) => {
  setWithdraws((prev) => ({
    ...prev,
    list: prev.list.map((withdraw) =>
      withdraw.id === id
        ? {
            ...withdraw,
            collapsed: !withdraw.collapsed,
            loading: isWithdraws,
            withdrawsLoading: isWithdraws,
          }
        : withdraw
    ),
  }));

  if (isWithdraws) {
    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.fetchWithdrawalsTransactionsByBatchIdUrl + id
    );

    setWithdraws((prev) => ({
      ...prev,
      list: prev.list.map((withdraw) =>
        withdraw.id === id
          ? {
              ...withdraw,
              loading: false,
              withdrawsLoading: false,
              withdraws: resp.data,
            }
          : withdraw
      ),
    }));
  }
};

export const getTotalAmount = (withdraw) => {
  return withdraw?.withdraws?.length > 0
    ? withdraw?.withdraws?.reduce(
        (a, i) => a + parseFloat(i.amount ? i.amount : 0),
        0
      )
    : [];
};

export const getName = (w) => {
  return redirectName(
    w.userId && w.userId.firstName
      ? w.userId?.firstName + " " + w.userId?.lastName
      : "",
    ROLES.USER,
    w.userId?._id
  );
};

export const getEmail = (w) => {
  return w.userId && w.userId.email ? w.userId.email : "";
};

export const getBSB = (w) => {
  return w?.bsb;
};

export const getBank = (w) => {
  return w?.accountNumber;
};

export const getActionMenu = (permissions) => {
  let menu = [];
  if (isAuthorizedAction(PERMISSIONS.EDIT_BATCH_WITHDRAWAL, permissions)) {
    menu.push({
      name: Constants._EDIT,
      value: PERMISSIONS.EDIT_BATCH_WITHDRAWAL,
    });
  }

  // if (isAuthorizedAction(PERMISSIONS.DELETE_BATCH_WITHDRAWAL, permissions)) {
  //   menu.push({
  //     name: Constants.DELETE,
  //     value: PERMISSIONS.DELETE_BATCH_WITHDRAWAL,
  //   });
  // }
  return menu;
};

const deleteWithdrawHandler = async (id, setWithdraws) => {
  try {
    const resp = await ExecuteHttpRequest(
      methods.DELETE,
      AdminUrls.deleteWithDrawalUrl(id)
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setWithdraws((prev) => ({
        ...prev,
        list: prev?.list?.filter((withdraw) => withdraw.id !== id),
        total: prev.total - 1,
      }));
      success(resp.message);
    } else {
      error(resp?.message);
    }
  } catch (err) {
    error(err?.message);
  }
};

export const withdrawActionHandler = async (
  action,
  value,
  setWithdraws,
  setEditWithdraw
) => {
  if (action === PERMISSIONS.EDIT_BATCH_WITHDRAWAL) {
    setEditWithdraw((prev) => ({
      ...prev,
      open: true,
      data: value,
      withdrawsLoading: value?.withdraws?.length === 0,
    }));

    if (value?.withdraws?.length === 0) {
      const resp = await ExecuteHttpRequest(
        methods.GET,
        AdminUrls.fetchWithdrawalsTransactionsByBatchIdUrl + value.id
      );
      setEditWithdraw((prev) => ({
        ...prev,
        open: true,
        data: { ...value, withdraws: resp.data },
        withdrawsLoading: false,
      }));
    }
  } else if (action === PERMISSIONS.DELETE_BATCH_WITHDRAWAL) {
    await sweetAlert(
      Constants.DELETE_WITHDRAW,
      Constants.WITHDRAW_DELETE_MESSAGE,
      value,
      Constants.DELETE
    )
      .then(() => {
        deleteWithdrawHandler(value?.id, setWithdraws);
      })
      .catch((err) => {});
  }
};

const setWithdrawLoadingHandler = (
  type,
  setWithdraws,
  data,
  batchId,
  loading
) => {
  if (type === Constants.TRANSACTION) {
    setWithdraws((prev) => ({
      ...prev,
      list:
        prev.list && prev.list.length > 0
          ? prev.list.map((withdraw) =>
              withdraw?._id === data?.withdraws?.[0]?.id
                ? { ...withdraw, loading }
                : withdraw
            )
          : [],
    }));
  } else {
    setWithdraws((prev) => ({
      ...prev,
      list:
        prev.list && prev.list.length > 0
          ? prev.list.map((withdraw) =>
              withdraw?.id === batchId ? { ...withdraw, loading } : withdraw
            )
          : [],
    }));
  }
};

export const changeWithdrawStatusHandler = async (
  data,
  batchId,
  refreshWithdrawsList,
  setWithdraws,
  type
) => {
  try {
    setWithdrawLoadingHandler(type, setWithdraws, data, batchId, true);

    const resp = await ExecuteHttpRequest(
      methods.PUT,
      AdminUrls.editWithdrawalStatusUrl(batchId),
      data
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      refreshWithdrawsList();
      success(resp.message);
    } else {
      error(resp?.message);
    }

    setWithdrawLoadingHandler(type, setWithdraws, data, batchId, false);
  } catch (err) {
    error(err?.message);
    setWithdrawLoadingHandler(type, setWithdraws, data, batchId, false);
  }
};

export const handleStatusUpdateConfirmation = async (
  withdraws,
  status,
  type,
  id,
  batchId,
  setVerify2FA,
  refreshWithdrawsList,
  userInfo,
  setWithdraws
) => {
  let data;

  if (type === Constants.TRANSACTION) {
    data = [{ id: withdraws?._id, status }];
  } else {
    data =
      type === Constants.BATCH
        ? withdraws
        : withdraws.filter((w) => w.id === id);
    data = data.map((w) => {
      return { id: w.id, status: status };
    });
  }

  await sweetAlert(
    Constants.ALERT,
    Constants.ALERT_HEADING,
    null,
    Constants.ALERT_CONFIRM_BTN
  )
    .then(async () => {
      const formData = {
        withdraws: data,
        status: status,
      };

      if (status === Constants.APPROVED) {
        if (status === Constants.APPROVED) {
          const resp = await ExecuteHttpRequest(
            methods.GET,
            AdminUrls.fetchAdminProfileUrl
          );

          if (!resp?.data?.twoFaEnabled) {
            return error(Constants.ENABLE_2FA_ERROR);
          }
        }

        setVerify2FA((prev) => ({
          ...prev,
          open: true,
          proceedWithdraw: () => {
            changeWithdrawStatusHandler(
              formData,
              batchId,
              refreshWithdrawsList,
              setWithdraws,
              type
            );
          },
        }));
      } else {
        await changeWithdrawStatusHandler(
          formData,
          batchId,
          refreshWithdrawsList,
          setWithdraws,
          type
        );
      }
    })
    .catch((err) => {});
};

export const isWithdrawDisabled = (withdraw) => {
  return (
    withdraw?.status === Constants.APPROVED &&
    withdraw?.withdraws?.length > 0 &&
    withdraw?.withdraws?.every((w) => w.status === Constants.APPROVED)
  );
};

export const handleTabs = (value, withdraws, setWithdraws) => {
  if (value !== withdraws.selectedTab) {
    setWithdraws(() => ({ ...initialWithdrawValues, selectedTab: value }));
  }
};

export const kycStatusActionValues = [
  { id: Constants.REJECTED, label: Constants.KYC_STATUS.REJECTED },
  { id: Constants._NOT_VERIFIED, label: Constants.KYC_STATUS.NOT_VERIFIED },
  { id: Constants.PENDING, label: Constants.KYC_PENDING },
  { id: Constants._VERIFIED, label: Constants.KYC_STATUS.VERIFIED },
];

export const getKycStatus = (level) => {
  let kycStatuses = [
    { status: Constants.REJECTED, variant: TOGGLE_VARIANT.DANGER },
    { status: Constants._NOT_VERIFIED, variant: TOGGLE_VARIANT.DANGER },
    { status: Constants.PENDING, variant: TOGGLE_VARIANT.WARNING },
    { status: Constants._VERIFIED, variant: TOGGLE_VARIANT.SUCCESS },
  ];
  return kycStatuses[level];
};

export const updateKycHandler = async (status, item, setWithdraws) => {
  await sweetAlert(
    Constants.ALERT,
    Constants.ALERT_HEADING,
    null,
    Constants.ALERT_CONFIRM_BTN
  )
    .then(async () => {
      setWithdraws((prev) => ({
        ...prev,
        list:
          prev.list.length > 0 &&
          prev.list.map((listItem) => ({
            ...listItem,
            withdraws:
              listItem.withdraws.length > 0 &&
              listItem.withdraws.map((withdraw) =>
                withdraw?._id === item?._id
                  ? { ...withdraw, withdrawLoading: true }
                  : withdraw
              ),
          })),
      }));

      const payload = {
        level: KYC_STATUS_LEVEL.get(status.toLowerCase()),
      };

      const resp = await ExecuteHttpRequest(
        methods.PUT,
        AdminUrls.kycStatusChangeUrl(item?.userId?._id),
        payload
      );
      if (resp.status === 200) {
        success(resp?.message);
        setWithdraws((prev) => ({
          ...prev,
          list:
            prev.list.length > 0 &&
            prev.list.map((listItem) => ({
              ...listItem,
              withdraws:
                listItem.withdraws.length > 0 &&
                listItem.withdraws.map((withdraw) =>
                  withdraw?._id === item?._id
                    ? {
                        ...withdraw,
                        withdrawLoading: false,
                        userId: {
                          ...withdraw.userId,
                          level: resp?.data?.level,
                        },
                      }
                    : withdraw
                ),
            })),
        }));
      } else {
        setWithdraws((prev) => ({
          ...prev,
          list:
            prev.list.length > 0 &&
            prev.list.map((listItem) => ({
              ...listItem,
              withdraws:
                listItem.withdraws.length > 0 &&
                listItem.withdraws.map((withdraw) =>
                  withdraw?._id === item?._id
                    ? { ...withdraw, withdrawLoading: false }
                    : withdraw
                ),
            })),
        }));
        error(resp.message);
      }
    })
    .catch((err) => {});
};

export const updateKycTransactionViewHandler = async (
  status,
  item,
  setWithdraws
) => {
  await sweetAlert(
    Constants.ALERT,
    Constants.ALERT_HEADING,
    null,
    Constants.ALERT_CONFIRM_BTN
  )
    .then(async () => {
      setWithdraws((prev) => ({
        ...prev,
        list:
          prev.list.length > 0 &&
          prev.list.map((withdraw) => ({
            ...withdraw,
            withdrawLoading: withdraw?._id === item?._id ? true : false,
          })),
      }));

      const payload = {
        level: KYC_STATUS_LEVEL.get(status.toLowerCase()),
      };

      const resp = await ExecuteHttpRequest(
        methods.PUT,
        AdminUrls.kycStatusChangeUrl(item?.userId?._id),
        payload
      );
      if (resp.status === 200) {
        success(resp?.message);
        setWithdraws((prev) => ({
          ...prev,
          list:
            prev.list.length > 0 &&
            prev.list.map((withdraw) =>
              withdraw?._id === item?._id
                ? {
                    ...withdraw,
                    withdrawLoading: false,
                    userId: {
                      ...withdraw.userId,
                      level: resp?.data?.level,
                    },
                  }
                : withdraw
            ),
        }));
      } else {
        setWithdraws((prev) => ({
          ...prev,
          list:
            prev.list.length > 0 &&
            prev.list.map((withdraw) =>
              withdraw?._id === item?._id
                ? {
                    ...withdraw,
                    withdrawLoading: false,
                  }
                : withdraw
            ),
        }));
        error(resp.message);
      }
    })
    .catch((err) => {});
};
