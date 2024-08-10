import { error } from "../../../../shared/Alert";
import { initialVerify2FAWithdraw } from "../../helper";
import { ExecuteHttpRequest } from "../../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../../utils/Constants";

export const verify2FAHandler = async (
  data,
  onClose,
  setVerify2FA,
  verify2FA
) => {
  const resp = await ExecuteHttpRequest(
    methods.POST,
    AdminUrls.verifyTwoFaUrl,
    data
  );

  if (resp?.status === HTTP_STATUS_CODE.OK && resp?.verified) {
    await verify2FA.proceedWithdraw();

    setVerify2FA(initialVerify2FAWithdraw);
    onClose();
  } else {
    error(resp.message);
  }
};
