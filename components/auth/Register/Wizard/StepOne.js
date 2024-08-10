import React from "react";

import nameIcon from "../../../../images/name-icon.svg";
import emailIcon from "../../../../images/email-icon.svg";
import dobIcon from "../../../../images/dob-icon.svg";
import { LABELS, PLACEHOLDERS, TYPE } from "../../../../utils/Constants";
import { FIRST_NAME, LAST_NAME, EMAIL, DOB } from "../constants";
import Input from "../../../shared/Input/Input";
import InputDate from "../../../shared/Input/InputDate";
import { formatDateOnly } from "../../../../utils";

const StepOne = ({ errors, watch, setValue, trigger }) => {
  return (
    <section>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <Input
              type={TYPE.TEXT}
              name={FIRST_NAME}
              label={LABELS.FIRST_NAME}
              placeholder={PLACEHOLDERS.FIRST_NAME}
              value={watch(FIRST_NAME)}
              error={errors?.[FIRST_NAME]?.message}
              onBlur={() => trigger(FIRST_NAME)}
              onChange={(e) => {
                setValue(FIRST_NAME, e.target.value);
                trigger(FIRST_NAME);
              }}
              icon={nameIcon}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <Input
            type={TYPE.TEXT}
            name={LAST_NAME}
            label={LABELS.LAST_NAME}
            placeholder={PLACEHOLDERS.LAST_NAME}
            value={watch(LAST_NAME)}
            error={errors?.[LAST_NAME]?.message}
            onBlur={() => trigger(LAST_NAME)}
            onChange={(e) => {
              setValue(LAST_NAME, e.target.value);
              trigger(LAST_NAME);
            }}
            icon={nameIcon}
          />
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <Input
              type={TYPE.TEXT}
              name={EMAIL}
              label={LABELS.EMAIL}
              placeholder={PLACEHOLDERS.EMAIL_REGISTER}
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

        <div className="col-lg-12">
          <div className="form-group w-100">
            <InputDate
              className="container w-100"
              name={DOB}
              label={LABELS.DOB}
              formate={PLACEHOLDERS.DOB}
              placeholder={PLACEHOLDERS.DOB}
              value={watch(DOB)}
              error={errors?.[DOB]?.message}
              onBlur={() => trigger(DOB)}
              onChange={(value) => {
                setValue(DOB, formatDateOnly(value));
                trigger(DOB);
              }}
              max={new Date()}
              icon={dobIcon}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
