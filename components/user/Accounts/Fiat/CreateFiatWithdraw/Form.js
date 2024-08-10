import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { modifyBanks, handleCreateFiatWithdraw } from "../helper";
import Button from "../../../../shared/Button";
import { GenericConstant, ZERO } from "../../../../../utils/Constants";
import FormBody from "./FormBody";
import { Constants } from "./constants";
import { withdrawValidationSchema } from "../../../../../utils/validation";
import { withdrawDefaultValues } from "../../../../../utils/DefaultValues";
import UseUserWallet from "../../../../../hooks/UseUserWallet";
import UseUserBalance from "../../../../../hooks/UseUserBalance";

const Form = ({ onCloseModal, handleRefresh }) => {
  const { userWallet } = UseUserWallet();
  const { balance, handleRefreshBalance } = UseUserBalance();

  const [loading, setLoading] = useState(GenericConstant.FALSE);

  const {
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: withdrawDefaultValues,
    resolver: zodResolver(withdrawValidationSchema),
  });

  const onSubmit = useCallback(
    (values) => {
      handleCreateFiatWithdraw(
        values,
        setLoading,
        handleRefresh,
        handleRefreshBalance,
        onCloseModal,
        userWallet
      );
    },
    [handleRefresh, handleRefreshBalance, onCloseModal, userWallet]
  );

  useEffect(() => {
    if (!!balance) {
      setValue(Constants._CURRENT_BALANCE, balance || ZERO);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={GenericConstant._OFF}
      noValidate
    >
      <div>
        <FormBody
          banks={modifyBanks(userWallet)}
          errors={errors}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          disabled={loading}
        />
      </div>

      <Button
        type={GenericConstant._SUBMIT}
        disabled={loading || watch(Constants._AMOUNT) < 10}
        loading={loading}
        className="w-100 my-2"
      >
        {GenericConstant.SUBMIT}
      </Button>
    </form>
  );
};

export default Form;
