export const ADD_NOTES_TITLE = "Add Notes";
export const ADD_VIDEO_LINK_TITLE = "Add video call link";
export const ADD_EMAIL_TITLE = "Add contact email";
export const UPDATE_NOTES_TITLE = "Update Notes";
export const UPDATE_VIDEO_LINK_TITLE = "Update video call link";
export const UPDATE_EMAIL_TITLE = "Update contact email";
export const SUBMIT = "Submit";
export const BOOKED = "booked";
export const CONFIRMED = "confirmed";
export const TWELVE = 12;
export const MINUTES = "minutes";

export const CALENDLY_SCHEDULE_EVENT_URL = (diff, uuid) => {
  return `https://calendly.com/app/scheduled_events/user/me?period=${
    diff >= 0 ? "upcoming" : "past"
  }&uuid=${uuid}`;
};
