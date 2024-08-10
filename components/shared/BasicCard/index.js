import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const BasicCard = ({ title, list }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title active>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="basic-list-group">
          <ListGroup as="ul">
            {list.map((item, i) => (
              <span key={i}>
                <ListGroup.Item as="li" active>
                  {item}
                </ListGroup.Item>
              </span>
            ))}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BasicCard;
