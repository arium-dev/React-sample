import React from "react";
import BasicCard from "../../../shared/Card/BasicCard";
import Spinner from "../../../shared/Spinner";
import { FormatTwoDecimals } from "../../../../utils";

const CoinCard = ({ loading, coin, onClick }) => {
  return (
    <div className="w-100 position-relative h-100">
      <BasicCard className={`w-100 mt-4`}>
        <div
          className="w-100 max-w-full d-flex flex-column w-100 justify-content-center align-items-center text-center cursor-pointer"
          onClick={() => onClick && onClick(coin)}
        >
          <span className="fs-6 fw-normal text-body pb-1">{coin?.title}</span>
          {loading ? (
            <div className="text-primary mt-3">
              <Spinner color="text-primary" size={25} />
            </div>
          ) : (
            <span className="fs-3 w-100">
              ${FormatTwoDecimals(coin?.amount) || "0"}
            </span>
          )}
        </div>
      </BasicCard>
      {coin?.icon && (
        <div className="dashboard-coin-card">
          <img src={coin.icon} className="dashboard-coin" alt="" />
        </div>
      )}
    </div>
  );
};

export default CoinCard;
