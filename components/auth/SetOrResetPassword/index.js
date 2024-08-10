import React from "react";
import Form from "./Form";

const SetOrResetPassword = ({ isReset = false }) => {
  return <Form isReset={isReset} />;
};

export default SetOrResetPassword;
