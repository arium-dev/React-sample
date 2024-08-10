import {
  KycInProgressIcon,
  KycNotVerifiedIcon,
  KycRejectedIcon,
  KycVerifiedIcon,
} from "../../../icons";
import { Badge } from "react-bootstrap";
import {
  IN_PROGRESS,
  NOT,
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
      return { text: <div>{_REJECTED}</div>, className: "kyc-danger" };
    case 1:
      return {
        text: (
          <>
            <div>{NOT}</div>
            <div>{_VERIFIED}</div>
          </>
        ),
        className: "kyc-danger",
      };
    case 2:
      return { text: <div>{PENDING}</div>, className: "badge-warning light" };
    case 3:
      return { text: <div>{_VERIFIED}</div>, className: "badge-primary light" };
    default:
      return "";
  }
};

export const getKycIcon = (level = "") => {
  const status = getKYCStatusKey(level);
  if (status) {
    return (
      <div className="d-flex sidebar-kyc-status justify-content-center align-items-center gap-2">
        {kycIcons[status]}

        <Badge
          className={`${getKYCBadgeText(level).className} badge-xm cursor-pointer`}
          bg=""
        >
          {getKYCBadgeText(level).text}
        </Badge>
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
