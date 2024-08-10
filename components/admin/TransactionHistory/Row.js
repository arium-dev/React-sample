import React from "react";
import { useSelector } from "react-redux";
import { capitalize } from "lodash";
import messageIcon from "../../../images/message.png";
import { formatDate, isAuthorizedAction } from "../../../utils";
import { GenericConstant, PERMISSIONS } from "../../../utils/Constants";
import Dropdown from "../../shared/Dropdown/CustomDropdown";
import Spinner from "../../shared/Spinner";
import {
  exchangeCurrencyPrice,
  getTransactionStatus,
  getStatus,
  transactionStatusActionValues,
  recipientEmail,
  recipientName,
  sourceCurrencyPrice,
  updateTransactionViewHandler,
} from "./helper";
import { PENDING } from "./constants";

const Row = ({ transaction, setTransactions }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const permissions = useSelector((state) => state.auth.permissions);

  return (
    <>
      <tr className="shadow-none">
        <td className="d-flex align-items-center gap-3">
          <div>
            <img
              src={messageIcon}
              alt="Message"
              className="cursor-pointer square-image"
            />
          </div>

          <div>
            <p className="fw-bold m-0">
              {recipientName(transaction?.senderUser)}
            </p>
            <div>{recipientEmail(transaction?.senderUser)}</div>
          </div>
        </td>
        <td className="">
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
        </td>

        <td className="d-flex align-items-center gap-3">
          <div>
            <img
              src={messageIcon}
              alt="Message"
              className="cursor-pointer square-image"
            />
          </div>

          <div>
            <p className="fw-bold m-0">
              {recipientName(transaction?.recipientUser)}
            </p>
            <div>{recipientEmail(transaction?.recipientUser)}</div>
          </div>
        </td>
        <td>
          <p className="m-0">{formatDate(transaction?.createdAt)}</p>
        </td>

        <td>
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center">
              <Dropdown
                size={GenericConstant._XS}
                placeholder={capitalize(getStatus(transaction?.status))}
                disabled={
                  transaction?.status !== PENDING ||
                  (!isAuthorizedAction(
                    PERMISSIONS.APPROVE_TRANSACTION,
                    permissions
                  ) &&
                    !isAuthorizedAction(
                      PERMISSIONS.REJECT_TRANSACTION,
                      permissions
                    )) ||
                  transaction.queueStatus === PENDING
                }
                list={transactionStatusActionValues}
                onSelect={async (_, value) => {
                  await updateTransactionViewHandler(
                    value.target.text,
                    transaction,
                    setTransactions
                  );
                }}
                variant={getTransactionStatus(transaction?.status).variant}
                active={getTransactionStatus(transaction?.status).status}
                loading={transaction?.statusLoading}
              />
            </div>
            <div>
              {transaction?.queueStatus === GenericConstant._PENDING && (
                <Spinner color="primary" variant={"primary"} size={16} />
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Row;
