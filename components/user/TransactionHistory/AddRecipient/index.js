import React from "react";
import ShowModal from "../../../shared/Modal";
import Form from "./Form";
import { ADD_RECIPIENT } from "../constants";

const AddRecipient = ({
  onClose,
  setData,
  openInvitationModal,
  isTransfer = false,
  handleClickNext,
}) => {
  return (
    <>
      <ShowModal
        isOpen={true}
        title={ADD_RECIPIENT}
        onClose={onClose}
        dialogClassName="modal-lg"
      >
        <Form
          onCloseModal={onClose}
          setData={setData}
          openInvitationModal={openInvitationModal}
          isTransfer={isTransfer}
          handleClickNext={handleClickNext}
        />
      </ShowModal>
    </>
  );
};

export default AddRecipient;
