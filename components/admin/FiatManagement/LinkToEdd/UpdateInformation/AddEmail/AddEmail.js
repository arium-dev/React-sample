import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEmailHandler } from "../helper";
import { EMAIL } from "../../../constants";
import AddEmailBody from "./AddEmailBody";
import { addEmailSchema } from "../../../../../../utils/validation";
import { addEmailDefaultValues } from "../../../../../../utils/DefaultValues";

const AddEmail = ({ transaction, onClose, setData }) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: addEmailDefaultValues,
    resolver: zodResolver(addEmailSchema),
  });

  useEffect(() => {
    if (transaction?.data?.userId.contactEmail)
      setValue(EMAIL, transaction?.data?.userId.contactEmail);
    //eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    await addEmailHandler(data, transaction, onClose, setData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <AddEmailBody
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
      />
    </form>
  );
};

export default AddEmail;
