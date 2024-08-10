import React from "react";

import Form from "./Form";
import Header from "../../shared/Header";
import { SIGN_IN, LOGIN_PROMPT } from "./constants";

const Login = () => {
  return (
    <Header heading={SIGN_IN} subHeading={LOGIN_PROMPT}>
      <Form />
    </Header>
  );
};

export default Login;
