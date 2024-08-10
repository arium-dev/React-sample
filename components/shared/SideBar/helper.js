import {
  KycInProgressIcon,
  KycRejectedIcon,
  KycVerifiedIcon,
} from "../../../icons";
import {
  IN_PROGRESS,
  NOT_VERIFIED,
  PENDING,
  REJECTED,
  VERIFIED,
  _NOT_VERIFIED,
  _REJECTED,
  _VERIFIED,
} from "./constants";

const getKYCStatusKey = (level) => {
  switch (level) {
    case 0:
      return REJECTED;
    case 1:
      return NOT_VERIFIED;
    case 2:
      return IN_PROGRESS;
    case 3:
      return VERIFIED;
    default:
      return "";
  }
};

const kycIcons = {
  inProgress: <KycInProgressIcon className="kyc-status-sidebar" />,
  notVerified: <KycRejectedIcon className="kyc-status-sidebar" />,
  rejected: <KycRejectedIcon className="kyc-status-sidebar" />,
  verified: <KycVerifiedIcon className="kyc-status-sidebar" />,
};

const getKYCBadgeText = (level) => {
  switch (level) {
    case 0:
      return {
        text: <span>{_REJECTED}</span>,
        className: "kyc-danger",
        id: "kyc-danger",
      };
    case 1:
      return {
        text: (
          <>
            <span className="d-inline-block me-1">Not</span>
            <span>{_VERIFIED}</span>
          </>
        ),
        className: "kyc-danger",
        id: "kyc-danger",
      };
    case 2:
      return {
        text: <span>{PENDING}</span>,
        className: "kyc-warning",
        id: "kyc-warning",
      };
    case 3:
      return {
        text: <span>{_VERIFIED}</span>,
        className: "kyc-primary",
        id: "kyc-primary",
      };
    default:
      return "";
  }
};

export const getKycIcon = (level = "") => {
  const status = getKYCStatusKey(level);
  if (status) {
    return (
      <div className="d-flex sidebar-kyc-status justify-content-start align-items-center">
        {kycIcons[status]}

        <span className="nav-text">
          <span
            id={`${getKYCBadgeText(level)?.id || ""}`}
            className={`${getKYCBadgeText(level)?.className || ""} w-fit d-flex fs-6 fw-semibold`}
          >
            {getKYCBadgeText(level)?.text || ""}
          </span>
        </span>
      </div>
    );
  } else return "";
};

export const getKycStatus = (level) => {
  switch (level) {
    case 0:
      return _REJECTED;
    case 1:
      return _NOT_VERIFIED;
    case 2:
      return PENDING;
    case 3:
      return _VERIFIED;
    default:
      return "";
  }
};
