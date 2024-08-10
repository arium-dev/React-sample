import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import isEmpty from "lodash/isEmpty";

import { sweetAlert } from "../../../shared/ConfirmBox";
import DetailedCard from "../../../shared/Card/DetailedCard";
import {
  getUpdateAlertText,
  prefillUserValues,
  updateUserProfileHandler,
} from "./helper";
import FormBody from "./FormBody";
import { IDENTIFICATION, UPDATE } from "./constants";
import { identificationSchemaAdmin } from "../../../../utils/validation";
import { accountSettingAdminDefaultValues } from "../../../../utils/DefaultValues";

const Identification = ({ userProfile, setUserProfile, permissions }) => {
  const {
    watch,
    trigger,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: accountSettingAdminDefaultValues,
    resolver: zodResolver(identificationSchemaAdmin),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEmpty(userProfile)) prefillUserValues(userProfile, setValue);
    //eslint-disable-next-line
  }, [userProfile]);

  const onSubmit = async (data) => {
    const text = getUpdateAlertText(data, userProfile);
    await sweetAlert(text.heading, text.subHeading, data, UPDATE)
      .then(async (willDelete) => {
        if (willDelete) {
          await updateUserProfileHandler(
            data,
            setIsSubmitting,
            reset,
            setUserProfile
          );
        }
      })
      .catch((err) => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DetailedCard
        title={
          <p className="text-secondary my-0 fw-medium">{IDENTIFICATION}</p>
        }
      >
        <FormBody
          watch={watch}
          trigger={trigger}
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          reset={reset}
          userProfile={userProfile}
          permissions={permissions}
        />
      </DetailedCard>
    </form>
  );
};

export default Identification;
