import { serverUrl } from "../config";
import { ParseError, getAuthorizationToken } from "../config/utils";
import instance from "../config/axios";
import { error } from "../components/shared/Alert";
import {
  HTTP_STATUS_CODE,
  SERVICE_ERROR,
  HTTP_REQUEST_ERROR,
} from "../utils/Constants";
import { isValidResponse } from "./helper";

const responseData = {
  status: HTTP_STATUS_CODE.NOT_EXECUTE,
  message: SERVICE_ERROR,
};

const mapMethod = (method, url, payload, headers = null) => {
  const mapRequestMethod = {
    get: () => instance[method](serverUrl + url, headers),
    post: () => instance[method](serverUrl + url, payload, headers),
    put: () => instance[method](serverUrl + url, payload, headers),
    delete: () => instance[method](serverUrl + url, headers),
  };

  if (!mapRequestMethod[method]) {
    error(HTTP_REQUEST_ERROR.INCORRECT_METHOD(method));
  }

  return mapRequestMethod[method];
};

export const ExecuteHttpRequest = async (
  method,
  url,
  payload = null,
  optional = {},
  isPublic = false
) => {
  let headers = optional;
  if (!isPublic) {
    headers = getAuthorizationToken(optional);
  }

  try {
    const methodFunction = mapMethod(method, url, payload, headers);

    let response = await methodFunction();

    if (isValidResponse(response)) {
      const responseCode = response.data.code;

      if (
        responseCode === HTTP_STATUS_CODE.OK ||
        responseCode === HTTP_STATUS_CODE.CREATED
      ) {
        return { ...response.data, status: HTTP_STATUS_CODE.OK };
      } else {
        return { status: HTTP_STATUS_CODE.OK, data: response.data };
      }
    } else {
      return {
        ...responseData,
        message: ParseError(response.data),
      };
    }
  } catch (err) {
    return {
      ...responseData,
      status: err?.response?.data?.code || HTTP_STATUS_CODE.CREATED,
      message: ParseError(
        err.response && err.response.data ? err.response.data : err.message
      ),
    };
  }
};
