import React from "react";
import { Dropdown as BootstrapDropDown } from "react-bootstrap";
import Spinner from "../Spinner";
import {
  APPROVE,
  APPROVED,
  IN_PROGRESS,
  PENDING,
  REJECT,
  REJECTED,
  _APPROVED,
  _PENDING,
  _REJECTED,
} from "./constants";
import { GenericConstant } from "../../../utils/Constants";

const getStatusLabel = (status) => {
  return status === IN_PROGRESS || status === _PENDING
    ? PENDING
    : status === _APPROVED
      ? APPROVED
      : status === REJECTED
        ? _REJECTED
        : "";
};

const getStatusClassName = (status) => {
  return status === IN_PROGRESS || status === _PENDING
    ? "outline-warning"
    : status === _APPROVED
      ? "outline-success"
      : status === REJECTED
        ? "outline-danger"
        : "";
};

const getSelectedStatus = (s) => {
  return s === APPROVE
    ? _APPROVED
    : s === REJECT
      ? REJECTED
      : s === PENDING
        ? _PENDING
        : "";
};

const StatusDropdown = ({
  id,
  status,
  handleStatusUpdate,
  list,
  loading = false,
  disabled = false,
  disableOn = [_APPROVED],
  className = "",
  size = GenericConstant._MD,
}) => {
  const onClickHandler = (s) => {
    const selectedStatus = getSelectedStatus(s);
    const previousStatus = status;

    if (
      selectedStatus !== previousStatus &&
      previousStatus.toLowerCase() !== _APPROVED
    ) {
      handleStatusUpdate(id, selectedStatus);
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
            className={`mt-1 mb-2 bg-primary-1 d-flex justify-content-between align-items-center ${disableOn.includes(status) && "no-arrow"}`}
            disabled={loading || disabled || disableOn.includes(status)}
          >
            {loading ? (
              <span className="d-flex align-items-center gap-1">
                {getStatusLabel(status)}
                <Spinner color="text-primary" size={12} />
              </span>
            ) : (
              getStatusLabel(status)
            )}
          </BootstrapDropDown.Toggle>
          <BootstrapDropDown.Menu className="w-100">
            {list.map((item) => (
              <BootstrapDropDown.Item
                key={item?.value}
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
