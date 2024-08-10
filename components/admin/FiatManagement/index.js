import React, { useState, useCallback, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Deposit from "./Deposit";
import PendingDeposit from "./PendingDeposit";
import LinkToEdd from "./LinkToEdd";
import Withdraw from "./Withdraw";
import { getMainTabs } from "./helper";
import { useSearchParams, useLocation } from "react-router-dom";
import { isAuthorizedAction } from "../../../utils";
import { PERMISSIONS } from "../../../utils/Constants";

const tabComponents = {
  [PERMISSIONS.VIEW_DEPOSIT]: Deposit,
  [PERMISSIONS.VIEW_PENDING_DEPOSIT]: PendingDeposit,
  [PERMISSIONS.VIEW_LINK_TO_EDD]: LinkToEdd,
  [PERMISSIONS.VIEW_WITHDRAWAL]: Withdraw,
};

const FiatManagement = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("");

  const permissions = useSelector((state) => state.auth.permissions);

  const mainTabs = getMainTabs(permissions);

  useLayoutEffect(() => {
    if (!activeTab && mainTabs.length > 0) {
      const selectedTab = isAuthorizedAction(
        window.history?.state?.activeTab,
        permissions
      )
        ? window.history?.state?.activeTab
        : isAuthorizedAction(searchParams?.get("active"), permissions)
          ? searchParams?.get("active")
          : mainTabs[0].value;
      setActiveTab(selectedTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainTabs]);

  const ActiveTabComponent = tabComponents[activeTab];
  const handleActiveTab = useCallback(
    (e) => {
      location.state = {};
      window.history.replaceState(
        { activeTab: e, search: "" },
        "",
        window.location?.pathname
      );
      setActiveTab(e);
    },
    [location]
  );

  return (
    <>
      {ActiveTabComponent && (
        <ActiveTabComponent
          mainTabs={mainTabs}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )}
    </>
  );
};

export default FiatManagement;
