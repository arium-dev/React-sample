import React, { useState, useEffect } from "react";

const MainHeader = ({ activeTab }) => {
  const [headerFix, setheaderFix] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  return (
    <div className={`header ${headerFix ? "is-fixed" : "is-fixed"}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {activeTab}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainHeader;
