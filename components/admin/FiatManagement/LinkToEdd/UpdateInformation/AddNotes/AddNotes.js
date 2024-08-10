import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddNotesBody from "./AddNotesBody";
import { addNotesHandler } from "../helper";
import { NOTES } from "../../../constants";
import { notesSchema } from "../../../../../../utils/validation";
import { notesDefaultValues } from "../../../../../../utils/DefaultValues";

const AddNotes = ({ transaction, onClose, setData }) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: notesDefaultValues,
    resolver: zodResolver(notesSchema),
  });

  useEffect(() => {
    if (transaction?.data?.note) setValue(NOTES, transaction?.data?.note);
    //eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    await addNotesHandler(data, transaction, onClose, setData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <AddNotesBody
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

export default AddNotes;
