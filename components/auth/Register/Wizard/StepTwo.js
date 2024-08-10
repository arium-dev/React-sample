import React from "react";
import { Button } from "react-bootstrap";

import TablePreview from "../TablePreview";
import { EDIT, USER_DETAILS } from "../constants";
import { ZERO, GenericConstant } from "../../../../utils/Constants";

const StepTwo = ({ watch, setGoSteps, loading }) => {
  return (
    <section>
      <div className="row">
        <h3 className="form-title">{USER_DETAILS}</h3>
        <div className="my-4">
          <TablePreview watch={watch} />

          <span>
            <Button
              disabled={loading}
              className="btn"
              variant="primary light edit-info-btn"
              size={GenericConstant._XS}
              onClick={() => setGoSteps(ZERO)}
            >
              {EDIT}
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
