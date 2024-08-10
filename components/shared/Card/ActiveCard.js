import React from "react";
import { Card } from "react-bootstrap";

const ActiveCard = ({
  className = "",
  header = "",
  headerClass = "",
  children,
}) => {
  return (
    <Card className={className}>
      <Card.Header className={`bg-primary text-white ${headerClass}`}>
        <Card.Title className="text-white" active>
          {header}
        </Card.Title>
      </Card.Header>
      <Card.Body className="p-0">{children}</Card.Body>
    </Card>
  );
};

export default ActiveCard;
