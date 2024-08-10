import React from "react";
import verifyEmailImg from "../../../../images/verify-email.png";
import Spinner from "../../../shared/Spinner";
import { EMAIL_VERIFICATION_MESSAGE } from "../constants";

const StepThree = () => {
  return (
    <section>
      <div className="d-flex justify-content-center ">
        <img
          src={verifyEmailImg}
          alt="verify email"
          className="w-50 mCS_img_loaded"
        />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Spinner color="" variant={"primary"} />
        <span className="ms-2">{EMAIL_VERIFICATION_MESSAGE}</span>
      </div>
    </section>
  );
};

export default StepThree;
