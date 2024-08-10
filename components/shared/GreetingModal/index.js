import React from "react";
import ShowModal from "../Modal";
import { TITLE, TRANSACTION_VIEW, VIEW_TRANSACTION_HISTORY } from "./constants";
import { SuccessIcon } from "../../../icons";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const GreetingModal = ({ handleModalClose }) => {
  const navigate = useNavigate();

  return (
    <>
      <ShowModal
        isOpen={true}
        onClose={handleModalClose}
        dialogClassName="modal-md"
        bodyClassName="pt-1 px-8"
        hideHeader={true}
      >
        <div className="greeting-title ps-2 pe-4">
          <h3 className="m-0">{TITLE}</h3>
          <SuccessIcon className="greeting-icon mb-5 mt-4" />
          <Button
            className="btn"
            onClick={() => {
              handleModalClose();
              navigate("/transaction-history");
            }}
          >
            {VIEW_TRANSACTION_HISTORY}
          </Button>
        </div>
      </ShowModal>
    </>
  );
};

export default GreetingModal;
