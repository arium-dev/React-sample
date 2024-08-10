import React from "react";

import Form from "./Form";
import Header from "../../shared/Header";
import { TWO_FA_PROMPT, SECURITY_MESSAGE } from "./constants";

const Verify2FA = () => {
  return (
    <Header heading={TWO_FA_PROMPT} subHeading={SECURITY_MESSAGE}>
      <Form />
    </Header>
  );
};

export default Verify2FA;
