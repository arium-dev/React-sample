import { error, success } from "../../../shared/Alert";
import { setUserInfo } from "../../../../store/auth";
import { getLocalStorageItem } from "../../../../config/AuthSetting";
import { encryptData } from "../../../../utils/EncryptDecrypt";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls, encryptedKeys } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";

export const verify2FAHandler = async (
  formData,
  onCloseModal,
  setIs2FAOpen,
  setUserProfile,
  dispatch
) => {
  const resp = await ExecuteHttpRequest(
    methods.POST,
    AdminUrls.verifyTwoFactorUrl,
    formData
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    onCloseModal();
    setIs2FAOpen((prev) => ({
      ...prev,
      verifyCurrent2FA: false,
    }));

    const resp = await ExecuteHttpRequest(
      methods.GET,
      AdminUrls.disableTwoFAUrl
    );

    if (resp?.status === HTTP_STATUS_CODE.OK) {
      setUserProfile(resp.data);
      success(resp.message);
      const userInfo = getLocalStorageItem(encryptedKeys.userInfo);
      dispatch(setUserInfo(encryptData({ ...userInfo, twoFaEnabled: false })));
    }
  } else {
    error(resp.message);
  }
};
