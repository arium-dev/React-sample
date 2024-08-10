import React from "react";
import SetOrResetPassword from "../../../components/auth/SetOrResetPassword";
import Header from "../../../components/shared/Header";
import {
  CHOOSE_PASSWORD_PROMPT,
  SET_PASSWORD,
} from "../../../components/auth/SetOrResetPassword/constants";

const SetPasswordPage = () => {
  return (
    <Header heading={SET_PASSWORD} subHeading={CHOOSE_PASSWORD_PROMPT}>
      <SetOrResetPassword />
    </Header>
  );
};

export default SetPasswordPage;
