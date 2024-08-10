import React from "react";
import emailIcon from "../../../../images/message.png";
import { FormatTwoDecimals, formatDate } from "../../../../utils";
import Badge from "../../../shared/Badge";
import { capitalize } from "lodash";
import { getStatus, getStatusColor } from "./helper";
import { GenericConstant } from "../../../../utils/Constants";

const Row = ({ row }) => {
  return (
    <>
      <tr className="shadow-none">
        <td>
          <div className="d-flex gap-2">
            <img src={emailIcon} alt="copy" className="email-icon" />

            <div>
              <p className="m-0">
                {row?.senderUser?.firstName + " " + row?.senderUser?.lastName}
              </p>
              <p className="m-0">{row?.senderUser?.email}</p>
            </div>
          </div>
        </td>

        <td>
          <div className="d-flex gap-2">
            <img src={emailIcon} alt="copy" className="email-icon" />

            <div>
              <p className="m-0">
                {row?.recipientUser?.firstName +
                  " " +
                  row?.recipientUser?.lastName}
              </p>
              <p className="m-0">{row?.recipientUser?.email}</p>
            </div>
          </div>
        </td>

        <td>
          <div className="d-flex gap-2">
            <div>
              <p className="m-0">
                {row?.status === GenericConstant._APPROVED
                  ? row?.transactionDetails?.fee
                  : 0}
              </p>
            </div>
          </div>
        </td>

        <td>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <img
                src={row?.sourceCurrency?.logo}
                alt="currency"
                className="dashboard-currency-logo"
              />

              <span className="m-0 fw-bold">
                {parseFloat(row?.transactionDetails?.amount).toLocaleString()}
                <span> {row?.sourceCurrency?.code}</span>
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <img
                src={row?.exchangeCurrency?.logo}
                alt="currency"
                className="dashboard-currency-logo"
              />

              <span className="m-0">
                {FormatTwoDecimals(
                  parseFloat(
                    row?.transactionDetails?.amount * row?.conversionRate
                  ).toLocaleString()
                )}
                <span> {row?.exchangeCurrency?.code}</span>
              </span>
            </div>
          </div>
        </td>

        <td>{formatDate(row?.createdAt)}</td>
        <td>
          <Badge status={getStatusColor(row?.status)}>
            {capitalize(getStatus(row?.status))}
          </Badge>
        </td>
      </tr>
    </>
  );
};

export default Row;
