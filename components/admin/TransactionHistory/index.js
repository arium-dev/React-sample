import React, { useState, useEffect, useCallback } from "react";
import Table from "../../shared/Table";
import Row from "./Row";
import { ZERO, ONE } from "../../../utils/Constants";
import {
  defaultValues,
  headerValuesOrganization,
  fetchTransactions,
} from "./helper";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(defaultValues);

  useEffect(() => {
    fetchTransactions(transactions.page, transactions.search, setTransactions);
    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback(
    (search) => {
      setTransactions((prev) => ({ ...prev, search }));
      fetchTransactions(ONE, search, setTransactions);
    },
    [setTransactions]
  );

  const handlePagination = useCallback(
    (page) => {
      setTransactions((prev) => ({ ...prev, page }));
      fetchTransactions(page, transactions.search, setTransactions);
    },
    [transactions]
  );

  const handleRefresh = useCallback(() => {
    fetchTransactions(ONE, transactions.search, setTransactions);
  }, [transactions]);

  return (
    <>
      <Table
        loading={transactions.loading}
        search={transactions.search}
        handleSearch={handleSearch}
        header={headerValuesOrganization}
        bodyData={transactions.list}
        limit={transactions?.offset}
        total={transactions?.total}
        page={transactions?.page}
        handlePagination={handlePagination}
        handleRefresh={handleRefresh}
      >
        {transactions.list.length > ZERO &&
          transactions.list.map((transaction, key) => (
            <Row
              key={key}
              transaction={transaction}
              setTransactions={setTransactions}
            />
          ))}
      </Table>
    </>
  );
};

export default TransactionHistory;
