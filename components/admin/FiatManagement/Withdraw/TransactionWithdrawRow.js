import React from "react";
import TransactionWithdrawSubRow from "./TransactionWithdrawSubRow";

const TransactionRow = ({
  withdraw,
  setWithdraws,
  handleStatusUpdateConfirmation,
  permissions,
}) => {
  return (
    <TransactionWithdrawSubRow
      w={withdraw}
      setWithdraws={setWithdraws}
      handleStatusUpdateConfirmation={handleStatusUpdateConfirmation}
      permissions={permissions}
    />
  );
};

export default TransactionRow;
