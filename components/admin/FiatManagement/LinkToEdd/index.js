import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Table from "../../../shared/Table";
import {
  initialPendingDepositValues,
  fetchEddTransactions,
  initialSinglePendingDeposit,
} from "../helper";
import { FIAT_MANAGEMENT, headerValuesLinkToEdd } from "../constants";
import UpdateInformation from "./UpdateInformation";
import Row from "./Row";
import { ZERO, ONE } from "../../../../utils/Constants";

const LinkToEdd = ({ activeTab, handleActiveTab, mainTabs }) => {
  const [data, setData] = useState(initialPendingDepositValues);
  const [transaction, setTransaction] = useState(initialSinglePendingDeposit);

  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    if (!window.history?.state?.search)
      fetchEddTransactions(
        data.page,
        data.search,
        setData,
        setTransaction,
        transaction
      );
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback(
    (search) => {
      setData((prev) => ({ ...prev, search }));
      fetchEddTransactions(ONE, search, setData, setTransaction, transaction);
      window.history.replaceState(
        search ? { search, activeTab } : {},
        "",
        window.location?.pathname
      );
    },
    [activeTab, transaction]
  );

  const handlePagination = useCallback(
    (page) => {
      setData((prev) => ({ ...prev, page }));
      fetchEddTransactions(
        page,
        data.search,
        setData,
        setTransaction,
        transaction
      );
    },
    //eslint-disable-next-line
    [data]
  );

  const handleRefresh = useCallback(() => {
    fetchEddTransactions(
      ONE,
      data.search,
      setData,
      setTransaction,
      transaction
    );
    //eslint-disable-next-line
  }, [data]);

  return (
    <>
      {transaction.open && (
        <UpdateInformation
          transaction={transaction}
          setTransaction={setTransaction}
          setData={setData}
        />
      )}

      <Table
        loading={data.loading}
        title={FIAT_MANAGEMENT}
        search={data.search || window.history?.state?.search}
        handleSearch={handleSearch}
        header={headerValuesLinkToEdd}
        limit={data?.offset}
        total={data?.total}
        page={data?.page}
        handlePagination={handlePagination}
        mainTabs={mainTabs}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
        handleRefresh={handleRefresh}
      >
        {data.list.length > ZERO &&
          data.list.map((item) => {
            return (
              <Row
                key={item?.id}
                item={item}
                transaction={transaction}
                setTransaction={setTransaction}
                setData={setData}
                permissions={permissions}
              />
            );
          })}
      </Table>
    </>
  );
};

export default LinkToEdd;
