import { error } from "../../shared/Alert";
import { decryptData } from "../../../utils/EncryptDecrypt";
import { HTTP_STATUS_CODE } from "../../../utils/Constants";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AuthUrls } from "../../../utils";
import { allowedRoles } from "../../../config";

const getRedirectUrl = (twoFaEnabled) => {
  if (twoFaEnabled) {
    return "/verify-2fa";
  } else {
    return "/register";
  }
};

export const loginHandler = async (
  formData,
  handleSetUserInfo,
  handleSetLoginKey,
  setLoading
) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.loginUrl,
    { ...formData, allowedRoles },
    { withCredentials: true }
  );

  if (resp.status === HTTP_STATUS_CODE.OK && resp.data) {
    const { loginKey, userInfo } = resp.data;
    if (loginKey) handleSetLoginKey(loginKey);
    if (userInfo) {
      handleSetUserInfo(userInfo);
      const { twoFaEnabled } = decryptData(userInfo);
      const redirectUrl = getRedirectUrl(twoFaEnabled);
      setTimeout(() => {
        window.location = redirectUrl;
        setLoading(false);
      }, 1000);
    } else {
      error(resp.message);
    }
  } else {
    error(resp.message);
    setLoading(false);
  }
};
