import React from "react";
import { Tab, Nav } from "react-bootstrap";

const ShowTabs = ({ mainTabs, activeTab, handleActiveTab }) => {
  return (
    <>
      <div className="default-tab mt-1 mb-2 w-100">
        <Tab.Container
          defaultActiveKey={activeTab}
          onSelect={(e) => {
            handleActiveTab(e);
          }}
        >
          <Nav as="ul" className="nav-tabs">
            {mainTabs.map((data, i) => (
              <Nav.Item as="li" key={i}>
                <Nav.Link
                  eventKey={
                    data.isValue ? data.value : data?.name?.toLowerCase()
                  }
                >
                  <div
                    className={`d-flex align-items-center gap-2 ${activeTab === data?.name?.toLowerCase() || activeTab === data?.value ? "tab-active" : "tab-inactive"}`}
                  >
                    <span>{data.icon}</span>
                    <span>{data.name}</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Tab.Container>
      </div>
    </>
  );
};

export default ShowTabs;
