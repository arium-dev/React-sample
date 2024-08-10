import React from "react";
import { Link } from "react-router-dom";
import { LABELS } from "../utils/Constants";

const Error404 = () => {
  return (
    <div className="authincation ">
      <div className="container">
        <div className="row justify-content-center h-100 align-items-center ">
          <div className="col-md-7">
            <div className="form-input-content text-center error-page">
              <h1 className="error-text fw-bold">{LABELS.ERROR_404}</h1>
              <h4>
                <i className="fa fa-exclamation-triangle text-warning" />
                {LABELS.ACCOUNT_NOT_FOUND}
              </h4>
              <p>{LABELS.ACCOUNT_NOT_FOUND_DESC}</p>
              <div>
                <Link className="btn btn-primary" to="/">
                  {LABELS.GO_TO_BACK}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
