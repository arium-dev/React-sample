import React from "react";
import Fee from "./Fee/Fee";
import ExchangeRate from "./ExchangeRate/ExchangeRate";
import RecentTransaction from "./RecentTransaction/RecentTransaction";
import { useForm } from "react-hook-form";
import {
  AMOUNT_IN_AUD,
  AMOUNT_RECEIVED,
  CURRENCY_RATE,
  FEE_AMOUNT,
} from "./ExchangeRate/constants";

const TransactionFee = () => {
  const {
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    // defaultValues: getCurrencyExchangeInitialValues(currency),
    // resolver: zodResolver(currencyExchangeSchema),
  });

  const handleUpdateAmount = (fee) => {
    if (watch(AMOUNT_IN_AUD)) {
      const feeAmount = (watch(AMOUNT_IN_AUD) * parseFloat(fee || 0)) / 100;
      const amountReceived =
        parseFloat(parseFloat(watch(AMOUNT_IN_AUD)) - feeAmount) *
        parseFloat(watch(CURRENCY_RATE));

      setValue(FEE_AMOUNT, feeAmount);
      setValue(AMOUNT_RECEIVED, amountReceived);
    }
    // eslint-disable-next-line
  };

  return (
    <div>
      <div className="d-flex gap-3 flex-column flex-lg-row">
        <Fee handleUpdateAmount={handleUpdateAmount} />
        <ExchangeRate
          setValue={setValue}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />
      </div>

      <RecentTransaction />
    </div>
  );
};

export default TransactionFee;
