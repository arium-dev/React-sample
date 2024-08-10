import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBody from "./FormBody";
import { currencyExchangeSchema } from "../../../utils/validation";
import { getCurrencyExchangeInitialValues } from "../../../utils/DefaultValues/conditional";
import UseUserBalance from "../../../hooks/UseUserBalance";
import UseTransactionFee from "../../../hooks/UseTransactionFee";

const Form = ({
  currency,
  handleSelectCurrency,
  modal = null,
  amountInAud,
  destinationCurrency,
  currencyRate,
  currencyCode,
  exchangeCurrencyId,
  setNewValue,
}) => {
  const { balance } = UseUserBalance();
  const { transactionFee } = UseTransactionFee();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: getCurrencyExchangeInitialValues(
      currency,
      modal,
      amountInAud,
      destinationCurrency,
      currencyRate,
      currencyCode,
      transactionFee,
      exchangeCurrencyId
    ),
    resolver: zodResolver(currencyExchangeSchema),
  });

  return (
    <form onSubmit={(e) => handleSubmit(handleSelectCurrency)(e)}>
      <FormBody
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        balance={balance}
        transactionFee={transactionFee}
        modal={modal}
        setNewValue={setNewValue}
      />
    </form>
  );
};

export default Form;
