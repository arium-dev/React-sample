import { Link } from "react-router-dom";
import { error, success } from "../../../shared/Alert";
import { initialSinglePendingDeposit } from "../helper";
import ToolTip from "../../../shared/Tooltip";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../utils";
import { HTTP_STATUS_CODE, TEXT_VARIANT } from "../../../../utils/Constants";
import {
  CONFIRMED,
  BOOKED,
  WAITING_TO_BOOK,
  PENDING,
  INITIAL,
  FOLLOW_UP,
  FINAL,
  INITIAL_EMAIL,
  FOLLOW_UP_EMAIL,
  FINAL_EMAIL,
} from "./constants";

export const sendEmailHandler = async (
  value,
  item,
  setData,
  setTransaction
) => {
  const id = item?._id;
  setTransaction((prev) => ({ ...prev, emailLoading: true, data: item }));

  const getStatusValue = () => {
    switch (value) {
      case INITIAL:
        return INITIAL_EMAIL;
      case FOLLOW_UP:
        return FOLLOW_UP_EMAIL;
      case FINAL:
        return FINAL_EMAIL;
      default:
        return "";
    }
  };

  const getStatusEmailCode = () => {
    switch (value) {
      case INITIAL:
        return 1;
      case FOLLOW_UP:
        return 2;
      case FINAL:
        return 3;
      default:
        return 0;
    }
  };
  const payload = {
    type: getStatusValue(value),
  };

  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.sendEmailOfTypeForEddUrl(id),
    payload
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data) {
    setData((prev) => {
      return {
        ...prev,
        list:
          prev.list.length > 0
            ? prev.list.map((item) => {
                if (item?._id === id)
                  return { ...item, emailStatus: getStatusEmailCode() };
                else return item;
              })
            : [],
      };
    });

    success(resp.message);
  } else {
    error(resp.message);
  }

  setTransaction(initialSinglePendingDeposit);
};

export const getName = (item) => {
  const name = item?.userName
    ? item?.userName
    : item?.user?.name
      ? item?.user?.name
      : item?.userId?.firstName + " " + item?.userId?.lastName;
  return (
    <span>
      <ToolTip title={name} placement="left">
        <Link
          to={
            item?.userId?.id || item?.userId
              ? `/admin/users?userId=${item.userId?.id ? item.userId.id : item?.userId}`
              : "/admin/users"
          }
        >
          {name}
        </Link>
      </ToolTip>
    </span>
  );
};

export const getEddClassName = (status) => {
  switch (status) {
    case WAITING_TO_BOOK:
    case PENDING:
      return TEXT_VARIANT.WARNING;
    case BOOKED:
      return TEXT_VARIANT.INFO;
    case CONFIRMED:
      return TEXT_VARIANT.SUCCESS;
    default:
      return TEXT_VARIANT.DANGER;
  }
};

export const getEddStatus = (status) => {
  switch (status) {
    case PENDING:
      return WAITING_TO_BOOK;
    case BOOKED:
      return BOOKED;
    case CONFIRMED:
      return CONFIRMED;
    default:
      return "";
  }
};
export const pendingDepositDisabled = (pendingDeposit) =>
  pendingDeposit?.emailLoading || pendingDeposit?.statusLoading;
