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
import { NOTES } from "../../../constants";

const AddNotesBody = ({ errors, isSubmitting, watch, trigger, setValue }) => {
  return (
    <div className="my-2">
      <div className="form-group">
        <Input
          type={TYPE.TEXT}
          name={NOTES}
          label={LABELS.NOTES}
          placeholder={PLACEHOLDERS.NOTES}
          value={watch(NOTES)}
          error={errors?.[NOTES]?.message}
          onBlur={() => trigger(NOTES)}
          onChange={(e) => {
            setValue(NOTES, e.target.value);
            trigger(NOTES);
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

export default AddNotesBody;
