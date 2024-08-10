import React from "react";
import ShowModal from "../Modal";
import Form from "./Form";
import { FORM_TITLE } from "./constants";

const CurrencyCalculationModel = ({
  handleModalClose,
  currency,
  handleClickNext = null,
}) => {
  return (
    <>
      <ShowModal
        isOpen={true}
        title={FORM_TITLE}
        onClose={handleModalClose}
        dialogClassName="modal-lg"
        bodyClassName="pt-1 px-8"
      >
        <Form currency={currency} handleClickNext={handleClickNext} />
      </ShowModal>
    </>
  );
};

export default CurrencyCalculationModel;
