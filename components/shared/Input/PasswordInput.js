import React, { useState } from "react";

import HideEyeIcon from "../../../images/hide-eye-icon.svg";
import ShowEyeIcon from "../../../images/show-eye-icon.svg";
import { BUTTON_TYPE, TYPE } from "../../../utils/Constants";

const PasswordInput = ({
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
  ...props
}) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <>
      <label className="text-label text-primary">{label}</label>
      <div className="input-group">
        {icon && (
          <div className="input-group-text">
            <img src={icon} alt="icon" />
          </div>
        )}

        <input
          disabled={disabled}
          type={isPasswordShow ? TYPE.TEXT : TYPE.PASSWORD}
          name={name}
          className={`form-control text-black ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />

        <div
          className="input-group-text"
          onClick={() => {
            setIsPasswordShow((prev) => !prev);
          }}
        >
          <img src={isPasswordShow ? ShowEyeIcon : HideEyeIcon} alt="icon" />
        </div>
      </div>

      <p className="text-danger m-0">{error}&nbsp;</p>
    </>
  );
};

export default PasswordInput;
