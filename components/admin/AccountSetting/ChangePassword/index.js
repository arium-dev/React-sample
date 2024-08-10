import React from "react";
import ShowModal from "../../../shared/Modal";
import { UPDATE_PASSWORD } from "./constants";
import Form from "./Form";

const ChangePassword = ({ setIsOpen }) => {
  const onCloseModal = () => {
    setIsOpen((prev) => ({ ...prev, passwordUpdate: !prev.passwordUpdate }));
  };

  return (
    <ShowModal
      isOpen={true}
      title={UPDATE_PASSWORD}
      onClose={onCloseModal}
      dialogClassName="modal-lg"
    >
      <Form onCloseModal={onCloseModal} />
    </ShowModal>
  );
};

export default ChangePassword;
