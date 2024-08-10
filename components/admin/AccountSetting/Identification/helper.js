import { error, success } from "../../../shared/Alert";
import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PROFILE_UPDATE_CONFIRM_HEADING,
  PROFILE_UPDATE_CONFIRM_SUBHEADING,
} from "./constants";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";

export const cancelUpdateHandler = (userProfile) => {
  const { firstName, lastName } = userProfile;

  return { firstName, lastName };
};

export const defaultIsOpenValues = {
  passwordUpdate: false,
  emailUpdate: false,
  updateDetail: false,
  verifyPass: false,
};

export const getUpdatesValues = (data) => {
  const { firstName, lastName } = data;

  return { firstName, lastName };
};

export const prefillUserValues = (userProfile, setValue) => {
  if (userProfile?.firstName) setValue(FIRST_NAME, userProfile?.firstName);

  if (userProfile?.lastName) setValue(LAST_NAME, userProfile?.lastName);

  if (userProfile?.email) setValue(EMAIL, userProfile?.email);
};

export const updateUserProfileHandler = async (
  formData,
  setIsSubmitting,
  reset,
  setUserProfile
) => {
  setIsSubmitting(true);
  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.updateProfile,
    formData
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data) {
    success(resp.message);
    reset(getUpdatesValues(resp.data));
    setUserProfile(resp.data);
  } else {
    error(resp.message);
  }

  setIsSubmitting(false);
};

export const getUpdateAlertText = (data, userProfile) => {
  return {
    heading: PROFILE_UPDATE_CONFIRM_HEADING,
    subHeading: PROFILE_UPDATE_CONFIRM_SUBHEADING,
  };
};
