import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../shared/Table";
import {
  initialDepositValues,
  fetchDeposits,
  generateDepositCSV,
} from "../helper";
import { FIAT_MANAGEMENT, headerValuesDeposit } from "../constants";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthorizedAction } from "../../../../utils";
import { PERMISSIONS, ONE } from "../../../../utils/Constants";

const Deposit = ({ mainTabs, activeTab, handleActiveTab }) => {
  const location = useLocation();
  const [deposits, setDeposits] = useState(initialDepositValues);
  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    if (!(location?.state?.search || window.history?.state?.search))
      fetchDeposits(deposits.page, deposits.search, setDeposits);
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback(
    (search) => {
      setDeposits((prev) => ({ ...prev, search }));
      fetchDeposits(ONE, search, setDeposits);
      window.history.replaceState(
        search ? { search, activeTab } : {},
        "",
        window.location?.pathname
      );
    },
    [activeTab]
  );

  const handlePagination = useCallback(
    (page) => {
      setDeposits((prev) => ({ ...prev, page }));
      fetchDeposits(page, deposits.search, setDeposits);
    },
    [deposits]
  );

  const handleRefresh = useCallback(() => {
    fetchDeposits(ONE, deposits.search, setDeposits);
  }, [deposits]);

  const handleExport = useCallback(() => {
    generateDepositCSV();
  }, []);

  return (
    <Table
      loading={deposits.loading}
      title={FIAT_MANAGEMENT}
      handleSearch={handleSearch}
      search={location?.state?.search || window.history?.state?.search || ""}
      header={headerValuesDeposit}
      bodyData={deposits.list}
      limit={deposits?.offset}
      total={deposits?.total}
      page={deposits?.page}
      handlePagination={handlePagination}
      mainTabs={mainTabs}
      activeTab={activeTab}
      handleActiveTab={handleActiveTab}
      handleRefresh={handleRefresh}
      handleExport={
        isAuthorizedAction(PERMISSIONS.EXPORT_PDF_DEPOSIT, permissions)
          ? handleExport
          : null
      }
    />
  );
};

export default Deposit;
