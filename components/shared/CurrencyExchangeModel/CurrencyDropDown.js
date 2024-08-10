import React, { useState } from "react";
import Spinner from "../Spinner";

const CurrencyDropDown = ({
  currencies,
  loading,
  currency,
  onChangeCurrency,
}) => {
  const [isOpen, setIsOpen] = useState();

  return (
    <span
      className="currency-dropdown-menu-cont"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {currency?.logo ? (
        <span className="currency-icon-cont me-2">
          <img src={currency?.logo} alt="c" className="w-100 h-100" />
        </span>
      ) : (
        <span className="d-inline-block p-1">{"Select Currency"}</span>
      )}
      <span className="text-primary text-lg fs-20 fw-light m-0">
        {currency?.code}
      </span>
      <span className="d-inline-block ms-2">
        <i
          className={`fa fa-caret-${isOpen ? "up" : "down"} text-primary`}
          aria-hidden="true"
        />
      </span>
      {isOpen && (
        <ul className="menu-lis-cont">
          {loading && <Spinner />}
          {currencies
            ?.filter((item) => item?.code !== currency?.code)
            ?.map((item) => {
              return (
                <li
                  className="d-flex align-items-center"
                  onClick={() => onChangeCurrency(item)}
                >
                  <span className="currency-icon-cont me-2">
                    <img src={item?.logo} alt="c" className="w-100 h-100" />
                  </span>
                  <span className="text-primary text-lg fs-20 fw-light m-0">
                    {item?.code}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </span>
  );
};

export default CurrencyDropDown;
