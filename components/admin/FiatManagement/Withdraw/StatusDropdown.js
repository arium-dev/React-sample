import React from "react";
import { Dropdown as BootstrapDropDown } from "react-bootstrap";
import Spinner from "../../../../components/shared/Spinner";
import { GenericConstant, TOGGLE_VARIANT } from "../../../../utils/Constants";
import { APPROVED, TWELVE } from "../constants";

const getStatusLabel = (status) => {
  return status === GenericConstant._PENDING ||
    status === GenericConstant._UN_APPROVED
    ? GenericConstant.UN_APPROVED
    : status === GenericConstant._APPROVED
      ? GenericConstant.APPROVED
      : status === GenericConstant._CANCELLED
        ? GenericConstant.CANCELLED
        : "";
};

const getStatusClassName = (status) => {
  return status === GenericConstant._PENDING ||
    status === GenericConstant._UN_APPROVED
    ? TOGGLE_VARIANT.WARNING
    : status === GenericConstant._APPROVED
      ? TOGGLE_VARIANT.SUCCESS
      : status === GenericConstant._REJECTED ||
          status === GenericConstant._CANCELLED
        ? TOGGLE_VARIANT.DANGER
        : "";
};

const getSelectedStatus = (s) => {
  return s === GenericConstant.APPROVE
    ? GenericConstant._APPROVED
    : s === GenericConstant.CANCEL
      ? GenericConstant._CANCELLED
      : s === GenericConstant.UN_APPROVE
        ? GenericConstant._UN_APPROVED
        : "";
};

const StatusDropdown = ({
  id,
  status,
  type,
  withdraws,
  handleStatusUpdateConfirmation,
  list,
  className = "",
  size = GenericConstant._MD,
  loading = false,
  batchId,
  disabled = false,
}) => {
  const onClickHandler = (s) => {
    const selectedStatus = getSelectedStatus(s);
    const previousStatus = status;
    if (
      selectedStatus !== previousStatus &&
      previousStatus.toLowerCase() !== APPROVED
    ) {
      handleStatusUpdateConfirmation(
        withdraws,
        selectedStatus,
        type,
        id,
        batchId ? batchId : id
      );
    }
  };

  return (
    <>
      <div className={`mb-0 ${className}`}>
        <BootstrapDropDown className="w-100">
          <BootstrapDropDown.Toggle
            variant={`${getStatusClassName(status)} light dropdown-color`}
            size={size}
            id="whiteSpace"
            className={`mt-1 mb-2 bg-primary-1 d-flex justify-content-between align-items-center ${status === APPROVED && "no-arrow"}`}
            disabled={loading || status === APPROVED || disabled}
          >
            {loading ? (
              <span className="d-flex align-items-center gap-1">
                {getStatusLabel(status)}
                <Spinner color="text-primary" size={TWELVE} />
              </span>
            ) : (
              getStatusLabel(status)
            )}
          </BootstrapDropDown.Toggle>
          <BootstrapDropDown.Menu className="w-100">
            {list.map((item) => (
              <BootstrapDropDown.Item
                key={item?.id}
                eventKey={item?.value}
                active={item?.id === status}
                onClick={(e) => {
                  onClickHandler(e.target.text);
                }}
              >
                {item?.label}
              </BootstrapDropDown.Item>
            ))}
          </BootstrapDropDown.Menu>
        </BootstrapDropDown>
      </div>
    </>
  );
};

export default StatusDropdown;
