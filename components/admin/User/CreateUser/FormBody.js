import React from "react";
import Input from "../../../shared/Input/Input";
import emailIcon from "../../../../images/email-icon.svg";
import userIcon from "../../../../images/name-icon.svg";
import dobIcon from "../../../../images/dob-icon.svg";
import Button from "../../../shared/Button";
import { USER_VALUES } from "./constants";
import { userModalBtn } from "./helper";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
  PERMISSIONS,
} from "../../../../utils/Constants";
import InputDate from "../../../shared/Input/InputDate";
import { formatDateOnly, isAuthorizedAction } from "../../../../utils";

const FormBody = ({
  edit,
  loading,
  errors,
  watch,
  trigger,
  setValue,
  permissions,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className=" col-sm-6">
          <Input
            type={TYPE.TEXT}
            name={USER_VALUES.FIRST_NAME}
            label={LABELS.FIRST_NAME}
            placeholder={PLACEHOLDERS.FIRST_NAME}
            value={watch(USER_VALUES.FIRST_NAME)}
            error={errors?.[USER_VALUES.FIRST_NAME]?.message}
            onBlur={() => trigger(USER_VALUES.FIRST_NAME)}
            onChange={(e) => {
              setValue(USER_VALUES.FIRST_NAME, e.target.value, {
                shouldDirty: true,
              });
              trigger(USER_VALUES.FIRST_NAME);
            }}
            icon={userIcon}
          />
        </div>
        <div className=" col-sm-6">
          <Input
            type={TYPE.TEXT}
            name={USER_VALUES.LAST_NAME}
            label={LABELS.LAST_NAME}
            placeholder={PLACEHOLDERS.LAST_NAME}
            value={watch(USER_VALUES.LAST_NAME)}
            error={errors?.[USER_VALUES.LAST_NAME]?.message}
            onBlur={() => trigger(USER_VALUES.LAST_NAME)}
            onChange={(e) => {
              setValue(USER_VALUES.LAST_NAME, e.target.value, {
                shouldDirty: true,
              });
              trigger(USER_VALUES.LAST_NAME);
            }}
            icon={userIcon}
          />
        </div>
        <div className=" col-sm-6">
          <Input
            disabled
            type={TYPE.TEXT}
            name={USER_VALUES.EMAIL}
            label={LABELS.EMAIL}
            placeholder={PLACEHOLDERS.EMAIL_EXAMPLE}
            value={watch(USER_VALUES.EMAIL)}
            error={errors?.[USER_VALUES.EMAIL]?.message}
            onBlur={() => trigger(USER_VALUES.EMAIL)}
            onChange={(e) => {
              setValue(USER_VALUES.EMAIL, e.target.value, {
                shouldDirty: true,
              });
              trigger(USER_VALUES.EMAIL);
            }}
            icon={emailIcon}
          />
        </div>
        <div className=" col-sm-6">
          <Input
            type={TYPE.NUMBER}
            name={USER_VALUES.CONTACT_NO}
            label={LABELS.CONTACT_NO}
            placeholder={PLACEHOLDERS.CONTACT_NUMBER}
            value={watch(USER_VALUES.CONTACT_NO)}
            error={errors?.[USER_VALUES.CONTACT_NO]?.message}
            onBlur={() => trigger(USER_VALUES.CONTACT_NO)}
            onChange={(e) => {
              setValue(USER_VALUES.CONTACT_NO, e.target.value, {
                shouldDirty: true,
              });
              trigger(USER_VALUES.CONTACT_NO);
            }}
            icon={emailIcon}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <InputDate
            name={USER_VALUES.DOB}
            label={LABELS.DATE_OF_BIRTH_REQUIRED}
            placeholder={PLACEHOLDERS.DOB}
            value={watch(USER_VALUES.DOB)}
            error={errors?.[USER_VALUES.DOB]?.message}
            onBlur={() => trigger(USER_VALUES.DOB)}
            onChange={(value) => {
              setValue(USER_VALUES.DOB, formatDateOnly(value), {
                shouldDirty: true,
              });
              trigger(USER_VALUES.DOB);
            }}
            max={new Date()}
            icon={dobIcon}
          />
        </div>

        <div className="col-sm-6">
          <Input
            type={TYPE.NUMBER}
            name={USER_VALUES.DEPOSIT_LIMIT}
            label={LABELS.DEPOSIT_THRESHOLD_LIMIT}
            placeholder={PLACEHOLDERS.THRESHOLD_LIMIT}
            value={watch(USER_VALUES.DEPOSIT_LIMIT) || null}
            error={errors?.[USER_VALUES.DEPOSIT_LIMIT]?.message}
            onBlur={() => trigger(USER_VALUES.DEPOSIT_LIMIT)}
            onChange={(e) => {
              setValue(
                USER_VALUES.DEPOSIT_LIMIT,
                String(e?.target?.value || 0),
                {
                  shouldDirty: true,
                }
              );
              trigger(USER_VALUES.DEPOSIT_LIMIT);
            }}
            icon={dobIcon}
          />
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-end border-top mt-3">
          <Button
            type={BUTTON_TYPE.SUBMIT}
            className="mt-3"
            loading={loading}
            disabled={loading}
          >
            {userModalBtn(edit)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBody;
