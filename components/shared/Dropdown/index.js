import React from "react";

const Dropdown = ({
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
  list,
  value,
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

        <select
          defaultValue={value}
          className="form-control"
          onChange={onChange}
        >
          {list.map((item) => (
            <option value={item.value}>{item.name}</option>
          ))}
        </select>

        {secondaryIcon && (
          <div className="input-group-text">
            <img src={secondaryIcon} alt="icon" />
          </div>
        )}
      </div>

      <p className="text-danger m-0">{error}&nbsp;</p>
    </>
  );
};

export default Dropdown;
