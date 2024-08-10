import {
  ADD_EMAIL_TITLE,
  ADD_NOTES_TITLE,
  ADD_VIDEO_LINK_TITLE,
  UPDATE_EMAIL_TITLE,
  UPDATE_NOTES_TITLE,
  UPDATE_VIDEO_LINK_TITLE,
  CALENDLY_SCHEDULE_EVENT_URL,
  MINUTES,
} from "./constants";
import { NOTES, VIDEO_LINK, EMAIL, UPDATE_NOTES } from "../../constants";
import { error, success } from "../../../../shared/Alert";
import moment from "moment";
import { ExecuteHttpRequest } from "../../../../../ExecuteHttpRequest";
import { methods, AdminUrls } from "../../../../../utils";
import { HTTP_STATUS_CODE } from "../../../../../utils/Constants";

export const getModalTitle = (type, isEdit) => {
  switch (type) {
    case NOTES:
      return isEdit ? UPDATE_NOTES_TITLE : ADD_NOTES_TITLE;
    case VIDEO_LINK:
      return isEdit ? UPDATE_VIDEO_LINK_TITLE : ADD_VIDEO_LINK_TITLE;
    case EMAIL:
      return isEdit ? UPDATE_EMAIL_TITLE : ADD_EMAIL_TITLE;
    default:
      return "";
  }
};

export const addNotesHandler = async (
  { note },
  { data: { id, _id } },
  onClose,
  setData
) => {
  const payload = { note };

  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.addNotesForEddUrl(id ? id : _id),
    payload
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    setData((prev) => {
      return {
        ...prev,
        list:
          prev.list.length > 0
            ? prev.list.map((item) => {
                if (item?._id === _id) {
                  return {
                    ...item,
                    note,
                  };
                }
                return item;
              })
            : [],
      };
    });
    success(resp.message);
    onClose();
  } else {
    error(resp.message);
  }
};

export const addEmailOpen = (setPendingDeposit, item, isEdit) => {
  setPendingDeposit((prev) => ({
    ...prev,
    open: true,
    type: EMAIL,
    data: item,
    isEdit,
  }));
};

export const addVideoLinkOpen = (setPendingDeposit, item, isEdit) => {
  setPendingDeposit((prev) => ({
    ...prev,
    open: true,
    type: VIDEO_LINK,
    data: item,
    isEdit,
  }));
};

export const addNotesOpen = (setPendingDeposit, item, isEdit) => {
  setPendingDeposit((prev) => ({
    ...prev,
    open: true,
    type: NOTES,
    data: item,
    isEdit,
  }));
};

export const addEmailHandler = async (
  { email },
  {
    data: {
      userId: { _id },
    },
  },
  onClose,
  setPendingDeposits
) => {
  const payload = { contactEmail: email, userId: _id };

  const resp = await ExecuteHttpRequest(
    methods.POST,
    AdminUrls.contactEmailUrl,
    payload
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    setPendingDeposits((prev) => {
      return {
        ...prev,
        list:
          prev.list.length > 0
            ? prev.list.map((item) => {
                if (item?.userId?.id === resp?.data?.id) {
                  return {
                    ...item,
                    userId: {
                      ...item.userId,
                      contactEmail: resp?.data?.contactEmail,
                    },
                  };
                }
                return item;
              })
            : [],
      };
    });
    success(resp.message);
    onClose();
  } else {
    error(resp.message);
  }
};

export const addVideoCallHandler = async (
  { link },
  { data: { id, _id } },
  onClose,
  setData
) => {
  const payload = { link };

  const resp = await ExecuteHttpRequest(
    methods.PUT,
    AdminUrls.addVideoLinkUrl(id ? id : _id),
    payload
  );

  if (resp.status === HTTP_STATUS_CODE.OK) {
    setData((prev) => {
      return {
        ...prev,
        list:
          prev.list.length > 0
            ? prev.list.map((item) => {
                if (item?._id === _id) {
                  return {
                    ...item,
                    videoLink: link,
                  };
                }
                return item;
              })
            : [],
      };
    });

    success(resp.message);
    onClose();
  } else {
    error(resp.message);
  }
};

export const getRescheduleLink = (row) => {
  const event =
    row.eventSlot && row.eventSlot[0] && row.eventSlot[0].data
      ? JSON.parse(row.eventSlot[0].data)
      : null;
  const uuid =
    (event &&
      event.uri &&
      event.uri.split("/")[event.uri.split("/").length - 1]) ||
    "";

  let now = new Date();
  now = moment(now).add(1, MINUTES);
  const endDateTime = moment(event?.end_time);
  const diff = endDateTime.diff(now);
  return CALENDLY_SCHEDULE_EVENT_URL(diff, uuid);
};
