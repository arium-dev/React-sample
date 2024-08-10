import { error, success } from "../../../shared/Alert";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";

export const changeUserPasswordHandler = async (formData, onCloseModal) => {
  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.changeUserPasswordUrl,
    formData
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    onCloseModal();
  } else {
    error(resp.message);
  }
};
