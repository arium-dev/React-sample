import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginHandler } from "./helper";
import FormBody from "./FormBody";
import { loginSchema } from "../../../utils/validation";
import { loginDefaultValues } from "../../../utils/DefaultValues";
import { setUserInfo, setLoginKey } from "../../../store/auth";

const Form = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const handleSetUserInfo = useCallback(
    (userInfo) => {
      dispatch(setUserInfo(userInfo));
    },
    [dispatch]
  );

  const handleSetLoginKey = useCallback(
    (key) => {
      dispatch(setLoginKey(key));
    },
    [dispatch]
  );

  const onSubmit = async (data) => {
    loginHandler(data, handleSetUserInfo, handleSetLoginKey, setLoading);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        loading={loading}
      />
    </form>
  );
};

export default Form;
