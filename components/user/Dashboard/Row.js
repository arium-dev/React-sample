import React from "react";
import emailIcon from "../../../images/message.png";
import { FormatTwoDecimals, formatDate } from "../../../utils";
import Badge from "../../shared/Badge";
import { capitalize } from "lodash";
import { GenericConstant } from "../../../utils/Constants";
import Spinner from "../../shared/Spinner";
import { SENT } from "./constants";
import { getEmail, getName } from "./helper";
import separatorIcon from "../../../icons/separator.svg";

const Row = ({ row }) => {
  const getStatus = (status) => {
    if (status === GenericConstant._PENDING_INVITATION)
      return GenericConstant.PENDING_INVITATION;
    else return status;
  };

  return (
    <>
      <tr className="shadow-none">
        <td>
          <div className="d-flex gap-2">
            <img src={emailIcon} alt="copy" className="email-icon" />

            <div>
              <p className="m-0">{getName(row)}</p>
              <p className="m-0">{getEmail(row)}</p>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex flex-row gap-2">
            <div className="d-flex align-items-center gap-2">
              <img
                src={row?.sourceCurrency?.logo}
                alt="currency"
                className="dashboard-currency-logo"
              />

              <span className="m-0 fw-bold">
                {parseFloat(
                  row?.status === SENT
                    ? row?.amount
                    : row?.transactionDetails?.amount
                ).toLocaleString()}
                <span> {row?.sourceCurrency?.code}</span>
              </span>
            </div>

            <img src={separatorIcon} alt="separator" />

            <div className="d-flex align-items-center gap-2">
              <img
                src={row?.exchangeCurrency?.logo}
                alt="currency"
                className="dashboard-currency-logo"
              />

              <span className="m-0">
                {FormatTwoDecimals(
                  parseFloat(
                    row?.status === "sent"
                      ? row?.amount * row?.conversionRate
                      : row?.transactionDetails?.amount * row?.conversionRate
                  ).toLocaleString()
                )}
                <span> {row?.exchangeCurrency?.code}</span>
              </span>
            </div>
          </div>
        </td>
        <td>{formatDate(row?.date)}</td>
        <td>
          <div className="d-flex align-items-center gap-2">
            <Badge status={getStatus(row?.status)}>
              {capitalize(getStatus(row?.status))}
            </Badge>

            {row?.queueStatus === GenericConstant._PENDING && (
              <Spinner color="primary" variant={"primary"} size={16} />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Row;
