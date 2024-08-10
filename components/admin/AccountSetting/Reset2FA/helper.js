import { error, success } from "../../../shared/Alert";
import { getLocalStorageItem } from "../../../../config/AuthSetting";
import { setUserInfo } from "../../../../store/auth";
import { encryptData } from "../../../../utils/EncryptDecrypt";
import { ExecuteHttpRequest } from "../../../../ExecuteHttpRequest";
import { methods, AdminUrls, encryptedKeys } from "../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../utils/Constants";

export const verifyResetTwoFA = async (
  data,
  onCloseModal,
  setUserProfile,
  dispatch
) => {
  const resp = await ExecuteHttpRequest(
    methods.POST,
    AdminUrls.verifyResetTwoFAUrl,
    data
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    onCloseModal();
    setUserProfile(resp?.data);
    const userInfo = getLocalStorageItem(encryptedKeys.userInfo);
    dispatch(setUserInfo(encryptData({ ...userInfo, twoFaEnabled: true })));
  } else {
    error(resp.message);
  }
};

export const defaultTwoFa = {
  loading: false,
  enabled: false,
  dataUrl: "",
  secret: "",
};

export const getResetTwoFA = async (setTwoFa) => {
  setTwoFa((prev) => {
    return { ...prev, loading: true };
  });

  const resp = await ExecuteHttpRequest(
    methods.GET,
    AdminUrls.getResetTwoFAUrl
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    setTwoFa((prev) => {
      return {
        ...prev,
        enabled: false,
        loading: false,
        dataUrl: resp?.data?.qrCodeUrl,
        secret: resp?.data?.twoFaSecret,
      };
    });
  } else {
    setTwoFa((prev) => {
      return { ...prev, loading: false };
    });
    error(resp.message);
  }
};
