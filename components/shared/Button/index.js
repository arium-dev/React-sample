import React from "react";
import Spinner from "../Spinner";

const Button = ({
  children,
  type = "button",
  disabled = false,
  loading,
  className = "",
  onClick,
  variant = "btn-primary",
}) => {
  return (
    <button
      type={type}
      className={`btn sw-btn-next ${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <div className="d-flex justify-content-center align-items-center spinner-cont">
          <Spinner color="" variant={variant} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
