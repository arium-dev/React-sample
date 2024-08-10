import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({
  name,
  className = "",
  placeholder,
  label,
  value,
  onChange,
  error,
  icon,
  secondaryIcon,
  onBlur,
  maxDate,
  disabled = false,
  dateFormat = "dd/MM/yyyy",
  ...props
}) => {
  return (
    <>
      <label className="text-label text-primary">{label}</label>
      <div className="input-group date-picker-cont">
        {icon && (
          <div className="input-group-text">
            <img src={icon} alt="icon" />
          </div>
        )}

        <DatePicker
          disabled={disabled}
          name={name}
          className={`form-control text-black w-100 date-picker ${className}`}
          placeholderText={placeholder}
          selected={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          dateFormat={dateFormat}
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={124}
          scrollableYearDropdown
          scrollableMonthDropdown
          maxDate={maxDate ? maxDate : new Date()}
          {...props}
        />
      </div>

      <p className="text-danger m-0">{error}&nbsp;</p>
    </>
  );
};

export default InputDate;
