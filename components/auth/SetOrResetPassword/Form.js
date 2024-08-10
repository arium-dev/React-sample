import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, setLoginKey } from "../../../store/auth";
import { setPasswordHandler, resetPasswordHandler } from "./helper";
import FormBody from "./FormBody";
import { setPasswordSchema } from "../../../utils/validation";
import { setPasswordDefaultValues } from "../../../utils/DefaultValues";

const Form = ({ isReset }) => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: setPasswordDefaultValues,
    resolver: zodResolver(setPasswordSchema),
  });

  const dispatch = useDispatch();
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
    isReset
      ? resetPasswordHandler({ ...data, token }, setLoading)
      : setPasswordHandler(
          { ...data, token },
          setLoading,
          handleSetUserInfo,
          handleSetLoginKey
        );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody
        errors={errors}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        loading={loading}
      />
    </form>
  );
};

export default Form;
