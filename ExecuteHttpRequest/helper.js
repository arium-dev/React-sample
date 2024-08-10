import { HTTP_STATUS_CODE } from "../utils/Constants";
export const isValidResponse = (response) => {
  let responseData = response.data;
  return (
    responseData &&
    (responseData.code === HTTP_STATUS_CODE.OK ||
      responseData.code === HTTP_STATUS_CODE.CREATED ||
      response.status === HTTP_STATUS_CODE.OK)
  );
};

export const parseUrl = (url, dictionary) => {
  return url.replace(/\{(\w+)\}/g, (match, p1) => dictionary[p1]);
};
