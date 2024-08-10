import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ForgotPasswordHandler } from "./helper";
import FormBody from "./FormBody";
import { forgotPasswordSchema } from "../../../utils/validation";
import { forgotPasswordDefaultValues } from "../../../utils/DefaultValues";

const Form = () => {
  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: forgotPasswordDefaultValues,
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    await ForgotPasswordHandler(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
