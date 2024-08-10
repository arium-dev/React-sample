import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormBody from "./FormBody";
import { changeUserPasswordHandler } from "./helper";
import { changePasswordSchema } from "../../../../utils/validation";
import { changePasswordDefaultValues } from "../../../../utils/DefaultValues";

const Form = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: changePasswordDefaultValues,
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    await changeUserPasswordHandler(data, onCloseModal);
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
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
