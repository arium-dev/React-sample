import React, { useState, useCallback } from "react";
import Withdraw from "./Withdraw";
import { DEPOSIT, WITHDRAW } from "./constants";
import Deposit from "./Deposit";

const Tabs = ({ isKycApproved, selectedTab, setToggleTabs }) => {
  const tabComponents = {
    [DEPOSIT]: Deposit,
    [WITHDRAW]: Withdraw,
  };

  const [activeTab, setActiveTab] = useState(selectedTab);
  const ActiveTabComponent = tabComponents[activeTab];
  const handleActiveTab = useCallback((e) => {
    setActiveTab(e);
  }, []);

  return (
    <>
      {ActiveTabComponent && (
        <ActiveTabComponent
          isKycApproved={isKycApproved}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
          setToggleTabs={setToggleTabs}
        />
      )}
    </>
  );
};

export default Tabs;
