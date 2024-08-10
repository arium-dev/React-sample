import React, { useState, useEffect } from "react";

import { TRANSACTION_FEE } from "./constants";
import DetailedCard from "../../../shared/Card/DetailedCard";
import { fetchAllTransactionFee, initialTotalTransactionFee } from "./helper";
import Form from "./Form";
import TotalTransactionFee from "./TotalTransactionFee";

const Fee = ({ handleUpdateAmount }) => {
  const [totalTransactionFee, setTotalTransactionFee] = useState(
    initialTotalTransactionFee
  );

  useEffect(() => {
    Promise.all([fetchAllTransactionFee(setTotalTransactionFee)]);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="flex-1">
      <DetailedCard
        title={
          <p className="text-secondary m-0 fw-medium">{TRANSACTION_FEE}</p>
        }
      >
        <TotalTransactionFee totalTransactionFee={totalTransactionFee} />
        <Form handleUpdateAmount={handleUpdateAmount} />
      </DetailedCard>
    </div>
  );
};

export default Fee;
