import React from "react";

import PasswordInput from "../../../shared/Input/PasswordInput";
import {
  AUTO_FOCUS,
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
} from "../../../../utils/Constants";
import {
  CURRENT_PASSWORD,
  PASSWORD,
  CONFIRM_PASSWORD,
  UPDATE,
} from "./constants";
import lockIcon from "../../../../images/lock-icon.svg";
import Button from "../../../shared/Button";

const FormBody = ({ errors, isSubmitting, watch, trigger, setValue }) => {
  return (
    <div className="my-2">
      <div className="form-group">
        <PasswordInput
          type={TYPE.PASSWORD}
          name={CURRENT_PASSWORD}
          label={LABELS.CURRENT_PASSWORD}
          placeholder={PLACEHOLDERS.CURRENT_PASSWORD}
          value={watch(CURRENT_PASSWORD)}
          error={errors?.[CURRENT_PASSWORD]?.message}
          onBlur={() => trigger(CURRENT_PASSWORD)}
          onChange={(e) => {
            setValue(CURRENT_PASSWORD, e.target.value);
            trigger(CURRENT_PASSWORD);
          }}
          icon={lockIcon}
        />
      </div>

      <div className="form-group">
        <PasswordInput
          type={TYPE.PASSWORD}
          name={PASSWORD}
          label={LABELS.PASSWORD}
          placeholder={PLACEHOLDERS.SET_PASSWORD}
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

      <div className="form-group">
        <PasswordInput
          type={TYPE.PASSWORD}
          name={CONFIRM_PASSWORD}
          label={LABELS.CONFIRM_PASSWORD}
          placeholder={PLACEHOLDERS.SET_CONFIRM_PASSWORD}
          value={watch(CONFIRM_PASSWORD)}
          error={errors?.[CONFIRM_PASSWORD]?.message}
          onBlur={() => trigger(CONFIRM_PASSWORD)}
          onChange={(e) => {
            setValue(CONFIRM_PASSWORD, e.target.value);
            trigger(CONFIRM_PASSWORD);
          }}
          icon={lockIcon}
          autofocus={AUTO_FOCUS.ON}
        />
      </div>

      <div className="d-flex justify-content-end border-top mt-3">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-3"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {UPDATE}
        </Button>
      </div>
    </div>
  );
};

export default FormBody;
