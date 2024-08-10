import React from "react";

import ShowModal from "../../../shared/Modal";
import { ENABLE_2FA_VERIFICATION, RESET_2FA_VERIFICATION } from "./constants";
import Form from "./Form";
import { defaultIs2FAOpenValues } from "../Setting/helper";

const Reset2FA = ({ setIs2FAOpen, setUserProfile, enable2FA }) => {
  const onCloseModal = () => {
    setIs2FAOpen(defaultIs2FAOpenValues);
  };

  return (
    <ShowModal
      isOpen={true}
      title={enable2FA ? ENABLE_2FA_VERIFICATION : RESET_2FA_VERIFICATION}
      onClose={onCloseModal}
      dialogClassName="modal-lg"
    >
      <Form
        onCloseModal={onCloseModal}
        setUserProfile={setUserProfile}
        enable2FA={enable2FA}
      />
    </ShowModal>
  );
};

export default Reset2FA;
