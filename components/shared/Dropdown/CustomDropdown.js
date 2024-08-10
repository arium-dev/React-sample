import React from "react";
import { Dropdown as BootstrapDropDown } from "react-bootstrap";
import Spinner from "../Spinner";
import { GenericConstant } from "../../../utils/Constants";

const Dropdown = ({
  className = "",
  placeholder,
  label,
  onSelect,
  error,
  icon,
  secondaryIcon,
  list,
  size = GenericConstant._MD,
  loading = false,
  disabled = null,
  active = false,
  variant = "",
}) => {
  return (
    <>
      {label && <label className="text-label text-primary">{label}</label>}
      <div className="input-group mb-0 w-100">
        {icon && (
          <div className="input-group-text">
            <img src={icon} alt="icon" />
          </div>
        )}

        <BootstrapDropDown onSelect={onSelect}>
          <BootstrapDropDown.Toggle
            variant={`${variant ? variant : "outline-primary"} light ${className} dropdown-color ${loading && "no-arrow"}`}
            size={size}
            id="whiteSpace"
            className="w-100 mt-1 mb-2 bg-primary-1 d-flex justify-content-between align-items-center"
            disabled={loading || disabled}
          >
            {loading ? (
              <span className="d-flex align-items-center gap-1">
                {placeholder} <Spinner color="text-primary" size={12} />
              </span>
            ) : (
              <span className="dropdown-margin-fiat">{placeholder}</span>
            )}
          </BootstrapDropDown.Toggle>
          <BootstrapDropDown.Menu className="w-100">
            {list.map((item) => (
              <BootstrapDropDown.Item
                key={item.value}
                eventKey={item.value}
                active={item?.id === active}
              >
                {item.label}
              </BootstrapDropDown.Item>
            ))}
          </BootstrapDropDown.Menu>
        </BootstrapDropDown>

        {secondaryIcon && (
          <div className="input-group-text">
            <img src={secondaryIcon} alt="icon" />
          </div>
        )}
      </div>

      {error && <p className="text-danger m-0">{error}&nbsp;</p>}
    </>
  );
};

export default Dropdown;
