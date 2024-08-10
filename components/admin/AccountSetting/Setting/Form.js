import React from "react";
import { useForm } from "react-hook-form";

import DetailedCard from "../../../shared/Card/DetailedCard";
import FormBody from "./FormBody";
import { TWOFA } from "./constants";

const Setting = ({ setUserProfile, permissions }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DetailedCard
        title={<p className="text-secondary my-0 fw-medium">{TWOFA}</p>}
      >
        <FormBody
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          setUserProfile={setUserProfile}
          permissions={permissions}
        />
      </DetailedCard>
    </form>
  );
};

export default Setting;
