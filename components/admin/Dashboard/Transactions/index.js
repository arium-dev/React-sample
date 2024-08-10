import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoinCard from "./CoinCard";
import { getCardInitials } from "./constants";
import { getBalances } from "./helper";
import { useSelector } from "react-redux";

const Transactions = () => {
  const permissions = useSelector((state) => state.auth.permissions);

  const [transactions, setTransactions] = useState(
    getCardInitials(permissions)
  );
  const navigate = useNavigate();
  useEffect(() => {
    getBalances(setTransactions, permissions);
  }, [permissions]);

  return (
    <div className="row mt-2">
      {transactions?.list?.length > 0 &&
        transactions?.list.map((card) => (
          <div
            className={`mt-sm-3 col-md-6 col-lg-${transactions?.list.length === 2 ? 6 : 3}`}
          >
            <CoinCard
              loading={transactions?.loading}
              coin={card}
              onClick={(row) => {
                navigate(row.url, { state: row?.state });
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default Transactions;
