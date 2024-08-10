import React, { useState, useEffect, useCallback } from "react";
import Table from "../../../shared/Table";
import { generateWithdrawCSV, getInitialData } from "./helper";
import {
  isWithdrawals,
  fetchFiatTransactionsData,
  getDefaultTab,
} from "./helper";
import { useSelector } from "react-redux";
import KYCModal from "../../../shared/Modal/KYCModal";
import CreateFiatWithdraw from "./CreateFiatWithdraw";
import { mainTabs } from "../constants";
import { ZERO, ONE, THREE, GenericConstant } from "../../../../utils/Constants";
import { CREATE_WITHDRAW, headerValues, sides } from "./constants";

const Fiat = ({ type }) => {
  const { data: userProfile } = useSelector((state) => state.userProfile);
  const [activeTab, setActiveTab] = useState(type || getDefaultTab);
  const isKycApproved = Boolean(userProfile && userProfile.level === THREE);

  const [openModel, setOpenModel] = useState(false);
  const [kycAlert, setKycAlert] = useState(false);

  const [data, setData] = useState(getInitialData(sides[activeTab]));

  useEffect(() => {
    const iData = getInitialData(sides[activeTab]);
    setData(iData);

    fetchFiatTransactionsData(
      sides[activeTab],
      iData.page,
      iData.offset,
      iData.search,
      setData
    );
    //eslint-disable-next-line
  }, [activeTab]);

  const handleSearch = useCallback(
    (search) => {
      setData((prev) => ({ ...prev, search }));
      fetchFiatTransactionsData(data.side, ONE, data.offset, search, setData);
    },
    [data.side, data.offset]
  );

  const handlePagination = useCallback(
    (page) => {
      setData((prev) => ({ ...prev, page }));
      fetchFiatTransactionsData(
        data.side,
        page,
        data.offset,
        data.search,
        setData
      );
    },
    [data]
  );

  const handleRefresh = useCallback(() => {
    fetchFiatTransactionsData(
      data.side,
      ONE,
      data.offset,
      data.search,
      setData
    );
  }, [data]);

  const handleModelOpen = useCallback(() => {
    isKycApproved ? setOpenModel(true) : setKycAlert(true);
  }, [isKycApproved]);

  const handleModelClose = useCallback(() => {
    setOpenModel(false);
  }, []);

  const handleActiveTab = useCallback(
    (tab) => {
      setActiveTab(tab || activeTab);
    },
    [activeTab]
  );

  const handleExport = useCallback(() => {
    generateWithdrawCSV();
  }, []);

  return (
    <>
      <Table
        loading={data.loading}
        search={data.search}
        handleSearch={handleSearch}
        header={headerValues[sides[activeTab]]}
        bodyData={data.list}
        limit={data?.offset}
        total={data?.total}
        page={data?.page}
        handlePagination={handlePagination}
        activeTab={activeTab}
        mainTabs={mainTabs}
        handleActiveTab={handleActiveTab}
        handleRefresh={handleRefresh}
        handleCreate={isWithdrawals(sides[activeTab]) && handleModelOpen}
        isCreateWithdrawal={isWithdrawals(sides[activeTab])}
        btnText={CREATE_WITHDRAW}
        handleExport={
          activeTab === GenericConstant._WITHDRAW ? handleExport : null
        }
      />
      {openModel && (
        <CreateFiatWithdraw
          onCloseModal={handleModelClose}
          handleRefresh={handleRefresh}
        />
      )}

      <KYCModal
        isOpen={kycAlert}
        onClose={() => {
          setKycAlert(false);
        }}
      />
    </>
  );
};

export default Fiat;
