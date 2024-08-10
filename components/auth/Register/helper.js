import StepOne from "./Wizard/StepOne";
import StepTwo from "./Wizard/StepTwo";
import StepThree from "./Wizard/StepThree";
import StepFour from "./Wizard/StepFour";
import { getLoginDetails } from "../../../services/auth";
import {
  RESEND_EMAIL_LIMIT,
  STEPPER_1,
  STEPPER_2,
  STEPPER_3,
  STEPPER_4,
} from "./constants";
import { success, error } from "../../shared/Alert";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AuthUrls, encryptedKeys } from "../../../utils";
import {
  HTTP_STATUS_CODE,
  FIVE_HUNDRED,
  DELAY_1000,
} from "../../../utils/Constants";
import { decryptData, encryptData } from "../../../utils/EncryptDecrypt";

export const handleRegisterUser = async (
  data,
  setLoading,
  handleSetUserInfo,
  handleReCaptchaVerify,
  setCount
) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.registerUrl,
    data
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    handleSetUserInfo(resp?.userInfo || resp?.data);
    setCount(RESEND_EMAIL_LIMIT);
    setTimeout(() => {
      setLoading(false);
    }, FIVE_HUNDRED);
  } else {
    handleReCaptchaVerify();
    error(resp.message);
    setLoading(false);
  }
};

export const handleUserEmailStatus = async (
  email,
  setLoading,
  userInfo,
  handleSetUserInfo
) => {
  setLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.userEmailStatusUrl,
    {
      email,
    }
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    success(resp.message);
    let user = userInfo;
    handleSetUserInfo({ ...user, verified: true });
    setTimeout(() => {
      setLoading(false);
    }, FIVE_HUNDRED);
  } else {
    error(resp.message);
    setLoading(false);
  }
};

export const steps = [
  { component: StepOne },
  { component: StepTwo },
  { component: StepThree },
  { component: StepFour },
];

const registerPageHeadings = {
  goStep1: STEPPER_1,
  goStep2: STEPPER_2,
  goStep3: STEPPER_3,
  goStep4: STEPPER_4,
};

export const getRegisterPageHeading = (goSteps) =>
  registerPageHeadings[`goStep${goSteps + 1}`];

export const defaultTwoFa = {
  loading: false,
  enabled: false,
  dataUrl: "",
  secret: "",
};

export const generateTwoFA = async (id, setTwoFa) => {
  setTwoFa((prev) => {
    return { ...prev, loading: true };
  });

  const resp = await ExecuteHttpRequest(
    methods.GET,
    AuthUrls.generateTwoFaUrl(id)
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const { qrCodeUrl, twoFaSecret } = resp.data;
    setTwoFa((prev) => {
      return {
        ...prev,
        enabled: false,
        loading: false,
        dataUrl: qrCodeUrl || "",
        secret: twoFaSecret || "",
      };
    });
  } else {
    setTwoFa((prev) => {
      return { ...prev, loading: false };
    });
    error(resp.message);
  }
};

export const handleEnableTwoFa = async (
  data,
  setLoading,
  handleSetUserInfo,
  handleRemoveLoginKey,
  handleSetPermissions
) => {
  setLoading(true);
  let formData = { ...data };
  const details = await getLoginDetails();
  if (details) {
    formData = { ...formData, ...details };
  }

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.enableTwoFaUrl,
    formData,
    { withCredentials: true }
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    const { userInfo, token } = resp.data;
    handleRemoveLoginKey();
    const { permissions } = decryptData(token);
    if (permissions) handleSetPermissions(encryptData(permissions));
    localStorage.setItem(encryptedKeys.token, token);
    localStorage.setItem(encryptedKeys.user, userInfo);
    localStorage.setItem(encryptedKeys.userInfo, userInfo);
    setTimeout(() => {
      window.location = "/dashboard?kyc=true";
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

export const resendUserEmailHandler = async (
  email,
  setEmailLoading,
  setCount
) => {
  setEmailLoading(true);

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AuthUrls.resendEmailVerification,
    { email }
  );

  if (resp.status === 200) {
    success(resp.message);
    setCount(RESEND_EMAIL_LIMIT);
  } else {
    error(resp.message);
  }

  setEmailLoading(false);
};
