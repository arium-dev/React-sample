import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verify2FAHandler } from "./helper";
import FormBody from "./FormBody";
import { verify2FASchema } from "../../../../../utils/validation";
import { twoFactorDefaultValues } from "../../../../../utils/DefaultValues";

const Form = ({ onClose, setVerify2FA, verify2FA }) => {
  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: twoFactorDefaultValues,
    resolver: zodResolver(verify2FASchema),
  });

  const onSubmit = async (data) => {
    await verify2FAHandler(data, onClose, setVerify2FA, verify2FA);
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <FormBody
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
