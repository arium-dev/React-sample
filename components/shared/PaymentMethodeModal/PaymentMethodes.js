import React from "react";
import { TITLE, CATEGORY, FIAT_WALLET } from "./constants";
import { paymentMethodes } from "./helper";

const PaymentMethodes = ({ handleSelectPaymentMethode }) => {
  return (
    <>
      <h2 className="pm-main-title">{TITLE}</h2>
      <p className="pm-category">{CATEGORY}</p>
      {paymentMethodes?.map((item) => {
        return (
          <div
            key={item.name}
            className={`pm-item-cont ${!item.enabled ? "disabled" : ""}`}
            onClick={() => {
              if (item.name === FIAT_WALLET) handleSelectPaymentMethode(item);
            }}
          >
            <span className="avatar-cont"></span>
            <div className="d-flex flex-column flex-grow-1">
              <h3 className="pm-title">{item.title}</h3>
              <p className="pm-description">{item.description}</p>
            </div>
            <span className="arrow-icon">
              <i class="fa-solid fa-chevron-right"></i>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default PaymentMethodes;
