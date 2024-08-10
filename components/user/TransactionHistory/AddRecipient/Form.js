import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBody from "./FormBody";
import { recipientSchema } from "../../../../utils/validation";
import { recipientDefaultValues } from "../../../../utils/DefaultValues/conditional";
import { addRecipient } from "./helper";

const Form = ({
  onCloseModal,
  setData,
  openInvitationModal,
  isTransfer = false,
  handleClickNext,
}) => {
  const [userInfo, setUserInfo] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: recipientDefaultValues(),
    resolver: zodResolver(recipientSchema),
  });

  const onSubmit = async (data) => {
    if (isTransfer && userInfo?.recipientId) {
      handleClickNext(userInfo);
    } else {
      await addRecipient(
        data,
        onCloseModal,
        setData,
        openInvitationModal,
        userInfo,
        isTransfer,
        handleClickNext
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        return handleSubmit(onSubmit)(e);
      }}
    >
      <FormBody
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isTransfer={isTransfer}
        handleClickNext={handleClickNext}
      />
    </form>
  );
};

export default Form;
