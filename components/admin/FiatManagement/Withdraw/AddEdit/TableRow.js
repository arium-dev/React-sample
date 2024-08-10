import React from "react";
import Input from "../../../../shared/Input/Input";
import {
  PLACEHOLDERS,
  TYPE,
  GenericConstant,
  ONE_MILLION,
} from "../../../../../utils/Constants";
import { removeWithdrawHandler, updateValue } from "./helper";
import ToolTip from "../../../../shared/Tooltip";
import { BSBRegex } from "../../../../../utils";
import {
  MIN_AMOUNT_VALUE,
  MAX_AMOUNT_VALUE,
  BSB,
  ACCOUNT_NUMBER,
  AMOUNT,
  REF_ID,
} from "./constants";

const TableRow = ({ withdraw, setEditWithdraws }) => {
  return (
    <tr className="shadow-none">
      <td>
        <div>
          <ToolTip title={withdraw?.userName} placement="left">
            <p className="remove-spacing fs-bold">{withdraw?.userName}</p>
          </ToolTip>

          <ToolTip title={withdraw?.email} placement="left">
            <p>{withdraw?.email}</p>
          </ToolTip>
        </div>
      </td>
      <td>
        <Input
          type={TYPE.TEXT}
          placeholder={PLACEHOLDERS.BSB}
          value={withdraw?.bsb}
          disabled={withdraw?.status === GenericConstant._APPROVED}
          onChange={(e) => {
            const value = BSBRegex(e.target.value);
            if (value.length > 7) return;
            updateValue(value, BSB, setEditWithdraws, withdraw);
          }}
          required
        />
      </td>
      <td>
        <Input
          type={TYPE.NUMBER}
          placeholder={PLACEHOLDERS.ACCOUNT_NUMBER}
          value={withdraw?.accountNumber}
          disabled={withdraw?.status === GenericConstant._APPROVED}
          onChange={(e) => {
            if (e.target.value.length > 9) return;

            updateValue(
              e.target.value,
              ACCOUNT_NUMBER,
              setEditWithdraws,
              withdraw
            );
          }}
          required
        />
      </td>
      <td>
        <Input
          type={TYPE.NUMBER}
          placeholder={PLACEHOLDERS.AMOUNT}
          value={withdraw?.amount}
          disabled={withdraw?.status === GenericConstant._APPROVED}
          min={MIN_AMOUNT_VALUE}
          max={MAX_AMOUNT_VALUE}
          step="any"
          onChange={(e) => {
            updateValue(e.target.value, AMOUNT, setEditWithdraws, withdraw);
          }}
          required
        />
      </td>
      <td>
        <Input
          type={TYPE.TEXT}
          placeholder={PLACEHOLDERS.REF_ID}
          value={withdraw?.refId}
          disabled={withdraw?.status === GenericConstant._APPROVED}
          onChange={(e) => {
            updateValue(e.target.value, REF_ID, setEditWithdraws, withdraw);
          }}
          required
        />
      </td>
      <td className="remove-spacing">
        <div
          className={`d-flex justify-content-center align-items-start mb-4 ${withdraw.status === GenericConstant._APPROVED ? "opacity-50" : "cursor-pointer"}`}
          onClick={() => {
            if (withdraw?.status !== GenericConstant._APPROVED) {
              removeWithdrawHandler(setEditWithdraws, withdraw);
            }
          }}
        >
          <i class="las la-trash-alt fs-26 text-danger"></i>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
