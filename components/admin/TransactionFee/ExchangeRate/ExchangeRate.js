import React, { useEffect } from "react";

import DetailedCard from "../../../shared/Card/DetailedCard";
import {
  AMOUNT_IN_AUD,
  CURRENCY_CODE,
  CURRENCY_RATE,
  DESTINATION_CURRENCY,
  EXCHANGE_RATES,
  FEE_AMOUNT,
  OUR_FEE,
  TOTAL_FEE,
  AMOUNT_TO_CONVERT,
  ONE_AUD,
  _AUD,
  EXCHANGE_CURRENCY_ID,
} from "./constants";
import ExchangeFormBody from "../../../shared/CurrencyExchangeModel/ExchangeFormBody";
import UseCurrency from "../../../../hooks/UseCurrency";
import UseTransactionFee from "../../../../hooks/UseTransactionFee";
import Spinner from "../../../shared/Spinner";
import { GenericConstant } from "../../../../utils/Constants";

const ExchangeRate = ({ setValue, watch, errors, trigger }) => {
  const { currencies } = UseCurrency();
  const { transactionFee, loading } = UseTransactionFee();

  useEffect(() => {
    const selectedCurrency =
      currencies?.length > 0
        ? currencies.filter((c) => c.code === GenericConstant.USD)
        : null;

    if (selectedCurrency) {
      setValue(DESTINATION_CURRENCY, selectedCurrency?.[0]);
      setValue(CURRENCY_CODE, selectedCurrency?.[0]?.code);
      setValue(CURRENCY_RATE, selectedCurrency?.[0]?.conversionRate || 0, {
        shouldDirty: true,
      });
      setValue(EXCHANGE_CURRENCY_ID, selectedCurrency?.[0]?.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies, transactionFee?.value]);

  return (
    <div className="flex-1">
      <DetailedCard
        title={<p className="text-secondary m-0 fw-medium">{EXCHANGE_RATES}</p>}
      >
        <ExchangeFormBody
          errors={errors}
          watch={watch}
          trigger={trigger}
          setValue={setValue}
        />
        <div>
          <div className="d-flex align-items-center justify-content-between rb-cont">
            <span className="rate-unit">
              {ONE_AUD} {watch(CURRENCY_RATE)} {watch(CURRENCY_CODE)}
            </span>
          </div>

          <div className="calculate-section">
            <div className="c-row">
              <span className="c-value">
                <span className="c-icon-cont">
                  <span className="c-icon empty" />
                </span>
                {loading ? (
                  <Spinner color="primary" variant={"primary"} size={12} />
                ) : (
                  <>{transactionFee?.value} %</>
                )}
              </span>
              <span className="c-description">{OUR_FEE}</span>
            </div>
            <div className="c-row">
              <span className="c-value">
                <span className="c-icon-cont">
                  <span className="c-icon">
                    <i class="fa-solid fa-minus"></i>
                  </span>
                </span>
                {watch(FEE_AMOUNT) || 0}
                {_AUD}
              </span>
              <span className="c-description">{TOTAL_FEE}</span>
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
                {_AUD}
              </span>
              <span className="c-description">{AMOUNT_TO_CONVERT}</span>
            </div>
          </div>
        </div>
      </DetailedCard>
    </div>
  );
};

export default ExchangeRate;
