import React from "react";
import Input from "../../../../shared/Input/Input";
import {
  AUTO_FOCUS,
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
} from "../../../../../utils/Constants";
import { VERIFICATION_CODE, VERIFY } from "./constants";
import lockIcon from "../../../../../images/lock-icon.svg";
import Button from "../../../../shared/Button";

const FormBody = ({ errors, isSubmitting, watch, trigger, setValue }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <Input
              type={TYPE.NUMBER}
              name={VERIFICATION_CODE}
              label={LABELS.VERIFICATION_CODE}
              placeholder={PLACEHOLDERS.VERIFICATION_CODE}
              value={watch(VERIFICATION_CODE)}
              error={errors?.[VERIFICATION_CODE]?.message}
              onBlur={() => trigger(VERIFICATION_CODE)}
              onChange={(e) => {
                if (e.target.value.length > 6) return;

                setValue(VERIFICATION_CODE, e.target.value);
                trigger(VERIFICATION_CODE);
              }}
              icon={lockIcon}
              autofocus={AUTO_FOCUS.ON}
            />
          </div>
        </div>
      </div>

      <Button
        type={BUTTON_TYPE.SUBMIT}
        disabled={isSubmitting}
        loading={isSubmitting}
        className="w-100 my-2"
      >
        {VERIFY}
      </Button>
    </>
  );
};

export default FormBody;
