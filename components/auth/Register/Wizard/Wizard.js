import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import WizardBody from "./WizardBody";
import { CAPTCHA_TOKEN } from "../constants";
import { registerSchema, twoFaSchema } from "../../../../utils/validation";
import { THREE, GenericConstant } from "../../../../utils/Constants";
import {
  registerDefaultValues,
  twoFactorWithIdDefaultValues,
} from "../../../../utils/DefaultValues";

const Wizard = ({ goSteps, setGoSteps }) => {
  const {
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues:
      goSteps === THREE ? twoFactorWithIdDefaultValues : registerDefaultValues,
    resolver: zodResolver(goSteps === THREE ? twoFaSchema : registerSchema),
  });
  // const [token, setToken] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const t = await executeRecaptcha(GenericConstant._SUBMIT);
    setValue(CAPTCHA_TOKEN, t);

    // Do whatever you want with the token
  }, [executeRecaptcha, setValue]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    setValue(CAPTCHA_TOKEN, null);
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify, setValue]);

  return (
    <div className="register-form-cont">
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="form-wizard">
            <form
              onSubmit={(data) => {
                console.log(data);
              }}
            ></form>
            <WizardBody
              goSteps={goSteps}
              setGoSteps={setGoSteps}
              watch={watch}
              trigger={trigger}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              handleReCaptchaVerify={handleReCaptchaVerify}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
