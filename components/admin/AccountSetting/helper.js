import { error } from "../../shared/Alert";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../utils";
import { HTTP_STATUS_CODE } from "../../../utils/Constants";

export const fetchAdminProfile = async (setUserProfile, setLoading) => {
  setLoading(true);
  const resp = await ExecuteHttpRequest(
    methods.GET,
    AdminUrls.fetchAdminProfileUrl
  );

  if (resp && resp.status === HTTP_STATUS_CODE.OK) {
    setUserProfile(resp?.data);
  } else {
    error(resp?.message);
  }

  setLoading(false);
};
