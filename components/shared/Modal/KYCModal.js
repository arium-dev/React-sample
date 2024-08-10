import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { GenericConstant } from "../../../utils/Constants";
import Button from "../Button";
import { useSelector } from "react-redux";
import { KycAlertIcon } from "../../../icons";
import KYCVerification from "../../user/AccountSetting/Identification/KYCVerification";

const KycModal = ({ isOpen = false, onClose = () => {}, className = "" }) => {
  const userProfile = useSelector((state) => state.userProfile);
  const [isSumSubModalOpen, setIsSumSubModalOpen] = useState(false);
  return (
    <>
      {isSumSubModalOpen && (
        <KYCVerification
          user={userProfile?.data}
          setIsSumSubVerificationOpen={setIsSumSubModalOpen}
        />
      )}
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
            <h3 className="text-center my-3">
              {GenericConstant.VERIFY_IDENTITY}
            </h3>
            <p>{GenericConstant.VERIFY_IDENTITY_DESC}</p>
            <h6>{GenericConstant.REQUIRED_DOCS}</h6>
            <p className="remove-spacing">{GenericConstant.PROOF_IDENTITY_1}</p>
            <p>{GenericConstant.PROOF_IDENTITY_2}</p>
            {GenericConstant.CONTACT_TO_SUPPORT_MESSAGE}
            <div className="text-center">
              <Button
                className="w-fit btn-sm"
                onClick={() => {
                  setIsSumSubModalOpen(true);
                  onClose();
                }}
              >
                {GenericConstant.START_KYC}
              </Button>
              <Button className="w-fit ms-2 btn-sm" onClick={onClose}>
                {GenericConstant.CANCEL}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default KycModal;
