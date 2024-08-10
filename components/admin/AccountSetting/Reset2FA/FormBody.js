import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Input from "../../../shared/Input/Input";
import {
  BUTTON_TYPE,
  LABELS,
  PLACEHOLDERS,
  REGIX,
  TYPE,
  COPY_TO_CLIPBOARD_TIME,
  _2FA_SECRET,
  SIX,
} from "../../../../utils/Constants";
import {
  ENABLE,
  NEW_2FA_HEADING,
  NEW_2FA_KEY,
  NEW_2FA_SUBHEADING,
  PLEASE_WAIT,
  RESET,
  VERIFICATION_CODE,
  ID,
} from "./constants";
import lockIcon from "../../../../images/lock-icon.svg";
import Button from "../../../shared/Button";
import { defaultTwoFa, getResetTwoFA } from "./helper";
import { copyToClipboard } from "../../../../utils";
import { CopyToClipBoardIcon } from "../../../../icons";

const FormBody = ({
  watch,
  trigger,
  setValue,
  errors,
  isSubmitting,
  onCloseModal,
  enable2FA,
}) => {
  const [twoFa, setTwoFa] = useState(defaultTwoFa);
  const [isCopied, setIsCopied] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      const user = userInfo;
      if (user && user.id) {
        getResetTwoFA(setTwoFa);
        setValue(ID, user.id);
        trigger(ID);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, setTwoFa]);

  const copyToClipboardHandler = (twoFaSecret) => {
    setIsCopied(true);

    copyToClipboard(twoFaSecret);

    setTimeout(() => {
      setIsCopied(false);
    }, COPY_TO_CLIPBOARD_TIME);
  };

  return (
    <section>
      <div className="w-100">
        <p className="fw-bold m-0 two-fa-label">{NEW_2FA_KEY}</p>

        <div className="d-flex align-items-center justify-content-between overflow-hidden flex-grow-1 gap-2">
          <p className="m-0">{twoFa.secret || _2FA_SECRET}</p>
          <p className="m-0 copy copy-icon">
            {isCopied ? (
              <i class="las la-check-double fs-16 text-success mx-2" />
            ) : (
              <CopyToClipBoardIcon
                className="cursor-pointer mx-2"
                onClick={() => copyToClipboardHandler(twoFa.secret)}
              />
            )}
          </p>
        </div>
      </div>

      <p className="my-2">{NEW_2FA_HEADING}</p>
      <p className="my-2">{NEW_2FA_SUBHEADING}</p>

      <div className="two-fa-container">
        {twoFa.dataUrl ? (
          <img src={twoFa.dataUrl} alt="QR-Code" className="w-100 h-100" />
        ) : (
          <p className="text-center w-100 h-100">{PLEASE_WAIT}</p>
        )}
      </div>

      <div className="form-group mb-3">
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
        />
      </div>

      <div className="d-flex justify-content-end border-top mt-4">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-3"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {enable2FA ? ENABLE : RESET}
        </Button>
      </div>
    </section>
  );
};

export default FormBody;
