import React, { useState, useCallback } from "react";
import messageIcon from "../../../images/message.png";
import {
  fetchTransactionsByUserHandler,
  getKycStatus,
  getMenuActions,
  getUserAccountNumber,
  getUserBsb,
  getUserEmail,
  getUserName,
  handleEddVerify,
  handleGenerateDepositBank,
  handleResetWithdrawBank,
  initialTransactionsValue,
  isDepositBankExists,
  kycStatusActionValues,
  toggleCollapse,
  updateKycHandler,
} from "./helper";
import { ACCOUNT_NUMBER, BSB, GENERATE_BANK_ACCOUNT, RESET } from "./constants";
import leftArrow from "../../../images/arrow.svg";
import TableMenu from "../../shared/Table/TableMenu";
import Spinner from "../../shared/Spinner";
import UserSubRow from "./UserSubRow";
import { GenericConstant, ONE, PERMISSIONS } from "../../../utils/Constants";
import Button from "../../shared/Button";
import Dropdown from "../../shared/Dropdown/CustomDropdown";
import { startCase } from "lodash";
import { useSelector } from "react-redux";
import { isAuthorizedAction } from "../../../utils";

const UserRow = ({ user, setUsers, actionHandler }) => {
  const permissions = useSelector((state) => state.auth.permissions);
  const [transactions, setTransactions] = useState(initialTransactionsValue);

  const fetchTransactionsByRecipient = useCallback(() => {
    fetchTransactionsByUserHandler(
      user?._id,
      transactions.page + ONE,
      transactions.search,
      setTransactions
    );
    //eslint-disable-next-line
  }, [transactions.page, transactions.search, setTransactions]);

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
            <p className="fw-bold m-0">{getUserName(user)}</p>
            <div>{getUserEmail(user)}</div>
          </div>
        </td>

        <td>
          {isDepositBankExists(user) ? (
            <>
              <div>
                <span className="fw-bold">{BSB}</span>

                {getUserBsb(user)}
              </div>
              <div>
                <span className="fw-bold">{ACCOUNT_NUMBER}</span>

                {getUserAccountNumber(user)}
              </div>
            </>
          ) : (
            <Button
              loading={user?.wallet?.loadingBank}
              disabled={
                !isAuthorizedAction(
                  PERMISSIONS.GENERATE_BANK_ACCOUNT_NO_USER,
                  permissions
                ) || user?.wallet?.loadingBank
              }
              onClick={() => {
                handleGenerateDepositBank(user?._id, setUsers);
              }}
              className={`primary light py-1 px-2 fs-12 fw-semibold rounded-2 px-3 ${user?.wallet?.loadingBank && "px-5"}`}
            >
              {user?.withdrawWallet?.loadingBank ? (
                <Spinner color="primary" variant={"primary"} size={12} />
              ) : (
                GENERATE_BANK_ACCOUNT
              )}
            </Button>
          )}
        </td>

        <td className="d-flex align-items-center gap-3">
          <div className="fw-bolder">{user?.currency?.code}</div>
          <div>
            <img src={leftArrow} alt="Arrow" className="cursor-pointer " />
          </div>
          <div>
            <img
              src={user?.currency?.logo}
              alt="Recipient"
              className="cursor-pointer square-image"
            />
          </div>
          <p className="m-0 fw-normal">{user?.currency?.name}</p>
        </td>

        <td>
          <div className="form-check form-switch">
            <input
              onClick={(e) => {
                e.stopPropagation();
                handleEddVerify(user?._id, setUsers);
              }}
              className="form-check-input table-toggle"
              type="checkbox"
              checked={user?.eddVerified}
              disabled={
                !isAuthorizedAction(PERMISSIONS.EDD_VERIFIED_USER, permissions)
              }
            />
          </div>
        </td>

        <td>
          <Button
            loading={user?.withdrawWallet?.loadingBank}
            disabled={
              !isAuthorizedAction(
                PERMISSIONS.RESET_WITHDRAW_BANK_USER,
                permissions
              ) ||
              !user?.withdrawWallet?._id ||
              user?.withdrawWallet?.loadingBank
            }
            onClick={() => {
              handleResetWithdrawBank(user?._id, setUsers);
            }}
            className={`primary light py-1 px-2 fs-12 fw-semibold rounded-2 px-3 ${user?.loadingBank && "px-5"}`}
          >
            {user?.withdrawWallet?.loadingBank ? (
              <Spinner color="primary" variant={"primary"} size={12} />
            ) : (
              RESET
            )}
          </Button>
        </td>

        <td>
          <div className="d-flex align-items-center">
            <Dropdown
              disabled={
                !isAuthorizedAction(
                  PERMISSIONS.UPDATE_KYC_STATUS_USER,
                  permissions
                ) || user.kycLoading
              }
              loading={user?.kycLoading}
              size={GenericConstant._XS}
              placeholder={startCase(getKycStatus(user.level)?.status)}
              list={kycStatusActionValues}
              onSelect={async (_, value) => {
                await updateKycHandler(value.target.text, user, setUsers);
              }}
              variant={getKycStatus(user?.level)?.variant || ""}
              active={getKycStatus(user?.level)?.status || ""}
            />
          </div>
        </td>

        <td>
          <span className="d-flex gap-2 cursor-pointer align-items-center">
            <TableMenu
              list={getMenuActions(user, permissions)}
              onClick={(e) => actionHandler && actionHandler(e, user)}
              disabled={getMenuActions(user, permissions)?.length === 0}
            />

            <div onClick={() => toggleCollapse(user?._id, setUsers)}>
              {!user.collapsed ? (
                <i
                  className="las la-angle-down text-primary fs-18"
                  onClick={() => {
                    fetchTransactionsByRecipient();
                  }}
                ></i>
              ) : (
                <i className="las la-angle-up text-primary fs-18"></i>
              )}
            </div>
          </span>
        </td>
      </tr>

      <UserSubRow
        user={user}
        transactions={transactions}
        fetchTransactionsByRecipient={fetchTransactionsByRecipient}
      />
    </>
  );
};

export default UserRow;
