import React, { useCallback } from "react";
import ConfirmationModal from "../../shared/Modal/ConfirmationModal";

const AddConfirmationModal = ({ setConfirmationModal, setOpenModel }) => {
  const onCloseModal = useCallback(() => {
    setConfirmationModal(false);
  }, [setConfirmationModal, setOpenModel]);
  const onSuccessModal = useCallback(() => {
    setOpenModel(true);
    setConfirmationModal(false);
  }, []);

  return (
    <>
      <ConfirmationModal
        isOpen={true}
        onClose={onCloseModal}
        onSuccess={onSuccessModal}
      ></ConfirmationModal>
    </>
  );
};

export default AddConfirmationModal;
