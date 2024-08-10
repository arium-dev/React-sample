import React, { useCallback } from "react";
import ShowModal from "../../../../shared/Modal";
import { MODAL_CLASS } from "../../../../../utils/Constants";
import Form from "./Form";
import { VERIFY_2FA } from "./constants";

const Verify2FA = ({ setVerify2FA, verify2FA }) => {
  const onClose = useCallback(() => {
    setVerify2FA((prev) => ({ ...prev, open: false }));
    //eslint-disable-next-line
  }, []);

  return (
    <ShowModal
      isOpen={true}
      title={VERIFY_2FA}
      onClose={onClose}
      dialogClassName={MODAL_CLASS.LG}
    >
      <Form
        onClose={onClose}
        setVerify2FA={setVerify2FA}
        verify2FA={verify2FA}
      />
    </ShowModal>
  );
};

export default Verify2FA;
