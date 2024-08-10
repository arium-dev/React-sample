import { success, error } from "../../shared/Alert";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AuthUrls } from "../../../utils";
import { HTTP_STATUS_CODE } from "../../../utils/Constants";

export const ForgotPasswordHandler = async (data, reset) => {
  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.forgetPasswordUrl,
    data
  );
  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    reset && reset();
  } else {
    error(resp.message);
  }
};
