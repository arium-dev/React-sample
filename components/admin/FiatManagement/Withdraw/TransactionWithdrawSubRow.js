import React from "react";
import { ACCOUNT_NUMBER, BSB, TRANSACTION } from "../constants";
import {
  CurrencyFormattor,
  FormatTwoDecimals,
  formatDate,
  isAuthorizedAction,
} from "../../../../utils";
import {
  getBSB,
  getBank,
  getEmail,
  getName,
  getKycStatus,
  kycStatusActionValues,
  updateKycTransactionViewHandler,
} from "./helper";
import {
  GenericConstant,
  PERMISSIONS,
  withdrawStatusActions,
} from "../../../../utils/Constants";
import StatusDropdown from "./StatusDropdown";
import { upperFirst, startCase } from "lodash";
import ToolTip from "../../../shared/Tooltip";
import { InfoIcon } from "../../../../icons";
import Dropdown from "../../../shared/Dropdown/CustomDropdown";

const TransactionWithdrawSubRow = ({
  w,
  setWithdraws,
  handleStatusUpdateConfirmation,
  permissions,
}) => {
  return (
    <tr className="shadow-none" key={w?._id}>
      <td>
        <div className="fw-bold">{getName(w)}</div>
        <div>{getEmail(w)}</div>
      </td>

      <td>
        <div>
          <span className="fw-bold">{BSB}</span>
          {getBSB(w)}
        </div>
        <div>
          <span className="fw-bold">{ACCOUNT_NUMBER}</span>
          {getBank(w)}
        </div>
      </td>

      <td>{w?.refId}</td>

      <td>{formatDate(w.createdAt)}</td>

      <td>{formatDate(w.updatedAt)}</td>

      <td>{CurrencyFormattor(FormatTwoDecimals(w.amount))}</td>

      <td>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <Dropdown
              disabled={
                !isAuthorizedAction(
                  PERMISSIONS.UPDATE_KYC_STATUS_USER,
                  permissions
                ) || w?.withdrawLoading
              }
              size={GenericConstant._XS}
              placeholder={startCase(
                getKycStatus(w?.userId?.level)?.status || ""
              )}
              list={kycStatusActionValues}
              onSelect={async (_, value) => {
                if (
                  isAuthorizedAction(
                    PERMISSIONS.UPDATE_KYC_STATUS_USER,
                    permissions
                  )
                )
                  await updateKycTransactionViewHandler(
                    value.target.text,
                    w,
                    setWithdraws
                  );
              }}
              variant={getKycStatus(w?.userId?.level)?.variant || ""}
              active={getKycStatus(w?.userId?.level)?.status || ""}
              loading={w?.withdrawLoading}
            />
          </div>
        </div>
      </td>

      <td>
        <div className="d-flex align-items-center gap-2">
          <StatusDropdown
            id={w.id}
            status={w.status}
            batchId={w?.batchId}
            type={TRANSACTION}
            withdraws={w}
            handleStatusUpdateConfirmation={handleStatusUpdateConfirmation}
            size={GenericConstant._XS}
            list={withdrawStatusActions}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.UPDATE_TRANSACTION_STATUS_WITHDRAWAL,
                permissions
              )
            }
            loading={w?.loading}
          />

          <ToolTip title={w?.message || ""} placement="top">
            <InfoIcon className="withdraw-information cursor-pointer mb-1" />
          </ToolTip>
        </div>
      </td>

      <td>
        {w?.receipt ? (
          <a href={w.receipt} target="_blank" rel="noreferrer">
            {upperFirst(w?.receipt?.split("/").pop().split("-").pop())}
          </a>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default TransactionWithdrawSubRow;
