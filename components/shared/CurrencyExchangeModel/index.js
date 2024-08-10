import React from "react";
import ShowModal from "../Modal";
import Form from "./Form";
import { FORM_TITLE } from "./constants";

const CurrencyExchangeModel = ({
  handleModalClose,
  currency = null,
  handleSelectCurrency = () => {},
  modal = null,
  amountInAud,
  destinationCurrency,
  currencyRate,
  currencyCode,
  exchangeCurrencyId,
  setNewValue,
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
        <Form
          currency={currency}
          handleSelectCurrency={handleSelectCurrency}
          modal={modal}
          amountInAud={amountInAud}
          destinationCurrency={destinationCurrency}
          currencyRate={currencyRate}
          currencyCode={currencyCode}
          exchangeCurrencyId={exchangeCurrencyId}
          setNewValue={setNewValue}
        />
      </ShowModal>
    </>
  );
};

export default CurrencyExchangeModel;
