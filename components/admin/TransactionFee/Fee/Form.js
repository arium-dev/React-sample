import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FEE, SET_FEE, UPDATE_TRANSACTION_FEE } from "./constants";
import { feeDefaultValues, feeSchema, setFeeHandler } from "./helper";
import {
  BUTTON_TYPE,
  PERMISSIONS,
  PLACEHOLDERS,
  TYPE,
} from "../../../../utils/Constants";
import Button from "../../../shared/Button";
import Input from "../../../shared/Input/Input";
import { useDispatch } from "react-redux";
import { fetchTransactionFee } from "../../../../store/transactionFee";
import UseTransactionFee from "../../../../hooks/UseTransactionFee";
import { useSelector } from "react-redux";
import { isAuthorizedAction } from "../../../../utils";

const Form = ({ handleUpdateAmount }) => {
  const {
    watch,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: feeDefaultValues,
    resolver: zodResolver(feeSchema),
  });

  const dispatch = useDispatch();
  const { transactionFee, loading } = UseTransactionFee();
  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    if (transactionFee?.value) setValue(FEE, transactionFee?.value);
    //eslint-disable-next-line
  }, [transactionFee?.value]);

  const onSubmit = async (data) => {
    await setFeeHandler(data);
    dispatch(fetchTransactionFee());
    handleUpdateAmount(data?.fee);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sell-element m-0 p-0">
        <div className="sell-blance my-2">
          <label className="form-label text-primary">{SET_FEE}</label>

          <div
            className={`input-group ${
              !isAuthorizedAction(
                PERMISSIONS.UPDATE_TRANSACTION_FEE,
                permissions
              ) && "opacity-50"
            }`}
          >
            <Input
              type={TYPE.TEXT}
              name={FEE}
              placeholder={PLACEHOLDERS.FEE}
              loading={loading}
              value={watch(FEE)}
              error={errors?.[FEE]?.message}
              onBlur={() => trigger(FEE)}
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e?.target?.value))
                  setValue(FEE, e.target.value, { shouldDirty: true });
              }}
              symbol="%"
              step=".01"
              disabled={
                !isAuthorizedAction(
                  PERMISSIONS.UPDATE_TRANSACTION_FEE,
                  permissions
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Button
          loading={isSubmitting}
          disabled={
            !isAuthorizedAction(
              PERMISSIONS.UPDATE_TRANSACTION_FEE,
              permissions
            ) ||
            isSubmitting ||
            !isDirty
          }
          type={BUTTON_TYPE.SUBMIT}
          className="btn w-50"
        >
          {UPDATE_TRANSACTION_FEE}
        </Button>
      </div>
    </form>
  );
};

export default Form;
