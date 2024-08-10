import React from "react";
import { Button, Modal } from "react-bootstrap";

const ShowModal = ({
  isOpen = false,
  title,
  children,
  onClose,
  className = "",
  dialogClassName = "",
  hideHeader = false,
  bodyClassName = "",
}) => {
  return (
    <Modal
      className={`fade ${className}`}
      show={isOpen}
      onHide={onClose}
      dialogClassName={dialogClassName}
    >
      {hideHeader ? (
        <Modal.Body>{children}</Modal.Body>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
            <Button variant="" className="btn-close" onClick={onClose} />
          </Modal.Header>
          <Modal.Body className={`${bodyClassName}`}>{children}</Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ShowModal;
