import React from "react";
import { Card } from "react-bootstrap";

const DetailedCard = ({ children, title, footer, status }) => {
  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between w-100 flex-wrap">
          <Card.Title>{title}</Card.Title>

          <Card.Title className="ml-2 mb-0 mt-1">{status}</Card.Title>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text>{children}</Card.Text>
      </Card.Body>

      {footer && (
        <Card.Footer className=" border-0 pt-0">
          <Card.Text className=" d-inline">{footer}</Card.Text>
        </Card.Footer>
      )}
    </Card>
  );
};

export default DetailedCard;
