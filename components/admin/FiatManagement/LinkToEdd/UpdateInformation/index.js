import React, { useCallback } from "react";
import ShowModal from "../../../../shared/Modal";
import { initialSinglePendingDeposit } from "../../helper";
import { getModalTitle } from "./helper";
import { EMAIL, NOTES, VIDEO_LINK } from "../../constants";
import AddNotes from "./AddNotes/AddNotes";
import AddVideoCall from "./AddVideoCall/AddVideoCall";
import AddEmail from "./AddEmail/AddEmail";

const UpdateInformation = ({ transaction, setTransaction, setData }) => {
  const onClose = useCallback(() => {
    setTransaction(initialSinglePendingDeposit);
    //eslint-disable-next-line
  }, []);

  return (
    <ShowModal
      isOpen={true}
      title={getModalTitle(transaction.type, transaction.isEdit)}
      onClose={onClose}
    >
      {transaction.type === NOTES ? (
        <AddNotes
          transaction={transaction}
          onClose={onClose}
          setData={setData}
        />
      ) : transaction.type === VIDEO_LINK ? (
        <AddVideoCall
          transaction={transaction}
          onClose={onClose}
          setData={setData}
        />
      ) : transaction.type === EMAIL ? (
        <AddEmail
          transaction={transaction}
          onClose={onClose}
          setData={setData}
        />
      ) : null}
    </ShowModal>
  );
};

export default UpdateInformation;
