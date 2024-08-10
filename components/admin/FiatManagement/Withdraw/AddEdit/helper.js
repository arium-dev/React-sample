import { upperFirst } from "lodash";
import { error, success } from "../../../../shared/Alert";
import { USER_EXISTS_ERROR } from "./constants";
import { ExecuteHttpRequest } from "../../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../../utils/Constants";

export const updateValue = (value, field, setEditWithdraws, withdraw) => {
  setEditWithdraws((prev) => ({
    ...prev,
    data:
      prev.data.length > 0
        ? prev.data.map((w) => {
            if (w?.userId === withdraw?.userId) {
              return { ...w, [field]: value };
            } else return w;
          })
        : [],
  }));
};

export const removeWithdrawHandler = (setEditWithdraws, withdraw) => {
  setEditWithdraws((prev) => ({
    ...prev,
    data:
      prev.data.length > 0
        ? prev.data.filter((w) => {
            return w?.userId !== withdraw?.userId;
          })
        : [],
  }));
};

export const fetchUsers = async (setUsers) => {
  setUsers((prev) => ({ ...prev, loading: true }));

  const resp = await ExecuteHttpRequest(
    methods.GET,
    AdminUrls.fetchUsersWallets
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data) {
    setUsers((prev) => ({ ...prev, data: resp.data, loading: false }));
  } else {
    setUsers((prev) => ({ ...prev, loading: false }));
  }
};

export const createWithdraw = async (
  data,
  onCloseWithdraw,
  refreshWithdrawsList
) => {
  const resp = await ExecuteHttpRequest(
    methods.POST,
    AdminUrls.createWithdrawal,
    data
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data.length > 0) {
    success(resp.message);
    refreshWithdrawsList();
    onCloseWithdraw();
  } else {
    error(resp.message);
  }
};

export const editWithdraw = async (
  data,
  onCloseWithdraw,
  refreshWithdrawsList,
  batchId
) => {
  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.editWithdrawalUrl(batchId),
    data
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data.length > 0) {
    success(resp.message);
    refreshWithdrawsList();
    onCloseWithdraw();
  } else {
    error(resp.message);
  }
};

export const initialUserValues = { loading: false, data: [] };

export const addNewUserToList = (
  user,
  setEditWithdraws,
  editWithdraws,
  setUser
) => {
  if (user.length === 0) return;
  else if (
    editWithdraws.data.length > 0 &&
    editWithdraws.data.some((d) => d?.userId === user?.[0]?.id)
  ) {
    error(USER_EXISTS_ERROR);
  } else {
    const newUser = {
      userId: user?.[0]?.id,
      email: user?.[0]?.email,
      userName: user?.[0]?.firstName + " " + user?.[0]?.lastName,
      bsb: user?.[0]?.wallet?.bsb || "",
      amount: "",
      refId: "",
      accountNumber: user?.[0]?.wallet?.accountNumber || "",
    };
    setEditWithdraws((prev) => ({ ...prev, data: [...prev.data, newUser] }));
    setUser([]);
  }
};

export const getUsersList = (users) => {
  return users.length > 0
    ? users.map((user) => {
        return {
          label: upperFirst(user?.firstName + " " + user?.lastName),
          name: upperFirst(user?.firstName + " " + user?.lastName),
          id: user?.id,
          ...user,
        };
      })
    : [];
};

export const formatPrefillWithdraw = (withdraw, setEditWithdraws) => {
  const withdraws =
    withdraw.data.withdraws.length > 0
      ? withdraw.data.withdraws.map(
          ({ id, accountNumber, amount, bsb, refId, userId, status }) => {
            return {
              id,
              accountNumber,
              amount,
              bsb,
              refId,
              userId: userId?.id || userId?._id || "",
              userName: userId?.firstName + " " + userId?.lastName,
              email: userId?.email,
              status: status,
            };
          }
        )
      : [];

  setEditWithdraws((prev) => ({ ...prev, data: withdraws, isEdit: true }));
};
