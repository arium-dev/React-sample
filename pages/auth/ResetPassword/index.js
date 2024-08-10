import React from "react";
import SetOrResetPassword from "../../../components/auth/SetOrResetPassword";
import Header from "../../../components/shared/Header";
import {
  CHOOSE_PASSWORD_PROMPT,
  RESET_PASSWORD_PROMPT,
} from "../../../components/auth/SetOrResetPassword/constants";

const ResetPasswordPage = () => {
  return (
    <Header heading={RESET_PASSWORD_PROMPT} subHeading={CHOOSE_PASSWORD_PROMPT}>
      <SetOrResetPassword isReset={true} />
    </Header>
  );
};

export default ResetPasswordPage;
