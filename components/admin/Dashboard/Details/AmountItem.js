import React from "react";
import { FormatTwoDecimals } from "../../../../utils";
import { PENDING } from "./constants";

const AmountItem = ({ data, onClick, type }) => {
  return (
    <div
      className="h-100 d-flex flex-column text-center justify-content-center rounded-2 info-bg cursor-pointer"
      onClick={() => onClick && onClick(data)}
    >
      <span className="fs-sm text-body ">{data?.title || ""}</span>
      <span className="fs-4 fw-medium">
        {type === PENDING && "$"}
        {FormatTwoDecimals(parseFloat(data?.value)) ?? data?.value}
      </span>
    </div>
  );
};

export default AmountItem;
