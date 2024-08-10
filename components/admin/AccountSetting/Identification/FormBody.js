import React, { useState } from "react";
import { Button } from "react-bootstrap";
import nameIcon from "../../../../images/name-icon.svg";
import emailIcon from "../../../../images/email-icon.svg";
import Btn from "../../../shared/Button";
import {
  UPDATE_PASSWORD,
  UPDATE,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  CANCEL,
  TWO,
  SET_TRANSACTION_FEE,
  TRANSACTION_FEE_REDIRECT,
} from "./constants";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
} from "../../../../utils/Constants";
import Input from "../../../shared/Input/Input";
import { cancelUpdateHandler, defaultIsOpenValues } from "./helper";
import ChangePassword from "../ChangePassword";
import { useNavigate } from "react-router-dom";

const FormBody = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  isDirty,
  userProfile,
  reset,
  permissions,
}) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(defaultIsOpenValues);

  return (
    <>
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
                setValue(FIRST_NAME, e.target.value, { shouldDirty: true });
              }}
              icon={nameIcon}
              disabled={userProfile?.data?.level === TWO}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="form-group">
            <Input
              type={TYPE.TEXT}
              name={LAST_NAME}
              label={LABELS.LAST_NAME}
              placeholder={PLACEHOLDERS.LAST_NAME}
              value={watch(LAST_NAME)}
              error={errors?.[LAST_NAME]?.message}
              onBlur={() => trigger(LAST_NAME)}
              onChange={(e) => {
                setValue(LAST_NAME, e.target.value, { shouldDirty: true });
              }}
              icon={nameIcon}
              disabled={userProfile?.data?.level === TWO}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex gap-2">
            <div className="w-100">
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
                    setValue(EMAIL, e.target.value, { shouldDirty: true });
                  }}
                  icon={emailIcon}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex gap-2">
            <div className="mb-5 mb-lg-0">
              <Button
                className="btn"
                variant="primary light user-account-setting-btn"
                onClick={() =>
                  setIsOpen((prev) => ({ ...prev, passwordUpdate: true }))
                }
              >
                {UPDATE_PASSWORD}
              </Button>
            </div>

            <div className="mb-5 mb-lg-0">
              <Button
                className="btn"
                variant="primary light user-account-setting-btn"
                onClick={() => navigate(TRANSACTION_FEE_REDIRECT)}
              >
                {SET_TRANSACTION_FEE}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex gap-2">
            <Btn
              type={BUTTON_TYPE.SUBMIT}
              loading={isSubmitting}
              className="mt-3"
              disabled={!isDirty || isSubmitting || userProfile?.loading}
            >
              {UPDATE}
            </Btn>

            {!userProfile?.loading && isDirty && (
              <Btn
                type={BUTTON_TYPE.BUTTON}
                className="mt-3"
                variant="btn-warning"
                disabled={!isDirty || isSubmitting}
                onClick={() => reset(cancelUpdateHandler(userProfile))}
              >
                {CANCEL}
              </Btn>
            )}
          </div>
        </div>
      </div>

      {isOpen.passwordUpdate && <ChangePassword setIsOpen={setIsOpen} />}
    </>
  );
};

export default FormBody;
