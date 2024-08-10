import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import lockIcon from "../../../../images/lock-icon.svg";
import {
  NEW_2FA_KEY,
  NEW_2FA_HEADING,
  NEW_2FA_SUBHEADING,
  WAIT_ALERT,
  USER_INFO,
  VERIFICATION_CODE,
  DELAY_6000,
  ID,
} from "../constants";
import {
  AUTO_FOCUS,
  LABELS,
  PLACEHOLDERS,
  TYPE,
  REGIX,
  SIX,
  _2FA_SECRET,
} from "../../../../utils/Constants";
import Input from "../../../shared/Input/Input";
import { defaultTwoFa, generateTwoFA } from "../helper";
import { copyToClipboard, encryptedKeys } from "../../../../utils";
import copyImg from "../../../../images/copy.svg";

const StepFour = ({ errors, watch, setValue, trigger, loading }) => {
  const [twoFa, setTwoFa] = useState(defaultTwoFa);
  const [isCopied, setIsCopied] = useState(false);

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      const user = userInfo;
      if (user && user.id) {
        generateTwoFA(user.id, setTwoFa);
        setValue(USER_INFO, localStorage.getItem(encryptedKeys.userInfo));
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
    }, DELAY_6000);
  };

  return (
    <section>
      <div className="w-100">
        <p className="fw-bold m-0 two-fa-label">{NEW_2FA_KEY}</p>

        <div className="d-flex align-items-center justify-content-between overflow-hidden flex-grow-1 gap-2">
          <p className="m-0">{twoFa.secret || _2FA_SECRET}</p>
          <p
            className="m-0 copy copy-icon"
            onClick={() => copyToClipboardHandler(twoFa.secret)}
          >
            {isCopied ? (
              <i className="las la-check-double fs-16 text-success mx-2" />
            ) : (
              <img src={copyImg} alt="copy" className="copy-btn" />
            )}
          </p>
        </div>
      </div>

      <p>{NEW_2FA_HEADING}</p>
      <p>{NEW_2FA_SUBHEADING}</p>

      <div className="two-fa-container">
        {twoFa.dataUrl ? (
          <img src={twoFa.dataUrl} alt="QR-Code" className="w-100 h-100" />
        ) : (
          <p className="text-center w-100 h-100">{WAIT_ALERT}</p>
        )}
      </div>

      <div className="form-group mb-3">
        <Input
          disabled={loading}
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
    </section>
  );
};

export default StepFour;
