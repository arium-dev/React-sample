import React from "react";

import emailIcon from "../../../images/email-icon.svg";
import Button from "../../shared/Button";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
} from "../../../utils/Constants";
import { EMAIL, SEND_RESET_LINK } from "./constants";
import Input from "../../shared/Input/Input";

const FormBody = ({ errors, isSubmitting, watch, trigger, setValue }) => {
  return (
    <div className="my-5">
      <div className="row">
        <div className="col-lg-12">
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
        </div>
      </div>

      <Button
        disabled={isSubmitting}
        type={BUTTON_TYPE.SUBMIT}
        loading={isSubmitting}
        className="w-100 my-4"
      >
        {SEND_RESET_LINK}
      </Button>
    </div>
  );
};

export default FormBody;
