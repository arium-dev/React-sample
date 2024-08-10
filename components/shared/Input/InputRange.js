import React from "react";
import { TYPE } from "../../../utils/Constants";

const InputRange = ({
  name,
  className = "",
  label,
  error,
  onBlur,
  disabled = false,
  min = 0,
  max = 100,
  value = 0,
  onChange = () => {},
  ...props
}) => {
  return (
    <>
      {label && <label className="text-label text-primary">{label}</label>}
      <div className="input-group mb-0">
        <input
          disabled={disabled}
          type={TYPE.RANGE}
          value={value}
          min={min}
          max={max}
          className={`input-slider ${className}`}
          onChange={onChange}
          {...props}
        />
      </div>

      <p className="text-danger m-0">{error}&nbsp;</p>
    </>
  );
};

export default InputRange;
