import { success, error } from "../../shared/Alert";
import { decryptData } from "../../../utils/EncryptDecrypt";
import { HTTP_STATUS_CODE } from "../../../utils/Constants";
import { clearLocalStorageItems } from "../../../config/AuthSetting";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AuthUrls } from "../../../utils";

export const setPasswordHandler = async (
  data,
  setLoading,
  handleSetUserInfo,
  handleSetLoginKey
) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.confirmationUrl,
    data
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    const { loginKey, userInfo } = resp.data;
    if (userInfo) handleSetUserInfo(userInfo);
    if (loginKey) handleSetLoginKey(loginKey);
    const user = decryptData(userInfo);
    if (!user?.twoFaEnabled) {
      setTimeout(() => {
        setLoading(false);
        window.location = "/register";
      }, 500);
    } else {
      await clearLocalStorageItems();
      window.location = "/login";
    }
  } else {
    error(resp.message);
    setLoading(false);
  }
};

export const resetPasswordHandler = async (data, setLoading) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.resetPasswordUrl,
    data
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    setTimeout(() => {
      setLoading(false);
      window.location = "/";
    }, 900);
  } else {
    error(resp.message);
    setLoading(false);
  }
};
