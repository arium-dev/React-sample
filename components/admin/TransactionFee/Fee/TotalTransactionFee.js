import React from "react";
import Spinner from "../../../shared/Spinner";

const TotalTransactionFee = ({ totalTransactionFee }) => {
  return (
    <div className="transaction-fee-amount-bg mb-3 d-flex justify-content-center align-items-center">
      {totalTransactionFee?.loading ? (
        <Spinner color="primary" variant={"primary"} size={28} />
      ) : (
        <div className="d-flex justify-content-between align-items-center w-100">
          <h2 className="text-primary m-0">
            $
            {totalTransactionFee?.data &&
              parseFloat(totalTransactionFee?.data).toLocaleString()}
          </h2>
          <h2 className="text-primary m-0">AUD</h2>
        </div>
      )}
    </div>
  );
};

export default TotalTransactionFee;
