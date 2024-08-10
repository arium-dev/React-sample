import React from "react";
import { Dropdown } from "react-bootstrap";
import { DROPDOWN_TYPES } from "../../../utils/Constants";

const Menu = ({ className = "", list = [], onClick, disabled = false }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        disabled={disabled}
        variant={DROPDOWN_TYPES.PRIMARY}
        className={`dropdown-toggle-icon light i-false c-pointer ${className}`}
      >
        <i className="fa fa-ellipsis-v fs-16" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        {list?.map((menuItem) => (
          <Dropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              onClick(menuItem.value);
            }}
          >
            {menuItem.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Menu;
