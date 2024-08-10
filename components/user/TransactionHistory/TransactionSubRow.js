import React from "react";
import { useSelector } from "react-redux";
import { capitalize } from "lodash";
import {
  exchangeCurrencyPrice,
  getEmail,
  getName,
  getStatus,
  sourceCurrencyPrice,
} from "./helper";
import Badge from "../../shared/Badge";
import { formatDate } from "../../../utils";
import messageIcon from "../../../images/message.png";
import separatorIcon from "../../../icons/separator.svg";

const TransactionWithdrawSubRow = ({ transaction }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <tr className="shadow-none" key={transaction?._id}>
      <td className="d-flex align-items-center gap-3">
        <div>
          <img
            src={messageIcon}
            alt="Message"
            className="cursor-pointer square-image"
          />
        </div>

        <div>
          <p className="fw-bold m-0">{getName(transaction)}</p>
          <div>{getEmail(transaction)}</div>
        </div>
      </td>
      <td>
        <div className="d-flex flex-row gap-2">
          <div className="d-flex align-items-center gap-2">
            <img
              src={transaction?.sourceCurrency?.logo}
              alt="Recipient"
              className="flag-view cursor-pointer"
            />
            <p className="m-0">
              {sourceCurrencyPrice(userInfo?.id, transaction)}
            </p>
            <p className="m-0">{transaction?.sourceCurrency?.code}</p>
          </div>

          <img src={separatorIcon} alt="separator" />

          <div className="d-flex align-items-center gap-2">
            <img
              src={transaction?.exchangeCurrency?.logo}
              alt="Recipient"
              className="flag-view cursor-pointer"
            />
            <p className="m-0">
              {exchangeCurrencyPrice(userInfo?.id, transaction)}
            </p>
            <p className="m-0">{transaction?.exchangeCurrency?.code}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="m-0">{formatDate(transaction?.date)}</p>
      </td>
      <td>
        <Badge status={getStatus(transaction?.status)}>
          {capitalize(getStatus(transaction?.status))}
        </Badge>
      </td>
    </tr>
  );
};

export default TransactionWithdrawSubRow;
