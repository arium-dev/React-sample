import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../shared/Button";
import { ALREADY_ACCOUNT, NEXT, LOGIN_BTN } from "../constants";
import {
  ZERO,
  ONE,
  TWO,
  THREE,
  BUTTON_TYPE,
  GenericConstant,
  Routes,
} from "../../../../utils/Constants";
import {
  handleRegisterUser,
  handleUserEmailStatus,
  handleEnableTwoFa,
} from "../helper";
import {
  setUserInfo,
  removeLoginKey,
  setPermissions,
} from "../../../../store/auth";

const ActionButton = ({
  goSteps,
  trigger,
  setGoSteps,
  getValues,
  loading,
  setLoading,
  userInfo,
  handleReCaptchaVerify,
  setCount,
}) => {
  const dispatch = useDispatch();
  const handleSetUserInfo = useCallback(
    (userInfo) => {
      dispatch(setUserInfo(userInfo));
    },
    [dispatch]
  );

  const handleSetPermissions = useCallback(
    (permissions) => {
      dispatch(setPermissions(permissions));
    },
    [dispatch]
  );

  const handleRemoveLoginKey = useCallback(() => {
    dispatch(removeLoginKey());
  }, [dispatch]);

  return (
    <>
      <div className="text-end toolbar mt-2">
        <div className="d-flex justify-content-center">
          <Button
            disabled={loading}
            loading={loading}
            type={BUTTON_TYPE.BUTTON}
            className="w-100"
            onClick={async () => {
              if (goSteps === ZERO) {
                (await trigger()) && setGoSteps(1);
              } else if (goSteps === ONE) {
                const values = getValues();
                handleRegisterUser(
                  values,
                  setLoading,
                  handleSetUserInfo,
                  handleReCaptchaVerify,
                  setCount
                );
              } else if (goSteps === TWO) {
                let email = getValues(GenericConstant._EMAIL);
                if (!email) {
                  const user = userInfo;
                  email = user.email;
                }
                handleUserEmailStatus(
                  email,
                  setLoading,
                  userInfo,
                  handleSetUserInfo
                );
              } else if (goSteps === THREE) {
                const validation = await trigger();

                if (validation) {
                  const values = getValues();

                  handleEnableTwoFa(
                    values,
                    setLoading,
                    handleSetUserInfo,
                    handleRemoveLoginKey,
                    handleSetPermissions
                  );
                }
              }
            }}
          >
            {NEXT}
          </Button>
        </div>
      </div>

      {(goSteps === ZERO || goSteps === ONE) && (
        <p className="already-account">
          <span>{ALREADY_ACCOUNT}</span>
          <Link to={Routes.LOGIN}>
            <span
              className="text-decoration-underline text-primary"
              role="button"
            >
              {LOGIN_BTN}
            </span>
          </Link>
        </p>
      )}
    </>
  );
};

export default ActionButton;
