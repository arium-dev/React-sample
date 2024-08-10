import axios from "axios";
import { serverUrl } from "./index";
import { Logout, encryptedKeys } from "../utils";
import { HTTP_STATUS_CODE } from "../utils/Constants";
import { decryptData, encryptData } from "../utils/EncryptDecrypt";

const instance = axios.create({
  baseURL: serverUrl,
});

let refreshPromise = null;
// instance.interceptors.request.use(
//   async (config) => {
//     try {
//       return config;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error?.response?.status === HTTP_STATUS_CODE.Expectation_Failed) {
      Logout();
    }
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true; // Set the _retry flag to true to avoid infinite loop

      if (!refreshPromise) {
        refreshPromise = axios.get(serverUrl + "/auth/token", {
          withCredentials: true,
        });

        // Create a new promise to refresh the token
        return refreshPromise
          .then(async (resp) => {
            if (
              resp.status === HTTP_STATUS_CODE.OK &&
              resp.data &&
              resp.data.token
            ) {
              const accessToken = resp.data.token;
              let { permissions } = decryptData(accessToken);
              permissions = encryptData(permissions);
              localStorage.setItem(encryptedKeys.permissions, permissions);
              localStorage.setItem(encryptedKeys.token, accessToken);

              instance.defaults.headers.common.authorization = `Bearer ${accessToken}`;
              originalRequest.headers.authorization = `Bearer ${accessToken}`;
              // Retry the original request
              return instance(originalRequest);
            } else {
              Logout();
            }
          })
          .catch((refreshError) => {
            console.log("refreshError>>", refreshError);
            Logout();
          })
          .finally(() => {
            refreshPromise = null;
          });

        //  refreshPromise; // Return the promise for the retry
      } else {
        // If a token refresh is already in progress, wait for it to complete
        return refreshPromise
          .then(async (resp) => {
            const accessToken = resp.data.token;
            instance.defaults.headers.common.authorization = `Bearer ${accessToken}`;
            originalRequest.headers.authorization = `Bearer ${accessToken}`;
            // Retry original request with new token
            return instance(originalRequest);
          })
          .catch((err) => {
            console.log("refreshPromise err>>", error);
            Logout();
            // return Promise.reject(err);
          });
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
