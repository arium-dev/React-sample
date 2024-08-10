import React from "react";

import lockIcon from "../../../images/lock-icon.svg";
import Button from "../../shared/Button";
import {
  LABELS,
  PLACEHOLDERS,
  TYPE,
  BUTTON_TYPE,
} from "../../../utils/Constants";
import { PASSWORD, CONFIRM_PASSWORD, SET_PASSWORD } from "./constants";
import PasswordInput from "../../shared/Input/PasswordInput";

const FormBody = ({ errors, watch, trigger, setValue, loading }) => {
  return (
    <div className="mb-5 mt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <PasswordInput
              disabled={loading}
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
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 mb-2">
          <div className="form-group mb-3">
            <PasswordInput
              disabled={loading}
              type={TYPE.PASSWORD}
              name={CONFIRM_PASSWORD}
              label={LABELS.CONFIRM_PASSWORD}
              placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
              value={watch(CONFIRM_PASSWORD)}
              error={errors?.[CONFIRM_PASSWORD]?.message}
              onBlur={() => trigger(CONFIRM_PASSWORD)}
              onChange={(e) => {
                setValue(CONFIRM_PASSWORD, e.target.value);
                trigger(CONFIRM_PASSWORD);
              }}
              icon={lockIcon}
            />
          </div>
        </div>
      </div>

      <div className="text-end toolbar toolbar-bottom p-2 my-3">
        <div className="d-flex justify-content-center">
          <Button
            disabled={loading}
            type={BUTTON_TYPE.SUBMIT}
            loading={loading}
            className="w-100"
          >
            {SET_PASSWORD}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBody;
