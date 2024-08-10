import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { currencyExchangeSchema } from "../../../utils/validation";
import { getCurrencyExchangeInitialValues } from "../../../utils/DefaultValues/conditional";
import ExchangeFormBody from "../CurrencyExchangeModel/ExchangeFormBody";
import { BUTTON_TYPE } from "../../../utils/Constants";
import Button from "../Button";
import { FEES_MSG, NEXT } from "./constants";
import { AMOUNT_IN_AUD } from "../CurrencyExchangeModel/constants";

const Form = ({ currency, handleClickNext }) => {
  const {
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: getCurrencyExchangeInitialValues(currency),
    resolver: zodResolver(currencyExchangeSchema),
  });

  return (
    <>
      <div className="pt-4">
        <ExchangeFormBody
          errors={errors}
          watch={watch}
          trigger={trigger}
          setValue={setValue}
        />
        <p className="m-0 text-secondary">{FEES_MSG}</p>
      </div>
      {handleClickNext && (
        <div className="d-flex justify-content-end border-top mt-3">
          <Button
            type={BUTTON_TYPE.BUTTON}
            className="mt-3"
            onClick={() => handleClickNext(watch())}
          >
            {NEXT}
          </Button>
        </div>
      )}
    </>
  );
};

export default Form;
