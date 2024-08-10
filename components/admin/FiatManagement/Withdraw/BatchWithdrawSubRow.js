import React from "react";
import { Card, Collapse } from "react-bootstrap";
import {
  ACCOUNT_NUMBER,
  BSB,
  WITHDRAW,
  headerValuesWithdrawsRow,
} from "../constants";
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
  kycStatusActionValues,
  getKycStatus,
  updateKycHandler,
} from "./helper";
import {
  GenericConstant,
  PERMISSIONS,
  withdrawStatusActions,
  ZERO,
} from "../../../../utils/Constants";
import StatusDropdown from "./StatusDropdown";
import { upperFirst, startCase } from "lodash";
import ToolTip from "../../../shared/Tooltip";
import { InfoIcon } from "../../../../icons";
import Dropdown from "../../../shared/Dropdown/CustomDropdown";
import Spinner from "../../../shared/Spinner";

const BatchWithdrawSubRow = ({
  withdraw,
  handleStatusUpdateConfirmation,
  setWithdraws,
  permissions,
}) => {
  return (
    <tr className="mx-2 shadow-none">
      <td colSpan="8" className="remove-spacing">
        <Collapse in={withdraw.collapsed}>
          <div>
            <Card className="my-2 rounded-2 mx-1">
              <Card.Body className="remove-spacing">
                <table className="table dataTable shadow-hover display m-0">
                  <thead>
                    {headerValuesWithdrawsRow.map((header) => {
                      return (
                        <th className="text-tableBody m-0 py-2 border-0 withdraw-table-header">
                          <h6 className="my-0 p-0 fs-14 text-table-header">
                            {header?.name}
                          </h6>
                        </th>
                      );
                    })}
                  </thead>

                  <tbody className="withdraw-table-row">
                    {withdraw?.withdraws?.length > ZERO &&
                      !withdraw?.withdrawsLoading &&
                      withdraw?.withdraws.map((w) => {
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
                                <span className="fw-bold">
                                  {ACCOUNT_NUMBER}
                                </span>
                                {getBank(w)}
                              </div>
                            </td>

                            <td>{w?.refId}</td>

                            <td>{formatDate(w.createdAt)}</td>

                            <td>{formatDate(w.updatedAt)}</td>

                            <td>
                              {CurrencyFormattor(FormatTwoDecimals(w.amount))}
                            </td>

                            <td>
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
                                  onSelect={async (e, value) => {
                                    if (
                                      isAuthorizedAction(
                                        PERMISSIONS.UPDATE_KYC_STATUS_USER,
                                        permissions
                                      )
                                    )
                                      await updateKycHandler(
                                        value.target.text,
                                        w,
                                        setWithdraws
                                      );
                                  }}
                                  active={
                                    getKycStatus(w?.userId?.level)?.status || ""
                                  }
                                  variant={
                                    getKycStatus(w?.userId?.level)?.variant ||
                                    ""
                                  }
                                  loading={w?.withdrawLoading}
                                />
                              </div>
                            </td>

                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <StatusDropdown
                                  id={w.id}
                                  status={w.status}
                                  batchId={withdraw.id}
                                  type={WITHDRAW}
                                  withdraws={withdraw.withdraws}
                                  handleStatusUpdateConfirmation={
                                    handleStatusUpdateConfirmation
                                  }
                                  size={GenericConstant._XS}
                                  list={withdrawStatusActions}
                                  disabled={
                                    !isAuthorizedAction(
                                      PERMISSIONS.UPDATE_TRANSACTION_STATUS_WITHDRAWAL,
                                      permissions
                                    ) || withdraw.loading
                                  }
                                />

                                <ToolTip
                                  title={w?.message || ""}
                                  placement="top"
                                >
                                  <InfoIcon className="withdraw-information cursor-pointer mb-1" />
                                </ToolTip>
                              </div>
                            </td>

                            <td>
                              {w?.receipt ? (
                                <a
                                  href={w.receipt}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {upperFirst(
                                    w?.receipt
                                      ?.split("/")
                                      .pop()
                                      .split("-")
                                      .pop()
                                  )}
                                </a>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    {withdraw?.withdrawsLoading && (
                      <tr className="shadow-none">
                        <td colSpan={headerValuesWithdrawsRow.length}>
                          <div className="d-flex align-items-center justify-content-center p-4">
                            <Spinner color="primary" />
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </div>
        </Collapse>
      </td>
    </tr>
  );
};

export default BatchWithdrawSubRow;
