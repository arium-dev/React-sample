import React from "react";
import { FormatEightDecimals, formatDate } from "../../../../utils";
import {
  GenericConstant,
  PLACEHOLDERS,
  ZERO,
} from "../../../../utils/Constants";
import { approveRejectHandler, getPendingDepositActionValues } from "../helper";
import Dropdown from "../../../shared/Dropdown/CustomDropdown";
import { getName } from "./helper";

const Row = ({
  item,
  pendingDeposit,
  setPendingDeposit,
  setPendingDeposits,
  permissions,
}) => {
  const actionMenu = getPendingDepositActionValues(permissions);
  return (
    <tr>
      <td>{formatDate(item.createdAt)}</td>
      <td>{getName(item)}</td>
      <td>{item?.lodgementRef || "--"}</td>
      <td>${FormatEightDecimals(item?.amount || ZERO)}</td>

      <td>
        <Dropdown
          size={GenericConstant._XS}
          placeholder={PLACEHOLDERS.APPROVE_REJECT}
          list={actionMenu}
          onSelect={async (e, value) => {
            await approveRejectHandler(
              value.target.text,
              item,
              setPendingDeposits,
              setPendingDeposit
            );
          }}
          loading={
            pendingDeposit?.statusLoading &&
            item?.id === pendingDeposit?.data?.id
          }
          disabled={actionMenu.length === 0 || pendingDeposit?.emailLoading}
        />
      </td>
    </tr>
  );
};

export default Row;
