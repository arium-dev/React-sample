import React from "react";
import ShowModal from "../../../../shared/Modal";
import { Constants } from "./constants";
import Form from "./Form";

const CreateFiatWithdraw = ({ onCloseModal, handleRefresh }) => {
  return (
    <ShowModal
      isOpen={true}
      title={Constants.CREATE_WITHDRAWAL}
      onClose={onCloseModal}
      dialogClassName="modal-lg"
    >
      <Form onCloseModal={onCloseModal} handleRefresh={handleRefresh} />
    </ShowModal>
  );
};

export default CreateFiatWithdraw;
