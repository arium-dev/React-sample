import React, { Fragment, useLayoutEffect, useState } from "react";
import NavHeader from "../NavHeader";
import SideBar from "../SideBar";
import Header from "../MainHeader";
import { useLocation } from "react-router-dom";
import { PageTitles } from "../../../utils/Constants";
import { DASHBOARD } from "../Constants";

const Nav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState({ tab: DASHBOARD, subTab: "" });

  useLayoutEffect(() => {
    const title = PageTitles[location?.pathname];
    setActiveTab({ tab: title, subTab: title });
  }, [location?.pathname]);
  return (
    <Fragment>
      <NavHeader activeTab={activeTab.tab} />
      <Header activeTab={activeTab.tab} />
      <SideBar activeTab={activeTab.tab} activeSubTab={activeTab.subTab} />
    </Fragment>
  );
};

export default Nav;
