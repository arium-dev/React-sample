import { error, success } from "../../../shared/Alert";
import { UPDATE_USER, DELAY_3000 } from "./constants";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../utils";
import {
  HTTP_STATUS_CODE,
  GENERIC_MESSAGES,
} from "../../../../utils/Constants";

export const userModalText = (edit) => UPDATE_USER;

export const userModalBtn = (edit) => UPDATE_USER;

export const editUserHandler = async (data, setLoading, onClose, setUsers) => {
  setLoading(true);
  try {
    const resp = await ExecuteHttpRequest(
      methods.PUT,
      AdminUrls.editUserUrl(data.id),
      data
    );

    if (resp.status === HTTP_STATUS_CODE.OK) {
      setUsers((prev) => {
        return {
          ...prev,
          list: prev.list.map((user) => {
            return user._id === data.id ? { ...user, ...data } : user;
          }),
        };
      });

      success(resp?.message);
      onClose();
    } else {
      error(resp?.message);
    }
  } catch (err) {
    error(err.message || GENERIC_MESSAGES.SOMETHING_WENT_WRONG);
  }
  setTimeout(() => {
    setLoading(false);
  }, DELAY_3000);
};
