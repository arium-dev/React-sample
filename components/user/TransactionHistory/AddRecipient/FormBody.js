import React, { useState, useCallback } from "react";
import { debounce, isEmpty } from "lodash";
import Input from "../../../shared/Input/Input";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  TYPE,
  AUTO_FOCUS,
  HTTP_STATUS_CODE,
} from "../../../../utils/Constants";
import Button from "../../../shared/Button";
import {
  ACCEPT_OUR,
  ACCEPT_TERM,
  EMAIL,
  EXISTING_USER,
  FIRST_NAME,
  LAST_NAME,
  NEXT,
  NON_EXISTING_USER,
  TERM_AND_CONDITIONS,
} from "./constants";
import emailIcon from "../../../../images/email-icon.svg";
import nameIcon from "../../../../images/name-icon.svg";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { UserUrls, methods } from "../../../../utils";
import { btnTxt, nonExistingUserEmail, nonExistingUserName } from "./helper";
import { error } from "../../../shared/Alert";

const FormBody = ({
  errors,
  isSubmitting,
  watch,
  trigger,
  setValue,
  userInfo,
  setUserInfo,
  isTransfer = false,
  handleClickNext,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchingEmail = useCallback(
    debounce(async (value) => {
      try {
        setLoading(true);
        const resp = await ExecuteHttpRequest(
          methods.POST,
          UserUrls.fetchingRecipientEmail,
          { email: value }
        );
        setLoading(false);
        if (resp.status === HTTP_STATUS_CODE.OK) {
          setValue(FIRST_NAME, resp?.data?.firstName, { shouldDirty: true });
          // trigger(FIRST_NAME);
          setValue(LAST_NAME, resp?.data?.lastName, { shouldDirty: true });
          // trigger(LAST_NAME);
          setUserInfo(resp?.data);
        } else if (resp.status === HTTP_STATUS_CODE.CONFLICT) {
          setUserInfo({ code: HTTP_STATUS_CODE.CONFLICT });
          error(resp?.message);
        } else {
          setUserInfo({ code: HTTP_STATUS_CODE.NOT_FOUND });
          setValue(FIRST_NAME, "", { shouldDirty: true });
          // trigger(FIRST_NAME);
          setValue(LAST_NAME, "", { shouldDirty: true });
          // trigger(LAST_NAME);
        }
      } catch (error) {}
    }, 1000),
    []
  );

  return (
    <>
      <div className="row">
        <Input
          type={TYPE.TEXT}
          name={EMAIL}
          label={LABELS.SEARCH_EMAIL}
          placeholder={PLACEHOLDERS.PLACEHOLDER_EMAIL}
          value={watch(EMAIL)}
          error={errors?.[EMAIL]?.message}
          onBlur={() => trigger(EMAIL)}
          onChange={async (e) => {
            setValue(EMAIL, e.target.value, { shouldDirty: true });
            const resp = await trigger(EMAIL);

            if (resp) {
              fetchingEmail(e.target.value);
            }
          }}
          icon={emailIcon}
          autofocus={AUTO_FOCUS.ON}
        />
      </div>
      {userInfo?.id ? (
        <>
          <div className="border-bottom py-3">
            <div>{EXISTING_USER}</div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="user-avatar rounded-circle "></div>
            <div className="py-3">
              <div className="fw-bold">
                {userInfo?.firstName + " " + userInfo?.lastName}
              </div>
              <div>{userInfo?.email}</div>
            </div>
          </div>
        </>
      ) : (
        !isEmpty(userInfo) &&
        userInfo.code !== HTTP_STATUS_CODE.CONFLICT && (
          <>
            <div className="border-bottom py-3">
              <p className="m-0">{NON_EXISTING_USER}</p>
            </div>
            <div className="row my-3">
              {userInfo?.code === HTTP_STATUS_CODE.NOT_FOUND && (
                <>
                  <div className="col-lg-6">
                    <Input
                      type={TYPE.TEXT}
                      name={FIRST_NAME}
                      label={LABELS._FIRST_NAME}
                      placeholder={PLACEHOLDERS._FIRST_NAME}
                      value={watch(FIRST_NAME)}
                      error={errors?.[FIRST_NAME]?.message}
                      onBlur={() => trigger(FIRST_NAME)}
                      disabled={userInfo?.firstName}
                      onChange={(e) => {
                        setValue(FIRST_NAME, e.target.value, {
                          shouldDirty: true,
                        });
                        trigger(FIRST_NAME);
                      }}
                      icon={nameIcon}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Input
                      type={TYPE.TEXT}
                      name={LAST_NAME}
                      label={LABELS._LAST_NAME}
                      placeholder={PLACEHOLDERS._LAST_NAME}
                      value={watch(LAST_NAME)}
                      error={errors?.[LAST_NAME]?.message}
                      onBlur={() => trigger(LAST_NAME)}
                      disabled={userInfo?.lastName}
                      onChange={(e) => {
                        setValue(LAST_NAME, e.target.value, {
                          shouldDirty: true,
                        });
                        trigger(LAST_NAME);
                      }}
                      icon={nameIcon}
                    />
                  </div>
                  <div className="col-lg-12">
                    <Input
                      disabled
                      type={TYPE.TEXT}
                      name={EMAIL}
                      label={LABELS.RECIPIENT_EMAIL}
                      placeholder={PLACEHOLDERS.PLACEHOLDER_EMAIL}
                      value={watch(EMAIL)}
                      error={errors?.[EMAIL]?.message}
                      onBlur={() => trigger(EMAIL)}
                      onChange={async (e) => {
                        setValue(EMAIL, e.target.value, { shouldDirty: true });
                        const resp = await trigger(EMAIL);

                        if (resp) {
                          fetchingEmail(e.target.value);
                        }
                      }}
                      icon={emailIcon}
                      autofocus={AUTO_FOCUS.ON}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="d-flex align-items-center gap-2 border-top py-3">
              <input
                type={TYPE.CHECKBOX}
                id={ACCEPT_TERM}
                name={ACCEPT_TERM}
                onChange={(e) => {
                  setValue(ACCEPT_TERM, e.target.checked);
                  trigger(ACCEPT_TERM);
                }}
                checked={watch(ACCEPT_TERM)}
                value={watch(ACCEPT_TERM)}
              />
              <p className="m-0">
                {ACCEPT_OUR} <u>{TERM_AND_CONDITIONS}</u>
              </p>
            </div>
          </>
        )
      )}

      <div className="d-flex justify-content-end border-top">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-3"
          loading={isSubmitting || loading}
          disabled={
            loading ||
            isSubmitting ||
            errors?.[EMAIL] ||
            userInfo.code === HTTP_STATUS_CODE.CONFLICT
          }
        >
          {isTransfer && userInfo?.recipientId ? NEXT : btnTxt(userInfo)}
        </Button>
      </div>
    </>
  );
};

export default FormBody;
