import React, { useState, useEffect, useCallback } from "react";
import { Card } from "react-bootstrap";
import verifyEmailImg from "../../../images/verify-email.png";
import { Constants } from "./constants";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import { eventUrl } from "../../../config";
import { handleCheckEventSlot, handleScheduleMeeting } from "./helper";
import { useLocation } from "react-router-dom";
import Spinner from "../../shared/Spinner";
import { TEN, TWO } from "../../../utils/Constants";

const ScheduleMeeting = () => {
  const { pathname } = useLocation();
  const token = pathname && pathname.split("/")?.[TWO];

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(Constants._CHECK);

  useEffect(() => {
    handleCheckEventSlot(token, setLoading, setStatus);
    // eslint-disable-next-line
  }, []);

  const onScheduleMeeting = useCallback((values) => {
    handleScheduleMeeting(token, values, setLoading, setStatus);
    // eslint-disable-next-line
  }, []);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => onScheduleMeeting(e.data.payload),
  });

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Card className="w-25 h-auto">
        <Card.Body>
          {loading ? (
            <div className="py-4">
              <div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
                  <div className="d-flex align-items-center flex-column px-4">
                    <Spinner size={Constants.EIGHTY} color={"#3c44b1"} />
                  </div>
                  <div className="text-muted font-size-xl text-center pt-3">
                    {Constants.PLEASE_WAIT}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-center mb-4">
                <img src={verifyEmailImg} alt="verify email" className="w-25" />
              </div>

              {status === Constants._VALID ? (
                <div>
                  <h4 className="text-center mb-4">
                    <span>{Constants.INVITATION_ACCEPTED}</span>
                  </h4>
                  <p className="text-center mb-4 ">
                    {Constants.CAN_SCHEDULE_MEETING}
                  </p>
                  <div className="text-center">
                    <PopupButton
                      disabled={loading}
                      className="btn btn-primary btn-block"
                      url={eventUrl}
                      rootElement={document.getElementById(Constants._ROOT)}
                      text={
                        !loading ? (
                          Constants.SCHEDULE_MEETING
                        ) : (
                          <Spinner color="text-primary" size={TEN} />
                        )
                      }
                    />
                  </div>
                </div>
              ) : status === Constants._BOOKED ? (
                <div>
                  <h4 className="text-center mb-4">
                    <span className="text-success">
                      {Constants.EVENT_BOOKED_SUCCESSFULY}
                    </span>
                  </h4>
                  <p className="text-center mb-4 ">
                    {Constants.PLEASE_CHECK_EMAIL}
                  </p>
                  <p className="text-center mb-4 ">{Constants.THANK_YOU}</p>
                </div>
              ) : (
                <div>
                  <h4 className="text-center mb-4">
                    <span className="text-warning">{status}</span>
                  </h4>

                  <h6 className="text-center mb-4 ">
                    {Constants.CONTACT_TO_ADMIN}
                  </h6>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ScheduleMeeting;
