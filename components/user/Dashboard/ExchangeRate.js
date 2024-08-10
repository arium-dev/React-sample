import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import {
  CURRENCY_CODE,
  CURRENCY_RATE,
  DESTINATION_CURRENCY,
  FEES_MSG,
  LAST_UPDATED,
} from "./constants";
import ExchangeFormBody from "../../shared/CurrencyExchangeModel/ExchangeFormBody";
import { useForm } from "react-hook-form";
import { getCurrencyExchangeInitialValues } from "./helper";
import UseCurrency from "../../../hooks/UseCurrency";
import { FormatTwoDecimals, formatFullDate } from "../../../utils";
import Currency from "../Currency";
import { EXCHANGE_CURRENCY_ID } from "../../shared/CurrencyExchangeModel/constants";
import { GenericConstant } from "../../../utils/Constants";

export const ExchangeRate = () => {
  const { currencies } = UseCurrency();
  const [isSendOpen, setIsSendOpen] = useState(false);

  const {
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: getCurrencyExchangeInitialValues(currencies?.[0]),
  });

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
  }, [currencies]);

  return (
    <div className="exchange-rate-user-dashboard">
      <Card>
        <Card.Body>
          <Card.Text>
            <ExchangeFormBody
              errors={errors}
              watch={watch}
              trigger={trigger}
              setValue={setValue}
              isDashboard
              setIsSendOpen={setIsSendOpen}
            />

            <div className="d-flex justify-content-between">
              <div>
                <p className="m-0 text-secondary">{FEES_MSG}</p>
                <p className="m-0 text-secondary">
                  <span className="fw-semibold">{LAST_UPDATED}</span>{" "}
                  {formatFullDate(watch(DESTINATION_CURRENCY)?.updatedAt)}
                </p>
              </div>

              <p className="text-secondary">
                1 AUD ={" "}
                {`${FormatTwoDecimals(watch(DESTINATION_CURRENCY)?.conversionRate)} ${watch(DESTINATION_CURRENCY)?.code}`}
              </p>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Currency
        isSendOpen={isSendOpen}
        setIsSendOpen={setIsSendOpen}
        watch={watch}
        setNewValue={setValue}
      />
    </div>
  );
};
