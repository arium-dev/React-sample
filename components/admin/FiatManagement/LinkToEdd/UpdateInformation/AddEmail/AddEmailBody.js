import React from "react";
import Button from "../../../../../shared/Button";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
} from "../../../../../../utils/Constants";
import { SUBMIT } from "../constants";
import Input from "../../../../../shared/Input/Input";
import { EMAIL, NOTES } from "../../../constants";

const AddEmailBody = ({ errors, isSubmitting, watch, trigger, setValue }) => {
  return (
    <div className="my-2">
      <div className="form-group">
        <Input
          type={TYPE.TEXT}
          name={EMAIL}
          label={LABELS.CONTACT_EMAIL}
          placeholder={PLACEHOLDERS.CONTACT_EMAIL}
          value={watch(EMAIL)}
          error={errors?.[EMAIL]?.message}
          onBlur={() => trigger(EMAIL)}
          onChange={(e) => {
            setValue(EMAIL, e.target.value);
            trigger(EMAIL);
          }}
        />
      </div>

      <div className="d-flex justify-content-end border-top mt-3">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-3"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {SUBMIT}
        </Button>
      </div>
    </div>
  );
};

export default AddEmailBody;
