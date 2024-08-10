import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBody from "./FormBody";
import { useSelector, useDispatch } from "react-redux";
import { handleWithdrawBankAccount } from "./helper";
import { setUserWallet } from "../../../../store/userWallet";
import { changeBankSchema } from "../../../../utils/validation";
import { handleDefaultValues } from "../../../../utils/DefaultValues/conditional";

const Form = ({ onCloseModal, bankDetail }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: handleDefaultValues(bankDetail),
    resolver: zodResolver(changeBankSchema),
  });

  // const { data: userBankDetail } = useSelector((state) => state.userBankDetail);
  const { data: userWallet } = useSelector((state) => state.userWallet);
  const handleUpdateUserWallets = useCallback(
    (data) => {
      dispatch(setUserWallet(data));
    },
    [dispatch]
  );

  const onSubmit = async (data) => {
    await handleWithdrawBankAccount(
      data,
      onCloseModal,
      userWallet,
      handleUpdateUserWallets
    );
  };

  return (
    <form
      onSubmit={(e) => {
        return handleSubmit(onSubmit)(e);
      }}
    >
      <FormBody
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
      />
    </form>
  );
};

export default Form;
