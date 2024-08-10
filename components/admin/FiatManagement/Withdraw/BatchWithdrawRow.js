import React from "react";
import { getWithdrawSubmittedByName } from "../helper";
import {
  CurrencyFormattor,
  FormatTwoDecimals,
  formatDate,
  isAuthorizedAction,
} from "../../../../utils";
import { isWithdrawDisabled, getActionMenu, toggleCollapse } from "./helper";
import {
  GenericConstant,
  PERMISSIONS,
  withdrawStatusActions,
} from "../../../../utils/Constants";
import StatusDropdown from "./StatusDropdown";
import TableMenu from "../../../shared/Table/TableMenu";
import { BATCH } from "../constants";
import BatchWithdrawSubRow from "./BatchWithdrawSubRow";

const BatchWithdrawRow = ({
  withdraw,
  setWithdraws,
  actionHandler,
  handleStatusUpdateConfirmation,
  permissions,
}) => {
  const menu = getActionMenu(permissions);
  return (
    <>
      <tr className="shadow-none">
        <td>{withdraw?.id}</td>
        <td>{getWithdrawSubmittedByName(withdraw)}</td>
        <td>{formatDate(withdraw?.createdAt)}</td>
        <td>{formatDate(withdraw?.updatedAt)}</td>
        <td>{withdraw?.withdrawCount}</td>
        <td>
          {CurrencyFormattor(FormatTwoDecimals(parseFloat(withdraw.amount)))}
        </td>
        <td>
          <StatusDropdown
            id={withdraw.id}
            status={withdraw.status}
            type={BATCH}
            withdraws={withdraw.withdraws}
            handleStatusUpdateConfirmation={handleStatusUpdateConfirmation}
            size={GenericConstant._XS}
            list={withdrawStatusActions}
            className="w-75"
            loading={withdraw.loading}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.UPDATE_BATCH_STATUS_WITHDRAWAL,
                permissions
              )
            }
          />
        </td>
        <td>
          <span className="d-flex gap-2 cursor-pointer align-items-center">
            <TableMenu
              list={menu}
              onClick={(e) => actionHandler && actionHandler(e, withdraw)}
              disabled={
                menu.length === 0 ||
                isWithdrawDisabled(withdraw) ||
                withdraw.loading
              }
            />
            <div
              onClick={() =>
                toggleCollapse(
                  withdraw.id,
                  setWithdraws,
                  withdraw?.withdraws?.length === 0
                )
              }
            >
              {!withdraw.collapsed ? (
                <i class="las la-angle-down text-primary fs-18"></i>
              ) : (
                <i class="las la-angle-up text-primary fs-18"></i>
              )}
            </div>
          </span>
        </td>
      </tr>

      <BatchWithdrawSubRow
        withdraw={withdraw}
        handleStatusUpdateConfirmation={handleStatusUpdateConfirmation}
        setWithdraws={setWithdraws}
        permissions={permissions}
      />
    </>
  );
};

export default BatchWithdrawRow;
