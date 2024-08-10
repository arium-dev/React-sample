import React, { useState, useEffect, useCallback } from "react";
import Table from "../../shared/Table";
import { ADD_RECIPIENT } from "./constants";
import { ONE } from "../../../utils/Constants";
import {
  fetchRecipients,
  getTableHeader,
  getInitialRecipientValue,
} from "./helper";
import TransactionRow from "./TransactionRow";
import { useSelector } from "react-redux";

const TransactionHistory = () => {
  const { data: userProfile } = useSelector((state) => state.userProfile);

  const [data, setData] = useState(getInitialRecipientValue());

  useEffect(() => {
    fetchRecipients(data.page, data.search, setData, userProfile?.id);
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback((search) => {
    setData((prev) => ({ ...prev, search }));
    fetchRecipients(ONE, search, setData, userProfile?.id);
    // eslint-disable-next-line
  }, []);

  const handlePagination = useCallback(
    (page) => {
      setData((prev) => ({ ...prev, page }));
      fetchRecipients(page, data.search, setData, userProfile?.id);
    },
    // eslint-disable-next-line
    [data]
  );

  const handleRefresh = useCallback(() => {
    fetchRecipients(ONE, data.search, setData, userProfile?.id);
    //eslint-disable-next-line
  }, [data]);

  return (
    <>
      <Table
        loading={data.loading}
        search={data.search}
        handleSearch={handleSearch}
        header={getTableHeader()}
        bodyData={data.list}
        limit={data?.offset}
        total={data?.total}
        page={data?.page}
        handlePagination={handlePagination}
        handleRefresh={handleRefresh}
        btnText={ADD_RECIPIENT}
      >
        {data.list.length > 0 &&
          data.list.map((row) => (
            <TransactionRow transaction={row} setData={setData} />
          ))}
      </Table>
    </>
  );
};

export default TransactionHistory;
