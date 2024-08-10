import { getLoginDetails } from "../../../services/auth";
import { success, error } from "../../shared/Alert";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AuthUrls, encryptedKeys } from "../../../utils";
import { HTTP_STATUS_CODE, DELAY_1000 } from "../../../utils/Constants";
import { decryptData, encryptData } from "../../../utils/EncryptDecrypt";

export const handleVerifyTwoFaAndLogin = async (
  data,
  setLoading,
  handleSetUserInfo,
  handleSetPermissions,
  handleRemoveLoginKey
) => {
  setLoading(true);
  let formData = { ...data };
  const details = await getLoginDetails();
  if (details) {
    formData = { ...formData, ...details };
  }

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.verifyTwoFaAndLoginUrl,
    formData,
    { withCredentials: true }
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const { userInfo, token } = resp.data;
    handleRemoveLoginKey();
    if (userInfo) handleSetUserInfo(userInfo);
    const { permissions } = decryptData(token);
    if (permissions) handleSetPermissions(encryptData(permissions));

    localStorage.setItem(encryptedKeys.token, token);
    localStorage.setItem(encryptedKeys.user, userInfo);
    setTimeout(() => {
      window.location = "/";
    }, DELAY_1000);
    success(resp.message);
    setTimeout(() => {
      setLoading(false);
    }, DELAY_1000);
  } else {
    error(resp.message);
    setLoading(false);
  }
};
