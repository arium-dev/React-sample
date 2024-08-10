import React from "react";
import ShowModal from "../Modal";
import PaymentMethodes from "./PaymentMethodes";

const PaymentMethodeModal = ({
  handleModalClose,
  handleSelectPaymentMethode,
}) => {
  return (
    <>
      <ShowModal
        isOpen={true}
        onClose={handleModalClose}
        dialogClassName="modal-md"
        bodyClassName="pt-1 px-8"
        hideHeader={true}
      >
        <PaymentMethodes
          onCloseModal={handleModalClose}
          handleSelectPaymentMethode={handleSelectPaymentMethode}
        />
      </ShowModal>
    </>
  );
};

export default PaymentMethodeModal;
