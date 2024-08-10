import React from "react";
import TransactionSubRow from "./TransactionSubRow";

const TransactionRow = ({ transaction, setData }) => {
  return <TransactionSubRow transaction={transaction} setData={setData} />;
};

export default TransactionRow;
