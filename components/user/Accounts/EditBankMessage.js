import React from "react";
import ShowModal from "../../shared/Modal";
import { EDIT_WITHDRAW_BANK, EDIT_WITHDRAW_BANK_MESSAGE } from "./constants";
import { SUPPORT_EMAIL } from "../../../utils/Constants";

const EditBankMessage = ({ handleCloseModal }) => {
  return (
    <ShowModal
      isOpen={true}
      title={EDIT_WITHDRAW_BANK}
      onClose={handleCloseModal}
      dialogClassName="modal-lg"
    >
      <p>{EDIT_WITHDRAW_BANK_MESSAGE}</p>
      <a className="text-primary" href={`mailto:${SUPPORT_EMAIL}`}>
        {SUPPORT_EMAIL}
      </a>
    </ShowModal>
  );
};

export default EditBankMessage;
