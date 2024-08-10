import React from "react";
import { Card, CardBody } from "react-bootstrap";
import Spinner from "../../../shared/Spinner";

const InfoCard = ({ loading = false, data, onClick }) => {
  return (
    <Card className={`w-100 h-100`}>
      <CardBody className="d-flex justify-content-center align-items-center p-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center text-primary">
            <Spinner color="text-primary" size={30} />
          </div>
        ) : (
          <div className="h-100 w-100 py-2">
            {data?.map((row, i) => (
              <div
                key={i}
                className={`d-flex justify-content-between align-items-center h-25 mx-4 info-card cursor-pointer`}
                onClick={() => {
                  if (row?.value && onClick) {
                    onClick(row);
                  }
                }}
              >
                <span className="fs-sm fw-semibold text-body">{row.title}</span>
                <span className="fs-sm fw-medium text-body">{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default InfoCard;
