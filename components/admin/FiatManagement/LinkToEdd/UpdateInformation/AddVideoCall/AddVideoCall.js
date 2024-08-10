import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addVideoCallHandler } from "../helper";

import AddVideoCallBody from "./AddVideoCallBody";
import { VIDEO_LINK } from "../../../constants";
import { videoCallSchema } from "../../../../../../utils/validation";
import { videoCallDefaultValues } from "../../../../../../utils/DefaultValues";

const AddVideoCall = ({ transaction, onClose, setData }) => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: videoCallDefaultValues,
    resolver: zodResolver(videoCallSchema),
  });

  useEffect(() => {
    if (transaction?.data?.videoLink)
      setValue(VIDEO_LINK, transaction.data.videoLink);
    //eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    await addVideoCallHandler(data, transaction, onClose, setData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        return handleSubmit(onSubmit)(e);
      }}
    >
      <AddVideoCallBody
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

export default AddVideoCall;
