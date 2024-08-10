import React from "react";
import { useForm } from "react-hook-form";
import FormBody from "./FormBody";
import { createWithdraw, editWithdraw } from "./helper";

const Form = ({
  withdraw,
  onCloseWithdraw,
  refreshWithdrawsList,
  editWithdraws,
  setEditWithdraws,
  setWithdraw,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({});

  const onSubmit = async () => {
    const payload = editWithdraws.data.map(
      ({ accountNumber, amount, bsb, refId, userId, userName, id }) => {
        return {
          accountNumber,
          amount,
          bsb,
          refId,
          userId,
          userName,
          id,
        };
      }
    );

    if (!editWithdraws.isEdit) {
      await createWithdraw(
        { withdraws: payload },
        onCloseWithdraw,
        refreshWithdrawsList
      );
    } else {
      const batchId = withdraw?.data?.id;

      await editWithdraw(
        { withdraws: payload },
        onCloseWithdraw,
        refreshWithdrawsList,
        batchId
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <FormBody
        isSubmitting={isSubmitting}
        withdraw={withdraw}
        editWithdraws={editWithdraws}
        setEditWithdraws={setEditWithdraws}
        setWithdraw={setWithdraw}
      />
    </form>
  );
};

export default Form;
