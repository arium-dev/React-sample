import React, { useState } from "react";
import Wizard from "./Wizard/Wizard";
import { getRegisterPageHeading } from "./helper";
import Header from "../../shared/Header";
import { HEADINGS } from "./constants";

const Register = () => {
  const [goSteps, setGoSteps] = useState(0);

  return (
    <Header
      heading={HEADINGS[goSteps]}
      subHeading={getRegisterPageHeading(goSteps)}
    >
      <Wizard goSteps={goSteps} setGoSteps={setGoSteps} />
    </Header>
  );
};

export default Register;
