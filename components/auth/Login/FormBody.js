import React from "react";
import { Link } from "react-router-dom";
import emailIcon from "../../../images/email-icon.svg";
import lockIcon from "../../../images/lock-icon.svg";
import Button from "../../shared/Button";
import Input from "../../shared/Input/Input";
import PasswordInput from "../../shared/Input/PasswordInput";
import { allowedRoles } from "../../../config";

import {
  TYPE,
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  Routes,
  GenericConstant,
} from "../../../utils/Constants";
import {
  LOGIN_BTN,
  REGISTER_BTN,
  FORGOT_PASSWORD,
  NO_ACCOUNT_YET,
  EMAIL,
  PASSWORD,
} from "./constants";

const FormBody = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  loading,
}) => {
  return (
    <div className="mb-5 mt-4">
      <div className="form-group">
        <Input
          type={TYPE.TEXT}
          name={EMAIL}
          label={LABELS.EMAIL}
          placeholder={PLACEHOLDERS.EMAIL}
          value={watch(EMAIL)}
          error={errors?.[EMAIL]?.message}
          onBlur={() => trigger(EMAIL)}
          onChange={(e) => {
            setValue(EMAIL, e.target.value);
            trigger(EMAIL);
          }}
          icon={emailIcon}
        />
      </div>

      <div className="form-group">
        <PasswordInput
          type={TYPE.PASSWORD}
          name={PASSWORD}
          label={LABELS.PASSWORD}
          placeholder={PLACEHOLDERS.PASSWORD}
          value={watch(PASSWORD)}
          error={errors?.[PASSWORD]?.message}
          onBlur={() => trigger(PASSWORD)}
          onChange={(e) => {
            setValue(PASSWORD, e.target.value);
            trigger(PASSWORD);
          }}
          icon={lockIcon}
        />
      </div>

      <div className="d-flex justify-content-end align-items-center">
        <Link to="/forgot-password">
          <p className="forgot-password">{FORGOT_PASSWORD}</p>
        </Link>
      </div>

      <Button
        type={BUTTON_TYPE.SUBMIT}
        disabled={loading}
        loading={isSubmitting || loading}
        className="w-100 my-2"
      >
        {LOGIN_BTN}
      </Button>

      {allowedRoles.includes(GenericConstant._USER) && (
        <div className="my-1">
          <p className="already-account">
            <span>{NO_ACCOUNT_YET}</span>
            <Link to={Routes.REGISTER}>
              <span
                className="text-decoration-underline text-primary"
                role="button"
              >
                {REGISTER_BTN}
              </span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default FormBody;
