import React from "react";
import Spinner from "../Spinner";
import { BUTTON_TYPE } from "../../../utils/Constants";

const Input = ({
  type = BUTTON_TYPE.BUTTON,
  name,
  className = "",
  placeholder,
  label,
  onChange,
  error,
  icon,
  secondaryIcon,
  onBlur,
  disabled = false,
  loading = false,
  startGroupText = "",
  endGroupText = "",
  symbol,
  ...props
}) => {
  return (
    <>
      {label && <label className="text-label text-primary">{label}</label>}
      <div className="input-group mb-0">
        {icon && (
          <div className="input-group-text">
            <img src={icon} alt="icon" />
          </div>
        )}

        {symbol && !loading && (
          <span className="input-group-text text-primary fs-22">{symbol}</span>
        )}

        {startGroupText && (
          <span className="input-group-text input-group-start">
            {startGroupText}
          </span>
        )}
        <input
          disabled={disabled}
          type={type}
          name={name}
          className={`form-control text-black ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />

        {secondaryIcon && (
          <div className="input-group-text">
            <img src={secondaryIcon} alt="icon" />
          </div>
        )}

        {!loading && endGroupText && (
          <span className="input-group-text">{endGroupText}</span>
        )}

        {loading && (
          <span className="input-group-text">
            <Spinner color="" variant={"primary"} />{" "}
          </span>
        )}
      </div>

      <p className="text-danger m-0 fs-12">{error}&nbsp;</p>
    </>
  );
};

export default Input;
