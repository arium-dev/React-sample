import React, { useCallback } from "react";
import ShowModal from "../../../../shared/Modal";
import {
  initialAddEditWithdrawValues,
  initialEditWithdrawValues,
} from "../../helper";
import { MODAL_CLASS } from "../../../../../utils/Constants";
import Form from "./Form";
import { ADD_WITHDRAWALS, EDIT_WITHDRAWALS } from "./constants";

const AddEditWithdraw = ({
  withdraw,
  setWithdraw,
  refreshWithdrawsList,
  editWithdraws,
  setEditWithdraws,
}) => {
  const onCloseWithdraw = useCallback(() => {
    setWithdraw(initialAddEditWithdrawValues);
    setEditWithdraws(initialEditWithdrawValues);
    //eslint-disable-next-line
  }, []);

  return (
    <ShowModal
      isOpen={true}
      title={withdraw?.data?.id ? EDIT_WITHDRAWALS : ADD_WITHDRAWALS}
      onClose={onCloseWithdraw}
      dialogClassName={MODAL_CLASS.XL}
    >
      <Form
        withdraw={withdraw}
        refreshWithdrawsList={refreshWithdrawsList}
        onCloseWithdraw={onCloseWithdraw}
        editWithdraws={editWithdraws}
        setEditWithdraws={setEditWithdraws}
        setWithdraw={setWithdraw}
      />
    </ShowModal>
  );
};

export default AddEditWithdraw;
