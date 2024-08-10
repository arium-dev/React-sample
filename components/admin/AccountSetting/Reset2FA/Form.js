import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";

import FormBody from "./FormBody";
import { verifyResetTwoFA } from "./helper";
import { twoFaSchema } from "../../../../utils/validation";
import { twoFactorWithIdDefaultValues } from "../../../../utils/DefaultValues";

const Reset2FA = ({ onCloseModal, setUserProfile, enable2FA }) => {
  const dispatch = useDispatch();

  const {
    watch,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: twoFactorWithIdDefaultValues,
    resolver: zodResolver(twoFaSchema),
  });

  const onSubmit = async (data) => {
    if (!enable2FA) {
      data.isReset = true;
    }
    await verifyResetTwoFA(data, onCloseModal, setUserProfile, dispatch);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        errors={errors}
        isSubmitting={isSubmitting}
        enable2FA={enable2FA}
      />
    </form>
  );
};

export default Reset2FA;
