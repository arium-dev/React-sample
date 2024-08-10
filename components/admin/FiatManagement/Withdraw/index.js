import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Table from "../../../shared/Table";
import {
  fetchWithdraws,
  initialAddEditWithdrawValues,
  initialVerify2FAWithdraw,
  initialEditWithdrawValues,
  getTableHeader,
  initialWithdrawValuesFunc,
} from "../helper";
import { FIAT_MANAGEMENT, VIEW_AS_BATCH, WithdrawTabs } from "../constants";
import {
  handleStatusUpdateConfirmation,
  handleTabs,
  withdrawActionHandler,
} from "./helper";
import AddEditWithdraw from "./AddEdit";
import { useSelector } from "react-redux";
import Verify2FA from "./Verify2FA";
import BatchWithdrawRow from "./BatchWithdrawRow";
import TransactionRow from "./TransactionWithdrawRow";
import { isAuthorizedAction } from "../../../../utils";
import { PERMISSIONS, ONE } from "../../../../utils/Constants";

const Withdraw = ({ mainTabs, activeTab, handleActiveTab }) => {
  let location = useLocation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const permissions = useSelector((state) => state.auth.permissions);

  const [withdraws, setWithdraws] = useState(
    initialWithdrawValuesFunc(
      location?.state?.search || "",
      window.history?.state?.selectedTab
    )
  );
  const [withdraw, setWithdraw] = useState(initialAddEditWithdrawValues);
  const [verify2FA, setVerify2FA] = useState(initialVerify2FAWithdraw);
  const [editWithdraws, setEditWithdraws] = useState(initialEditWithdrawValues);

  useEffect(() => {
    if (!(location?.state?.search || window.history?.state?.search)) {
      fetchWithdraws(
        withdraws.page,
        withdraws.search,
        setWithdraws,
        withdraws.selectedTab
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state?.search, withdraws.selectedTab]);

  const handleSearch = useCallback(
    (search) => {
      setWithdraws((prev) => ({ ...prev, search }));
      fetchWithdraws(ONE, search, setWithdraws, withdraws.selectedTab);
      window.history.replaceState(
        search ? { search, activeTab, selectedTab: withdraws.selectedTab } : {},
        "",
        window.location?.pathname
      );
    },
    [activeTab, withdraws.selectedTab]
  );

  const handlePagination = useCallback(
    (page) => {
      setWithdraws((prev) => ({ ...prev, page }));
      fetchWithdraws(
        page,
        withdraws.search,
        setWithdraws,
        withdraws.selectedTab
      );
    },
    [withdraws]
  );

  const handleRefresh = useCallback(() => {
    fetchWithdraws(ONE, withdraws.search, setWithdraws, withdraws.selectedTab);
  }, [withdraws]);

  const handleCreate = useCallback((action, value) => {
    setWithdraw((prev) => ({ ...prev, open: true }));
  }, []);

  const actionHandler = useCallback((action, value) => {
    withdrawActionHandler(action, value, setWithdraws, setWithdraw);
  }, []);

  const refreshWithdrawsList = () => {
    fetchWithdraws(
      withdraws.page,
      withdraws.search,
      setWithdraws,
      withdraws.selectedTab
    );
    //eslint-disable-next-line
  };

  const changeStatusHandler = async (withdraws, status, type, id, batchId) => {
    await handleStatusUpdateConfirmation(
      withdraws,
      status,
      type,
      id,
      batchId,
      setVerify2FA,
      refreshWithdrawsList,
      userInfo,
      setWithdraws
    );
  };
  //eslint-disable-next-line

  const handleTabHandler = useCallback(
    (value) => {
      if (location?.state?.search) {
        location.state = null;
      }
      window.history.replaceState(
        { selectedTab: value, activeTab },
        "",
        window.location?.pathname
      );
      handleTabs(value, withdraws, setWithdraws);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [withdraws.selectedTab]
  );

  return (
    <>
      <Table
        loading={withdraws.loading}
        title={FIAT_MANAGEMENT}
        search={location?.state?.search || window.history?.state?.search || ""}
        handleSearch={handleSearch}
        header={getTableHeader(withdraws.selectedTab)}
        bodyData={withdraws.list}
        limit={withdraws?.offset}
        total={withdraws?.total}
        page={withdraws?.page}
        handlePagination={handlePagination}
        mainTabs={mainTabs}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        handleCreate={
          isAuthorizedAction(PERMISSIONS.CREATE_BATCH_WITHDRAWAL, permissions)
            ? handleCreate
            : null
        }
        handleRefresh={handleRefresh}
        actionHandler={actionHandler}
        tabs={WithdrawTabs}
        handleTab={handleTabHandler}
        selectedTab={withdraws.selectedTab}
      >
        {withdraws.list.length > 0 &&
          withdraws.list.map((withdraw) =>
            withdraws.selectedTab === VIEW_AS_BATCH ? (
              <BatchWithdrawRow
                key={withdraw?._id}
                withdraw={withdraw}
                setWithdraws={setWithdraws}
                actionHandler={actionHandler}
                handleStatusUpdateConfirmation={changeStatusHandler}
                permissions={permissions}
              />
            ) : (
              <TransactionRow
                withdraw={withdraw}
                setWithdraws={setWithdraws}
                handleStatusUpdateConfirmation={changeStatusHandler}
                permissions={permissions}
              />
            )
          )}
      </Table>

      {isAuthorizedAction(PERMISSIONS.CREATE_BATCH_WITHDRAWAL, permissions) &&
        withdraw.open && (
          <AddEditWithdraw
            withdraw={withdraw}
            setWithdraw={setWithdraw}
            refreshWithdrawsList={refreshWithdrawsList}
            editWithdraws={editWithdraws}
            setEditWithdraws={setEditWithdraws}
          />
        )}

      {verify2FA.open && (
        <Verify2FA setVerify2FA={setVerify2FA} verify2FA={verify2FA} />
      )}
    </>
  );
};

export default Withdraw;
