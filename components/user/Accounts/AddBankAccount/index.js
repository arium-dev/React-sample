import React, { useCallback } from "react";
import ShowModal from "../../../shared/Modal";
import Form from "./Form";
import { FORM_TITLE } from "./constants";

const AddBankAccount = ({ setOpenModel, bankDetail }) => {
  const onCloseModal = useCallback(() => {
    setOpenModel(false);
  }, [setOpenModel]);

  return (
    <>
      <ShowModal
        isOpen={true}
        title={FORM_TITLE}
        onClose={onCloseModal}
        dialogClassName="modal-lg"
      >
        <Form onCloseModal={onCloseModal} bankDetail={bankDetail} />
      </ShowModal>
    </>
  );
};

export default AddBankAccount;
