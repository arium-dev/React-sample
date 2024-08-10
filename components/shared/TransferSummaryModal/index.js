import React from "react";
import ShowModal from "../Modal";
import Summary from "./Summary";

const TransferSummaryModal = ({
  handleModalClose,
  handleConfirm,
  formData,
  loading,
}) => {
  return (
    <>
      <ShowModal
        isOpen={true}
        onClose={handleModalClose}
        dialogClassName="modal-lg"
        bodyClassName="pt-1 px-8"
        hideHeader={true}
      >
        <Summary
          loading={loading}
          formData={formData}
          handleConfirm={handleConfirm}
        />
      </ShowModal>
    </>
  );
};

export default TransferSummaryModal;
