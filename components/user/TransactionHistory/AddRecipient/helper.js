import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, UserUrls } from "../../../../utils";
import { HTTP_STATUS_CODE, PLACEHOLDERS } from "../../../../utils/Constants";
import { error, success } from "../../../shared/Alert";
import { ADD, ANONYMOUS, SEND_VIA_INVITATION, NEXT } from "./constants";

export const nonExistingUserName = (firstName, lastName) => {
  if (firstName.length === 0 && lastName.length === 0) {
    return ANONYMOUS;
  } else {
    return `${firstName} ${lastName}`;
  }
};

export const nonExistingUserEmail = (email) => {
  if (email.length === 0) {
    return PLACEHOLDERS.PLACEHOLDER_EMAIL;
  } else {
    return email;
  }
};

export const btnTxt = (userInfo, isTransfer = false) => {
  if (userInfo?.id) {
    return ADD;
  } else if (isTransfer) return NEXT;
  else return SEND_VIA_INVITATION;
};

export const addRecipient = async (
  data,
  onCloseModal,
  setData,
  openInvitationModal,
  userInfo,
  isTransfer,
  handleClickNext = () => {}
) => {
  try {
    const resp = await ExecuteHttpRequest(
      methods.POST,
      UserUrls.createRecipient,
      data
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      let newRecipient = { ...resp.data, _id: resp.data.id };

      if (isTransfer && resp.data && resp.data.id) {
        handleClickNext({
          ...data,
          ...newRecipient,
          recipientId: resp.data.id,
        });
      }
      setData &&
        setData((prev) => ({
          ...prev,
          list: [{ ...newRecipient, recipientInfo: data }, ...prev.list],
          total: prev.total + 1,
        }));

      !isTransfer && onCloseModal();
      if (userInfo?.code === HTTP_STATUS_CODE.NOT_FOUND) {
        openInvitationModal && openInvitationModal();
      } else {
        success(resp?.message);
      }
    } else {
      error(resp?.message);
    }
  } catch (err) {
    error(err?.message);
  }
};
