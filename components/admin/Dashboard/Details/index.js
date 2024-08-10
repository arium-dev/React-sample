import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveCard from "../../../shared/Card/ActiveCard";
import Spinner from "../../../shared/Spinner";
import AmountItem from "./AmountItem";
import {
  AMOUNT_INITIAL,
  DEFAULT_TRANSACTION_SUMMARY,
  INFO_INITIAL,
  PENDING,
  TRANSACTION_SUMMARY,
} from "./constants";
import { getAmountData, getDetails, getTransactionSummary } from "./helper";
import InfoCard from "./InfoCard";
import { useSelector } from "react-redux";

const Details = () => {
  const navigate = useNavigate();
  const permissions = useSelector((state) => state.auth.permissions);

  const [info, setInfo] = useState(INFO_INITIAL);
  const [amount, setAmount] = useState(AMOUNT_INITIAL);
  const [transactionSummary, setTransactionSummary] = useState(
    DEFAULT_TRANSACTION_SUMMARY
  );

  useEffect(() => {
    getDetails(setInfo);
    getAmountData(setAmount, permissions);
    getTransactionSummary(setTransactionSummary);
  }, [permissions]);

  return (
    <div className="row">
      <div className="col-md-6 custom-col-3 mt-3 mt-md-1">
        <InfoCard
          loading={info?.loading}
          data={info?.list}
          onClick={(row) => navigate(row.url, { state: row?.state })}
        />
      </div>
      <div className="col-md-6 custom-col-4 mt-3 mt-md-1">
        <ActiveCard
          className="h-100"
          headerClass="primary-card justify-content-center"
          header={<>{PENDING}</>}
        >
          <div className="row h-100 p-3 gx-3">
            {amount?.loading ? (
              <div className="d-flex align-items-center justify-content-center text-primary">
                <Spinner color="text-primary" size={30} />
              </div>
            ) : (
              amount?.list?.map((data) => (
                <div className="col-sm-6  mt-2 mt-sm-0">
                  <AmountItem
                    data={data}
                    onClick={(row) => navigate(row.url, { state: row?.state })}
                    type={PENDING}
                  />
                </div>
              ))
            )}
          </div>
        </ActiveCard>
      </div>
      <div className="col-md-12 custom-col-5 mt-4 mt-lg-1">
        <ActiveCard
          className="h-100"
          headerClass="primary-card justify-content-center"
          header={
            <div className="d-flex flex-row relative">
              <div>{TRANSACTION_SUMMARY}</div>
            </div>
          }
        >
          <div className="row h-100 p-3 gx-3">
            {transactionSummary?.loading ? (
              <div className="d-flex align-items-center justify-content-center text-primary">
                <Spinner color="text-primary" size={30} />
              </div>
            ) : (
              transactionSummary?.list?.map((data) => (
                <div className="col-sm-4 mt-2 mt-sm-0">
                  <AmountItem
                    data={data}
                    onClick={(row) => navigate(row.url)}
                    type={TRANSACTION_SUMMARY}
                  />
                </div>
              ))
            )}
          </div>
        </ActiveCard>
      </div>
    </div>
  );
};

export default Details;
