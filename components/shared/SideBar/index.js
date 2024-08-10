import React, { useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink, Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { MenuList } from "./Menu";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { getLocalStorageItem } from "../../../config/AuthSetting";
import ProfileSection from "./ProfileSection";
import { GenericConstant } from "../../../utils/Constants";
import { encryptedKeys } from "../../../utils";

const LineItem = ({ activeTab, data, isSubList = false, showIcon = true }) => {
  return (
    <li
      className={`${activeTab?.toLowerCase() === data?.title?.toLowerCase() ? "mm-active" : ""}`}
    >
      <NavLink to={data.to}>
        {(showIcon && data.iconStyle) || null}
        <span className={`${!isSubList && "nav-text"}`}>{data.title}</span>
      </NavLink>
    </li>
  );
};

const SideBar = ({ activeTab, activeSubTab }) => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  let role =
    getLocalStorageItem(encryptedKeys.userInfo)?.role || GenericConstant._USER;

  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const Menu = MenuList[role] || [];

  return (
    <div
      className={`deznav border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <ul className="metismenu" id="menu">
          {Menu.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index}>
                  {data.title}
                </li>
              );
            } else {
              return (
                <li
                  className={` ${activeTab?.toLowerCase() === data?.title?.toLowerCase() ? "mm-active" : ""}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ? (
                    <Link to={data.to} className="has-arrow">
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  ) : (
                    <NavLink to={data.to}>
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </NavLink>
                  )}

                  {data.content && data.content.length > 0 ? (
                    <Collapse
                      in={Boolean(
                        activeTab?.toLowerCase() === data?.title?.toLowerCase()
                      )}
                    >
                      <ul
                        className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}
                      >
                        {data.content &&
                          data.content.map((subData, i) => (
                            <LineItem
                              key={i}
                              activeTab={activeSubTab}
                              data={subData}
                              isSubList={true}
                            />
                          ))}
                      </ul>
                    </Collapse>
                  ) : (
                    <ul className={"main-list-item-title"}>
                      <LineItem
                        key={1}
                        activeTab={activeSubTab}
                        data={data}
                        isSubList={true}
                        showIcon={false}
                      />
                    </ul>
                  )}
                </li>
              );
            }
          })}
        </ul>
      </PerfectScrollbar>
      <ProfileSection />
    </div>
  );
};

export default SideBar;
