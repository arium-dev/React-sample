import React from "react";
import lockIcon from "../../../images/lock-icon.svg";
import Button from "../../shared/Button";
import {
  AUTO_FOCUS,
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
  REGIX,
  SIX,
} from "../../../utils/Constants";
import { VERIFICATION_CODE, VERIFY } from "./constants";
import Input from "../../shared/Input/Input";

const FormBody = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  loading,
}) => {
  return (
    <div className="my-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <Input
              type={TYPE.TEXT}
              name={VERIFICATION_CODE}
              label={LABELS.VERIFICATION_CODE}
              placeholder={PLACEHOLDERS.VERIFICATION_CODE}
              value={watch(VERIFICATION_CODE)}
              error={errors?.[VERIFICATION_CODE]?.message}
              onBlur={() => trigger(VERIFICATION_CODE)}
              onChange={(e) => {
                const val = e.target.value;
                if (
                  !((REGIX.NUMBER.test(val) && val.length <= SIX) || val === "")
                ) {
                  return;
                }

                setValue(VERIFICATION_CODE, val);
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
        disabled={loading}
        loading={isSubmitting || loading}
        className="w-100 my-2"
      >
        {VERIFY}
      </Button>
    </div>
  );
};

export default FormBody;
