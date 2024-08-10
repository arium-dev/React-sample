import React from "react";
import { FormatTwoDecimals, capitalizeText } from "../../../../../utils";
import AutoComplete from "../../../../shared/AutoComplete";
import Input from "../../../../shared/Input/Input";
import { GenericConstant, ZERO } from "../../../../../utils/Constants";
import { Constants, EIGHTEEN } from "./constants";

const FormBody = ({ banks, errors, watch, trigger, setValue, disabled }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <label className="fw-normal fs-5 m-0">
          {Constants.CURRENT_BALANCE}
        </label>

        <h6 className="m-0">
          {`$${FormatTwoDecimals(watch(Constants._CURRENT_BALANCE))}`}{" "}
          <span className="text-primary">{Constants.AUD}</span>
        </h6>
      </div>

      <div className="mt-2">
        <div className="input-group">
          <AutoComplete
            id={Constants._BANK}
            disabled={disabled}
            name={Constants._BANK}
            label={Constants.SELECT_BANK}
            placeholder={Constants.SELECT_BANK}
            value={watch(Constants._BANK)}
            options={banks || []}
            error={capitalizeText(
              errors &&
                errors[Constants._ACCOUNT_NUMBER] &&
                errors[Constants._ACCOUNT_NUMBER].message
            )}
            onBlur={() => trigger(Constants._ACCOUNT_NUMBER)}
            onChange={(selected) => {
              const bank =
                (selected && selected[ZERO] && selected[ZERO]) || null;
              setValue(
                Constants._ACCOUNT_NUMBER,
                (bank && bank[Constants._ACCOUNT_NUMBER]) || ""
              );
              trigger(Constants._ACCOUNT_NUMBER);
            }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end position-relative">
        <div
          id="t-max-value"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={Constants.FILL_MAX_AMOUNT}
          onClick={() => {
            setValue(
              Constants._AMOUNT,
              parseFloat(watch(Constants._CURRENT_BALANCE))
            );
            trigger(Constants._AMOUNT);
          }}
          className="c-pointer text-primary max-amount-button"
        >
          {Constants.MAX}
        </div>
      </div>
      <div className="input-group">
        <Input
          disabled={disabled}
          type={GenericConstant._NUMBER}
          className="form-control"
          id={Constants._AMOUNT}
          name={Constants._AMOUNT}
          label={Constants.AMOUNT}
          placeholder={Constants.ENTER_AMOUNT}
          onChange={(e) => {
            const inputValue = e.target.value;
            setValue(
              Constants._AMOUNT,
              inputValue === ""
                ? ""
                : parseFloat(inputValue) >= ZERO &&
                    parseFloat(inputValue) <= watch(Constants._CURRENT_BALANCE)
                  ? parseFloat(inputValue)
                  : watch(Constants._AMOUNT)
            );
            trigger(Constants._AMOUNT);
          }}
          value={watch(Constants._AMOUNT)}
          min={ZERO}
          onBlur={() => trigger(Constants._AMOUNT)}
          error={capitalizeText(
            errors &&
              errors[Constants._AMOUNT] &&
              errors[Constants._AMOUNT].message
          )}
          endGroupText={GenericConstant.AUD}
        />
      </div>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <label className="fw-normal fs-5 m-0">{Constants.REMAINING}</label>
        <h6 className="m-0">
          {"$"}
          {FormatTwoDecimals(
            parseFloat(watch(Constants._CURRENT_BALANCE)) -
              parseFloat(watch(Constants._AMOUNT) || ZERO)
          )}{" "}
          <span className="text-primary">{GenericConstant.AUD}</span>
        </h6>
      </div>
    </>
  );
};

export default FormBody;
