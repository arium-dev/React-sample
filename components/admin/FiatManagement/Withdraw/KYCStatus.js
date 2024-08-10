import React from "react";
import { upperFirst } from "lodash";

import { KYC_PENDING, NOT_VERIFIED, REJECTED, VERIFIED } from "../constants";
import { BADGE_VARIANT } from "../../../../utils/Constants";

const getKYCStatus = (level) => {
  const getKYCInfo = (level) => {
    switch (level) {
      case 0:
        return { badge: BADGE_VARIANT.DANGER, status: REJECTED };
      case 1:
        return { badge: BADGE_VARIANT.DANGER, status: NOT_VERIFIED };
      case 2:
        return { badge: BADGE_VARIANT.WARNING, status: KYC_PENDING };
      case 3:
        return { badge: BADGE_VARIANT.PRIMARY, status: VERIFIED };
      default:
        return "";
    }
  };

  const KYCInfo = getKYCInfo(level);

  return (
    <p className={`badge badge-rounded px-3 py-2 m-0 ${KYCInfo.badge}`}>
      {upperFirst(KYCInfo?.status)}
    </p>
  );
};

const KYCStatus = ({ level }) => {
  return <>{getKYCStatus(level)}</>;
};

export default KYCStatus;
