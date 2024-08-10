import { error } from "../../shared/Alert";
import { Constants } from "./constants";
import { ExecuteHttpRequest } from "../../../ExecuteHttpRequest";
import { methods, AuthUrls } from "../../../utils";
import { HTTP_STATUS_CODE } from "../../../utils/Constants";

export const handleScheduleMeeting = (token, values, setLoading, setStatus) => {
  if (!token) return;

  if (token) {
    setLoading(true);

    ExecuteHttpRequest(methods.POST, AuthUrls.scheduleMeetingUrl, {
      eventUrl: values.event.uri,
      inviteeUrl: values.invitee.uri,
      token,
    }).then((res) => {
      setLoading(false);
      setStatus(Constants._BOOKED);
    });
  } else {
    error(Constants.NOT_AUTHORIZED);
  }
};

export const handleCheckEventSlot = (token, setLoading, setStatus) => {
  if (!token) return;

  ExecuteHttpRequest(methods.POST, AuthUrls.checkEventSlotUrl, { token }).then(
    (res) => {
      if (res.status === HTTP_STATUS_CODE.OK) {
        setStatus(Constants._VALID);
      } else {
        setStatus(res.message);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  );
};
