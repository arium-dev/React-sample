import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const AutoComplete = ({
  id = "auto-complete",
  name,
  className = "",
  placeholder,
  label,
  options = [],
  onChange,
  error,
  icon,
  secondaryIcon,
  onBlur,
  disabled = false,
  list,
  value = null,
  labelKey = "label",
  ...props
}) => {
  return (
    <>
      {label && <label className="text-label text-primary">{label}</label>}
      <div className="input-group mb-0 position-relative auto-complete-cont">
        {icon && (
          <div className="input-group-text">
            <img src={icon} alt="icon" />
          </div>
        )}
        <Typeahead
          id={id}
          disabled={disabled}
          className="w-100"
          variant="outline-primary light"
          labelKey={labelKey}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          options={options}
          selected={value}
          {...props}
        >
          {(props) =>
            !(value && value[0]) && (
              <span className="menu-icon-auto-complete">
                <i
                  className={`fa fa-caret-${props.isMenuShown ? "up" : "down"} text-primary`}
                  aria-hidden="true"
                />
              </span>
            )
          }
        </Typeahead>

        {secondaryIcon && (
          <div className="input-group-text">
            <img src={secondaryIcon} alt="icon" />
          </div>
        )}

        {value && value[0] && (
          <span
            className="clear-auto-complete c-pointer"
            onClick={() => !disabled && onChange([])}
          >
            <i class="bi bi-x text-primary fs-3 fw-bold"></i>
          </span>
        )}
      </div>

      <p className="text-danger m-0">{error}&nbsp;</p>
    </>
  );
};

export default AutoComplete;
