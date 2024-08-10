import { isArray, isString } from "lodash";
import {
  getLocalStorageItemExect,
  clearLocalStorageItems,
} from "./AuthSetting";
import { ExecuteHttpRequest } from "../ExecuteHttpRequest";
import { AuthUrls, encryptedKeys, methods } from "../utils";
import {
  EMAIL_PASSWORD_INVALID,
  INVALID_CREDIENTIALS,
  SOMETHING_WENT_WRONG,
} from "./constants";

export const getAuthorizationToken = (optional = {}) => {
  const token = getLocalStorageItemExect(encryptedKeys.token);

  if (token) {
    return {
      headers: {
        authorization: "Bearer " + token,
      },
      ...optional,
    };
  } else {
    return optional;
  }
};

export const ParseError = (error) => {
  let err = SOMETHING_WENT_WRONG;
  if (error.message && isArray(error.message)) {
    err = error.message[0];
    if (!isString(err) && isArray(err)) {
      err = err[0] && err[0].msg ? err[0].msg : err[0];
    } else {
      err = err.msg;
    }
  } else {
    if (error.message && isString(error.message)) {
      err = error.message;
      console.log(err, "string");
    }
    if (error.message && isString(error.message)) {
      err = error.message;
      console.log(err, "string");
    }
  }
  if (err === INVALID_CREDIENTIALS) {
    err = EMAIL_PASSWORD_INVALID;
  }
  return err;
};

export const ClearSession = async () => {
  await ExecuteHttpRequest(methods.GET, AuthUrls.logoutUrl, {
    withCredentials: true,
  });

  await clearLocalStorageItems();
  return true;
};
