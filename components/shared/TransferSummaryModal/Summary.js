import React from "react";
import { TITLE, CONFIRM } from "./constants";
import { summary } from "./helper";
import { BUTTON_TYPE } from "../../../utils/Constants";
import Button from "../../shared/Button";
import { isNumber } from "lodash";
import { FormatTwoDecimals } from "../../../utils";
import { AMOUNT_RECEIVED } from "../CurrencyExchangeModel/constants";

const Summary = ({ loading, formData, handleConfirm }) => {
  const getValue = (key) => {
    if (isNumber(formData[key])) {
      let value = FormatTwoDecimals(formData[key]);
      if (key !== AMOUNT_RECEIVED) return value;
      else {
        const amountReceived = FormatTwoDecimals(
          parseFloat(parseFloat(formData?.amountInAud) - formData?.feeAmount) *
            parseFloat(formData?.currencyRate)
        );

        return amountReceived + " " + formData?.receiverCurrencyCode;
      }
    } else return formData[key];
  };
  return (
    <>
      <h2 className="ts-title">{TITLE}</h2>
      {summary?.map((item) => {
        return (
          <div
            key={item.key}
            className="d-flex align-items-center justify-content-between py-2"
          >
            {console.log("ABC", getValue(item.key))}
            <h3 className="ts-label">{item.label}</h3>
            <p className={`ts-value ${item.class}`}>
              {item?.key !== AMOUNT_RECEIVED && formData[item.key] && item.unit}
              {getValue(item.key) || "--"}
            </p>
          </div>
        );
      })}
      <div className="d-flex justify-content-end border-top mt-3">
        <Button
          type={BUTTON_TYPE.BUTTON}
          className="mt-3"
          loading={loading}
          disabled={loading}
          onClick={() => handleConfirm(true)}
        >
          {CONFIRM}
        </Button>
      </div>
    </>
  );
};

export default Summary;
