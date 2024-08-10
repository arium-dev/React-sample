import React, { useState, useEffect } from "react";
import Table from "../../shared/Table";
import Row from "./Row";
import {
  fetchRecentTransactions,
  initialRecentTransactions,
  recentTransactionTableHeader,
} from "./helper";
import { RECENT_TRANSACTIONS, VIEW_TRANSACTION_HISTORY } from "./constants";
import { useSelector } from "react-redux";
import Button from "../../shared/Button";
import { BUTTON_TYPE } from "../../../utils/Constants";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState(
    initialRecentTransactions
  );
  const { id: userId } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    fetchRecentTransactions(setRecentTransactions, userId);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Table
        loading={recentTransactions?.loading}
        title={<h4 className="text-secondary">{RECENT_TRANSACTIONS}</h4>}
        header={recentTransactionTableHeader}
        bodyData={recentTransactions.list}
        className="recent-transactions-user"
      >
        {recentTransactions?.data?.length > 0 &&
          recentTransactions?.data?.map((row, key) => (
            <Row key={row?.id} row={row} />
          ))}
      </Table>

      {recentTransactions?.data?.length !== 0 && (
        <Link to="/transaction-history">
          <div className="d-flex justify-content-center mb-4">
            <Button type={BUTTON_TYPE.SUBMIT} className="w-25">
              {VIEW_TRANSACTION_HISTORY}
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RecentTransactions;
