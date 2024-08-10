import React from "react";
import { Badge as BootstrapBadge } from "react-bootstrap";
import { GenericConstant, BADGE_TYPES } from "../../../utils/Constants";

const Badge = ({ children, status, className = "" }) => {
  const handleColor = () => {
    switch (status) {
      case GenericConstant._APPROVED:
        return BADGE_TYPES.SUCCESS;
      case GenericConstant._UN_APPROVED:
      case GenericConstant._PENDING:
        return BADGE_TYPES.WARNING;
      case GenericConstant.PENDING_INVITATION:
        return BADGE_TYPES.WARNING;
      case GenericConstant._REJECTED:
      case GenericConstant._CANCELLED:
        return BADGE_TYPES.DANGER;
      case GenericConstant._LIGHT:
        return BADGE_TYPES.LIGHT;
      case GenericConstant._SENT:
        return BADGE_TYPES.PRIMARY;
      case GenericConstant._RECEIVED:
        return BADGE_TYPES.SUCCESS;
      default:
        return BADGE_TYPES.PRIMARY;
    }
  };
  return (
    <BootstrapBadge pill bg={handleColor()} className={className}>
      {children}
    </BootstrapBadge>
  );
};

export default Badge;
