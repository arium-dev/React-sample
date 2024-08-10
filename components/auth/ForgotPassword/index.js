import React from "react";

import Form from "./Form";
import Header from "../../shared/Header";
import { RESET_PASSWORD, LOST_PASSWORD_PROMPT } from "./constants";

const ResetPassword = () => {
  return (
    <Header heading={RESET_PASSWORD} subHeading={LOST_PASSWORD_PROMPT}>
      <Form />
    </Header>
  );
};

export default ResetPassword;
