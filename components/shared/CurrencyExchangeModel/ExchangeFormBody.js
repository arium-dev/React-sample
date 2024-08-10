import React, { useCallback, useEffect } from "react";
import Input from "../Input/Input";
import {
  LABELS,
  PLACEHOLDERS,
  TYPE,
  ONE_MILLION,
} from "../../../utils/Constants";
import {
  AUD,
  AMOUNT_IN_AUD,
  AMOUNT_RECEIVED,
  FEE_AMOUNT,
  CURRENCY_RATE,
  CURRENCY_CODE,
  DESTINATION_CURRENCY,
  EXCHANGE_CURRENCY_ID,
} from "./constants";
import { ConversionIcon, GoIcon } from "../../../icons";
import UseCurrency from "../../../hooks/UseCurrency";
import CurrencyDropDown from "./CurrencyDropDown";
import UseTransactionFee from "../../../hooks/UseTransactionFee";
import { FormatTwoDecimals } from "../../../utils";

const ExchangeFormBody = ({
  errors,
  watch,
  trigger,
  setValue,
  balance = "",
  modal = null,
  isDashboard = false,
  setIsSendOpen = null,
  setNewValue = null,
}) => {
  const { currencies, loading } = UseCurrency();
  const { transactionFee } = UseTransactionFee();
  const sourceCurrency = currencies?.find((c) => c?.code === AUD);

  useEffect(() => {
    if (modal?.formData?.amount) {
      const val = modal?.formData?.amount;

      const feeAmount = (val * parseFloat(transactionFee?.value || 0)) / 100;

      const amountReceived =
        parseFloat(parseFloat(val) - feeAmount) *
        parseFloat(watch(CURRENCY_RATE));

      setValue(FEE_AMOUNT, feeAmount);
      setValue(AMOUNT_RECEIVED, amountReceived);
      trigger(AMOUNT_IN_AUD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, transactionFee?.value]);

  const handleUpdateAmount = useCallback(
    (val = 0, rate = 0) => {
      const feeAmount = (val * parseFloat(transactionFee?.value || 0)) / 100;
      const amountReceived =
        parseFloat(parseFloat(val) - feeAmount) * parseFloat(rate);

      setValue(FEE_AMOUNT, feeAmount);
      setValue(AMOUNT_RECEIVED, amountReceived);
    },
    [setValue, transactionFee?.value]
  );

  return (
    <div className={`${isDashboard && "c-exchange-input-cont"}`}>
      <Input
        type={TYPE.TEXT}
        name={AMOUNT_IN_AUD}
        label={LABELS.YOU_SEND}
        placeholder={PLACEHOLDERS.AMOUNT}
        value={
          watch(AMOUNT_IN_AUD)
            ? FormatTwoDecimals(watch(AMOUNT_IN_AUD))
            : watch(AMOUNT_IN_AUD)
        }
        error={errors?.[AMOUNT_IN_AUD]?.message}
        onBlur={() => trigger(AMOUNT_IN_AUD)}
        onChange={(e) => {
          let val = parseFloat(e.target.value || 0);

          if (val < 0 || isNaN(val) || val >= ONE_MILLION) return;

          handleUpdateAmount(val, watch(CURRENCY_RATE));
          setValue(
            AMOUNT_IN_AUD,
            e.target.value ? parseFloat(e.target.value) : "",
            { shouldDirty: true }
          );

          // if (setNewValue) {
          //   const feeAmount =
          //     (watch(AMOUNT_IN_AUD) * parseFloat(transactionFee?.value || 0)) /
          //     100;
          //   const amountReceived =
          //     parseFloat(parseFloat(watch(AMOUNT_IN_AUD)) - feeAmount) *
          //     parseFloat(watch(CURRENCY_RATE));

          //   setNewValue(AMOUNT_RECEIVED, amountReceived);
          //   setNewValue(AMOUNT_IN_AUD, watch(AMOUNT_IN_AUD));
          // }

          trigger(AMOUNT_IN_AUD);
        }}
        endGroupText={
          <span className="d-flex align-items-center">
            <span className="currency-icon-cont me-2">
              <img src={sourceCurrency?.logo} alt="c" className="w-100 h-100" />
            </span>
            <span className="text-primary text-lg fs-20 fw-light m-0">
              {sourceCurrency?.code}
            </span>
          </span>
        }
      />

      <Input
        disabled={true}
        type={TYPE.TEXT}
        name={AMOUNT_RECEIVED}
        label={LABELS.RECIPIENT_RECEIVE}
        placeholder={PLACEHOLDERS.AMOUNT_RECEIVE}
        value={
          watch(AMOUNT_RECEIVED)
            ? FormatTwoDecimals(watch(AMOUNT_RECEIVED))
            : watch(AMOUNT_RECEIVED)
        }
        error={errors?.[EXCHANGE_CURRENCY_ID]?.message}
        endGroupText={
          <CurrencyDropDown
            currencies={currencies}
            loading={loading}
            currency={watch(DESTINATION_CURRENCY)}
            onChangeCurrency={(c) => {
              setValue(DESTINATION_CURRENCY, c);
              setValue(CURRENCY_CODE, c?.code);
              setValue(EXCHANGE_CURRENCY_ID, c?.id);
              handleUpdateAmount(watch(AMOUNT_IN_AUD) || 0, c?.conversionRate);
              setValue(CURRENCY_RATE, c?.conversionRate || 0, {
                shouldDirty: true,
              });
              trigger(EXCHANGE_CURRENCY_ID);
            }}
          />
        }
      />

      {isDashboard && (
        <div className="conversion-icon-cont">
          <GoIcon
            className={`conversion-icon cursor-pointer ${(watch(AMOUNT_IN_AUD) === 0 || !watch(AMOUNT_IN_AUD)) && "opacity-50"}`}
            onClick={() => {
              if (watch(AMOUNT_IN_AUD) === 0 || !watch(AMOUNT_IN_AUD)) return;

              setIsSendOpen && setIsSendOpen(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExchangeFormBody;
