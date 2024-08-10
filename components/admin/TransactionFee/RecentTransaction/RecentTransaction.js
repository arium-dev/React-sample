import React, { useState, useEffect } from "react";
import Table from "../../../shared/Table";
import Row from "./Row";
import {
  fetchRecentTransactions,
  initialRecentTransactions,
  recentTransactionTableHeader,
} from "./helper";
import { RECENT_TRANSACTIONS } from "./constants";

const RecentTransaction = () => {
  const [recentTransactions, setRecentTransactions] = useState(
    initialRecentTransactions
  );

  useEffect(() => {
    fetchRecentTransactions(setRecentTransactions);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Table
        loading={recentTransactions?.loading}
        title={
          <h4 className="text-secondary m-0 p-0">{RECENT_TRANSACTIONS}</h4>
        }
        header={recentTransactionTableHeader}
        bodyData={recentTransactions.list}
        className="recent-transactions-admin"
      >
        {recentTransactions?.data?.length > 0 &&
          recentTransactions?.data?.map((row) => (
            <Row key={row?._id} row={row} />
          ))}
      </Table>
    </div>
  );
};

export default RecentTransaction;
