import React from "react";
import { Modal } from "react-bootstrap";
import { GenericConstant, mailtoSupport } from "../../../utils/Constants";
import Button from "../Button";
import { KycAlertIcon } from "../../../icons";

const ConfirmationModal = ({
  isOpen = false,
  onClose = () => {},
  onSuccess = () => {},
  className = "",
}) => {
  return (
    <Modal
      className={`fade ${className}`}
      show={isOpen}
      onHide={onClose}
      dialogClassName={"modal-md"}
    >
      <Modal.Body>
        <div>
          <div className="text-center">
            <KycAlertIcon />
          </div>
          <h3 className="text-center my-3">{GenericConstant.ALERT}</h3>
          <p className="remove-spacing">
            {GenericConstant.USER_ALERT_BANK_ACCOUNT_MESSAGE}
          </p>
          <p>{mailtoSupport}</p>
          <div className="d-flex gap-2 justify-content-center">
            <Button className="w-fit btn-sm" onClick={onSuccess}>
              {GenericConstant.CONFIRM}
            </Button>
            <Button className="w-fit btn-sm" onClick={onClose}>
              {GenericConstant.CANCEL}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
