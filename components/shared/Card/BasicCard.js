import React from "react";
import { Card } from "react-bootstrap";

const BasicCard = ({ className, children }) => {
  return (
    <Card>
      <Card.Header className="border-0">
        <Card.Title className={className}>{children}</Card.Title>
      </Card.Header>
    </Card>
  );
};

export default BasicCard;
