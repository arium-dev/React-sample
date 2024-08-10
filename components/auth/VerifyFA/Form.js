import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { handleVerifyTwoFaAndLogin } from "./helper";
import FormBody from "./FormBody";
import {
  removeLoginKey,
  setPermissions,
  setUserInfo,
} from "../../../store/auth";
import { verify2FAAuthSchema } from "../../../utils/validation";
import { MODE } from "../../../utils/Constants";
import { twoFactorWithKeyDefaultValues } from "../../../utils/DefaultValues";
import { LOGIN_KEY } from "./constants";

const Form = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loginKey = useSelector((state) => state.auth.loginKey);
  const handleRemoveLoginKey = useCallback(() => {
    dispatch(removeLoginKey());
  }, [dispatch]);

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: twoFactorWithKeyDefaultValues,
    resolver: zodResolver(verify2FAAuthSchema),
    mode: MODE.ON_TOUCHED,
  });

  useEffect(() => {
    if (loginKey) {
      setValue(LOGIN_KEY, loginKey);
      trigger(LOGIN_KEY);
    }
  }, [loginKey, setValue, trigger]);

  const handleSetUserInfo = useCallback(
    (userInfo) => {
      dispatch(setUserInfo(userInfo));
    },
    [dispatch]
  );

  const handleSetPermissions = useCallback(
    (permissions) => {
      dispatch(setPermissions(permissions));
    },
    [dispatch]
  );

  const onSubmit = async (data) => {
    handleVerifyTwoFaAndLogin(
      data,
      setLoading,
      handleSetUserInfo,
      handleSetPermissions,
      handleRemoveLoginKey
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBody
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        errors={errors}
        isSubmitting={isSubmitting}
        loading={loading}
      />
    </form>
  );
};

export default Form;
