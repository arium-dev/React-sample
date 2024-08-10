import React, { createContext, useState, useCallback, useMemo } from "react";
export const TabContext = createContext();

const TabContextProvider = (props) => {
  const [activeTab, setActiveTab] = useState({ tab: "Dashboard", subTab: "" });
  const handleTabClick = useCallback((data) => {
    setActiveTab({
      tab: data.mainTitle || data.title,
      subTab: data.subTitle || data.title,
    });
  }, []);
  const values = useMemo(() => {
    return { activeTab, handleTabClick };
  }, [activeTab, handleTabClick]);
  return (
    <TabContext.Provider value={values}>{props.children}</TabContext.Provider>
  );
};

export default TabContextProvider;
