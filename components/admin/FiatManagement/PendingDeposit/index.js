import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Table from "../../../shared/Table";
import {
  initialPendingDepositValues,
  fetchPendingDeposits,
  initialSinglePendingDeposit,
  generatePendingDepositCSV,
} from "../helper";
import { FIAT_MANAGEMENT, headerValuesPendingDeposit } from "../constants";
import Row from "./Row";
import { isAuthorizedAction } from "../../../../utils";
import { PERMISSIONS, ZERO, ONE } from "../../../../utils/Constants";

const PendingDeposit = ({ activeTab, handleActiveTab, mainTabs }) => {
  const [pendingDeposits, setPendingDeposits] = useState(
    initialPendingDepositValues
  );
  const [pendingDeposit, setPendingDeposit] = useState(
    initialSinglePendingDeposit
  );

  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    if (!window.history?.state?.search)
      fetchPendingDeposits(
        pendingDeposits.page,
        pendingDeposits.search,
        setPendingDeposits,
        setPendingDeposit,
        pendingDeposit
      );
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback(
    (search) => {
      setPendingDeposits((prev) => ({ ...prev, search }));
      fetchPendingDeposits(
        ONE,
        search,
        setPendingDeposits,
        setPendingDeposit,
        pendingDeposit
      );
      window.history.replaceState(
        search ? { search, activeTab } : {},
        "",
        window.location?.pathname
      );
    },
    [activeTab, pendingDeposit]
  );

  const handlePagination = useCallback(
    (page) => {
      setPendingDeposits((prev) => ({ ...prev, page }));
      fetchPendingDeposits(
        page,
        pendingDeposits.search,
        setPendingDeposits,
        setPendingDeposit,
        pendingDeposit
      );
    },
    //eslint-disable-next-line
    [pendingDeposits]
  );

  const handleRefresh = useCallback(() => {
    fetchPendingDeposits(
      ONE,
      pendingDeposits.search,
      setPendingDeposits,
      setPendingDeposit,
      pendingDeposit
    );
    //eslint-disable-next-line
  }, [pendingDeposits]);

  const handleExport = useCallback(() => {
    generatePendingDepositCSV();
  }, []);

  return (
    <>
      <Table
        loading={pendingDeposits.loading}
        title={FIAT_MANAGEMENT}
        search={pendingDeposits.search || window.history?.state?.search}
        handleSearch={handleSearch}
        header={headerValuesPendingDeposit}
        limit={pendingDeposits?.offset}
        total={pendingDeposits?.total}
        page={pendingDeposits?.page}
        handlePagination={handlePagination}
        mainTabs={mainTabs}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        handleRefresh={handleRefresh}
        handleExport={
          isAuthorizedAction(
            PERMISSIONS.EXPORT_PDF_PENDING_DEPOSIT,
            permissions
          )
            ? handleExport
            : null
        }
      >
        {pendingDeposits.list.length > ZERO &&
          pendingDeposits.list.map((item) => {
            return (
              <Row
                key={item?.id}
                item={item}
                pendingDeposit={pendingDeposit}
                setPendingDeposit={setPendingDeposit}
                setPendingDeposits={setPendingDeposits}
                permissions={permissions}
              />
            );
          })}
      </Table>
    </>
  );
};

export default PendingDeposit;
