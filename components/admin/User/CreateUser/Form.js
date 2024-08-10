import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormBody from "./FormBody";
import { editUserHandler } from "./helper";
import { adminCreateUserSchema } from "../../../../utils/validation";
import { editUserDefaultValues } from "../../../../utils/DefaultValues/conditional";

const Form = ({ edit, onClose, permissions, setUsers }) => {
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: editUserDefaultValues(edit),
    resolver: zodResolver(adminCreateUserSchema),
  });

  const onSubmit = async (data) => {
    await editUserHandler(
      { id: edit?._id, ...data },
      setLoading,
      onClose,
      setUsers
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <FormBody
        edit={!!edit?.id}
        loading={loading}
        register={register}
        errors={errors}
        watch={watch}
        trigger={trigger}
        setValue={setValue}
        permissions={permissions}
      />
    </form>
  );
};

export default Form;
