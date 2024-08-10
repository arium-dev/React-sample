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
  setPendingDeposits,
  setPendingDeposit
) => {
  setPendingDeposit((prev) => ({ ...prev, emailLoading: true, data: item }));

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
  const payload = {
    type: getStatusValue(value),
    depositId: item?._id,
  };

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AdminUrls.sendEmailOfTypeForDepositUrl,
    payload
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data) {
    setPendingDeposits((prev) => {
      return {
        ...prev,
        list:
          prev.list.length > 0
            ? prev.list.map((item) => {
                if (item?.id === resp?.data?.id)
                  return { ...item, emailStatus: resp?.data?.emailStatus };
                else return item;
              })
            : [],
      };
    });

    success(resp.message);
  } else {
    error(resp.message);
  }

  setPendingDeposit(initialSinglePendingDeposit);
};

export const getName = (item) => {
  const name = item?.userName
    ? item?.userName
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
      return TEXT_VARIANT.WARNING;

    case BOOKED:
      return TEXT_VARIANT.INFO;
    case CONFIRMED:
      return TEXT_VARIANT.SUCCESS;
    default:
      return TEXT_VARIANT.DANGER;
  }
};

export const pendingDepositDisabled = (pendingDeposit) =>
  pendingDeposit?.emailLoading || pendingDeposit?.statusLoading;
