import React, { useState, useEffect, useCallback } from "react";
import { Stepper, Step } from "react-form-stepper";
import { useSelector } from "react-redux";
import ActionButton from "./ActionButton";
import { resendUserEmailHandler, steps } from "../helper";
import { clearLocalStorageItems } from "../../../../config/AuthSetting";
import { Link, useNavigate } from "react-router-dom";
import { decryptData } from "../../../../utils/EncryptDecrypt";
import { TWO, THREE } from "../../../../utils/Constants";
import {
  EMAIL_NOT_RECEIVED_HEADING,
  LOGIN_KEY,
  RESEND_EMAIL,
} from "../constants";
import Spinner from "../../../shared/Spinner";

const WizardBody = ({
  goSteps,
  setGoSteps,
  watch,
  trigger,
  errors,
  setValue,
  getValues,
  handleReCaptchaVerify,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [count, setCount] = useState(0);

  const loginKey = useSelector((state) => state.auth.loginKey);
  let userInfo = useSelector((state) => state.auth.userInfo);
  userInfo = userInfo
    ? userInfo.email
      ? userInfo
      : decryptData(userInfo)
    : "";

  const handleRedirectForms = useCallback(async () => {
    if (userInfo && userInfo.email) {
      const user = userInfo;
      if (!user.verified) {
        setGoSteps(TWO);
      } else if (!user.twoFaEnabled) {
        setGoSteps(THREE);
      } else if (user.verified && user.twoFaEnabled) {
        navigate("/");
      } else {
        await clearLocalStorageItems();
        navigate("/");
      }
    }
  }, [userInfo, setGoSteps, navigate]);

  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(timerId);
    }
  }, [count]);

  useEffect(() => {
    if (loginKey) {
      setValue(LOGIN_KEY, loginKey);
      trigger(LOGIN_KEY);
    }
  }, [loginKey, setValue, trigger]);

  useEffect(() => {
    handleRedirectForms(userInfo);
  }, [handleRedirectForms, userInfo]);

  const CurrentStepComponent = steps[goSteps].component;

  const resendEmailHandler = useCallback(async () => {
    if (emailLoading || count >= 1) return;
    console.log(
      "resendEmailHandler",
      getValues(),
      getValues()?.email,
      userInfo
    );
    const email = userInfo?.email || getValues()?.email;
    await resendUserEmailHandler(email, setEmailLoading, setCount);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, emailLoading]);

  return (
    <>
      <Stepper className="nav-wizard" activeStep={goSteps} label={false}>
        {steps.map((step, index) => (
          <Step key={index} className="nav-link border-0" />
        ))}
      </Stepper>

      <CurrentStepComponent
        errors={errors}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        setGoSteps={setGoSteps}
        loading={loading}
        setLoading={setLoading}
      />
      <ActionButton
        goSteps={goSteps}
        trigger={trigger}
        setGoSteps={setGoSteps}
        getValues={getValues}
        loading={loading}
        setLoading={setLoading}
        userInfo={userInfo}
        handleReCaptchaVerify={handleReCaptchaVerify}
        setCount={setCount}
      />

      {goSteps === TWO && (
        <div
          onClick={resendEmailHandler}
          className="d-flex gap-2 align-items-center"
        >
          <div>
            <span className="text-secondary">{EMAIL_NOT_RECEIVED_HEADING}</span>

            <span
              className={`text-decoration-underline text-primary mr-2 fw-semibold ${(emailLoading || count >= 1) && "opacity-50"}`}
              role="button"
            >
              <span>{RESEND_EMAIL}</span>
            </span>

            {count >= 1 && (
              <span className="text-primary fw-normal"> ({count})</span>
            )}
          </div>

          <div>
            {emailLoading && (
              <span className="resend-email-loader">
                <Spinner color="" variant={"primary"} size={14} />
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WizardBody;
