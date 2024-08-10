import React, { useState } from "react";
import { RESET_2FA } from "./constants";
import resetIcon from "../../../../images/reset.svg";
import { defaultIs2FAOpenValues } from "./helper";
import Reset2FA from "../Reset2FA";
import { isAuthorized } from "../../../../utils";
import { PERMISSIONS } from "../../../../utils/Constants";

const FormBody = ({ setUserProfile, permissions }) => {
  const [is2FAOpen, setIs2FAOpen] = useState(defaultIs2FAOpenValues);

  return (
    <>
      <div className="row g-5">
        <div className="col-lg-5 col-md-12">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3 align-items-baseline">
              <h4>{RESET_2FA}</h4>
              <img
                src={resetIcon}
                alt="reset"
                className="cursor-pointer reset-2fa-icon-admin"
                onClick={() =>
                  setIs2FAOpen((prev) => ({ ...prev, resetModal: true }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {is2FAOpen.resetModal && (
        <Reset2FA setIs2FAOpen={setIs2FAOpen} setUserProfile={setUserProfile} />
      )}
    </>
  );
};

export default FormBody;
