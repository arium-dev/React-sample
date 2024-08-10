import React from "react";
import { BUTTON_TYPE } from "../../../utils/Constants";
import Button from "../../shared/Button";
import {
  AUD,
  FEE_AMOUNT,
  AMOUNT_IN_AUD,
  CURRENCY_RATE,
  CURRENCY_CODE,
  SUBMIT,
} from "./constants";

import ExchangeFormBody from "./ExchangeFormBody";
import { FormatTwoDecimals } from "../../../utils";

const FormBody = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  balance = 0,
  modal = null,
  setNewValue = null,
}) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-end -mt-4">
        <p className="m-0 me-2 c-balance-label">{"Current Balance: "}</p>
        <p className="m-0 c-balance-exchange text-primary">
          <span className="">{"$"}</span>{" "}
          {FormatTwoDecimals(parseFloat(balance))}
          <span className="ms-2">{AUD}</span>
        </p>
      </div>

      <ExchangeFormBody
        errors={errors}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        balance={balance}
        modal={modal}
        setNewValue={setNewValue}
      />
      <div>
        <div className="d-flex align-items-center justify-content-between rb-cont">
          <span className="rate-unit">
            {"1 AUD = "} {watch(CURRENCY_RATE)} {watch(CURRENCY_CODE)}
          </span>
          <div className="remaining-balance">
            <span className="b-label">{"Remaining Balance: "}</span>
            <span className="b-value">
              {"$"}
              {FormatTwoDecimals(
                parseFloat(balance || 0) - parseFloat(watch(AMOUNT_IN_AUD) || 0)
              )}
              {AUD}
            </span>
          </div>
        </div>

        <div className="calculate-section">
          <div className="c-row">
            <span className="c-value">
              <span className="c-icon-cont">
                <span className="c-icon empty" />
              </span>
              {parseFloat(watch(AMOUNT_IN_AUD) || 0)} {" AUD"}
            </span>
            <span className="c-description">{"Total Amount"}</span>
          </div>
          <div className="c-row">
            <span className="c-value">
              <span className="c-icon-cont">
                <span className="c-icon">
                  <i class="fa-solid fa-minus"></i>
                </span>
              </span>
              {watch(FEE_AMOUNT) || 0}
              {" AUD"}
            </span>
            <span className="c-description">{"Our Fee"}</span>
          </div>

          <div className="c-row result-cont">
            <span className="c-value">
              <span className="c-icon-cont">
                <span className="c-icon">
                  <i class="fa-solid fa-equals"></i>
                </span>
              </span>
              {parseFloat(watch(AMOUNT_IN_AUD) || 0) -
                parseFloat(watch(FEE_AMOUNT) || 0)}
              {" AUD"}
            </span>
            <span className="c-description">
              {"Total amount we’ll convert"}
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end border-top mt-3">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-3"
          loading={isSubmitting}
          disabled={isSubmitting || watch(AMOUNT_IN_AUD) <= 0}
        >
          {SUBMIT}
        </Button>
      </div>
    </>
  );
};

export default FormBody;
