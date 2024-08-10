import React from "react";
import { Dropdown as BootstrapDropDown } from "react-bootstrap";
import Spinner from "../../../../shared/Spinner";
import {
  GenericConstant,
  ZERO,
  ONE,
  TWO,
  THREE,
} from "../../../../../utils/Constants";
import { TWELVE } from "./constants";

const SendEmailDropdown = ({
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
  emailStatus,
  disabled = false,
}) => {
  let disabledList = [];

  (function () {
    if (emailStatus === ZERO) disabledList.push(false, true, true);
    else if (emailStatus === ONE) disabledList.push(true, false, true);
    else if (emailStatus === TWO) disabledList.push(true, true, false);
    else if (emailStatus === THREE) disabledList.push(true, true, true);
  })();

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
            variant={`outline-primary light ${className} ${loading && "no-arrow"}`}
            size={size}
            id="whiteSpace"
            className="w-100 mt-1 mb-2 bg-primary-1 d-flex justify-content-between align-items-center"
            disabled={loading || disabled}
          >
            {loading ? (
              <span className="d-flex align-items-center gap-1">
                {placeholder} <Spinner color="text-primary" size={TWELVE} />
              </span>
            ) : (
              <span className="dropdown-margin-fiat">{placeholder}</span>
            )}
          </BootstrapDropDown.Toggle>
          <BootstrapDropDown.Menu className="w-100">
            {list.length > 0 &&
              list.map((item, i) => (
                <BootstrapDropDown.Item
                  key={item?.id}
                  eventKey={item?.value}
                  disabled={disabledList[i]}
                  className="cursor-none"
                >
                  <span className="d-flex gap-2 align-items-center">
                    {item?.label}
                    {emailStatus >= item.status ? (
                      <i class="las la-check-double text-green"></i>
                    ) : (
                      <i
                        class="las la-paper-plane text-primary"
                        onClick={() =>
                          onSelect(null, { target: { innerText: item?.label } })
                        }
                      ></i>
                    )}
                  </span>
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

export default SendEmailDropdown;
