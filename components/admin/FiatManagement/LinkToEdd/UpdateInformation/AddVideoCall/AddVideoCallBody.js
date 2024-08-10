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
import { VIDEO_LINK } from "../../../constants";

const AddVideoCallBody = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
}) => {
  return (
    <div className="my-2">
      <div className="form-group">
        <Input
          type={TYPE.TEXT}
          name={VIDEO_LINK}
          label={LABELS.VIDEO_LINK}
          placeholder={PLACEHOLDERS.VIDEO_LINK}
          value={watch(VIDEO_LINK)}
          error={errors?.[VIDEO_LINK]?.message}
          onBlur={() => trigger(VIDEO_LINK)}
          onChange={(e) => {
            setValue(VIDEO_LINK, e.target.value);
            trigger(VIDEO_LINK);
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

export default AddVideoCallBody;
