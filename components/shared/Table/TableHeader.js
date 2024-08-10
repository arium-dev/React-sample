import React, { useState, useEffect } from "react";
import { Tab, Nav, Button } from "react-bootstrap";
import ShowTabs from "../Tab";
import { CREATE_WITHDRAW, EXPORT } from "./constants";
import TableDataSearch from "./TableDataSearch";
import { initialSearch } from "./helper";
import { BUTTON_TYPE } from "../../../utils/Constants";

const TableHeader = ({
  title = "",
  search = "",
  handleSearch,
  tabs = [],
  selectedTab = "",
  mainTabs,
  activeTab,
  handleActiveTab,
  handleTab = null,
  handleCreate = null,
  handleRefresh = null,
  handleExport = null,
  setToggleTabs,
  btnText,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchVal, setSearchVal] = useState({
    ...initialSearch,
    current: search,
  });

  // useEffect for searchVal updation
  useEffect(() => {
    setSearchVal((prev) => ({
      prev: prev.current,
      current: search,
    }));
  }, [search]);

  const handleRefreshClick = () => {
    if (handleRefresh && !refreshing) {
      setRefreshing(true);
      handleRefresh();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  };

  return (
    <div className="card-header pb-0 flex-column align-items-start">
      {title && (
        <h4 className="heading">
          {setToggleTabs && (
            <i
              className="las la-chevron-circle-left me-2 cursor-pointer fa-lg"
              onClick={() => {
                setToggleTabs(false);
              }}
            />
          )}
          {title}
        </h4>
      )}

      {mainTabs && (
        <ShowTabs
          mainTabs={mainTabs}
          activeTab={activeTab}
          handleActiveTab={handleActiveTab}
        />
      )}

      <div className="d-flex align-items-end justify-content-between flex-wrap w-100">
        {handleSearch && (
          <TableDataSearch
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            handleSearch={handleSearch}
          />
        )}
        {(handleRefresh ||
          handleCreate ||
          handleExport ||
          tabs?.length > 0) && (
          <div className="d-flex gap-2 mb-4 flex-wrap ms-auto">
            <div className="d-flex gap-3 align-items-center">
              {handleRefresh && (
                <Button
                  className="btn btn-sm rounded-circle table-btn"
                  variant="primary light"
                  onClick={handleRefreshClick}
                  disabled={refreshing}
                >
                  <i className="las la-sync fa-xl" />
                </Button>
              )}
              {handleCreate && (
                <Button
                  className={`btn btn-sm ${btnText ? "rounded-5" : "rounded-circle table-btn"}`}
                  variant="primary light"
                  onClick={() => handleCreate()}
                >
                  {btnText ? (
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa fa-plus fa-lg" />
                      <span className="fw-normal">{btnText}</span>
                    </div>
                  ) : (
                    <i className="fa fa-plus fa-lg" />
                  )}
                </Button>
              )}

              {handleExport && (
                <Button
                  className="btn btn-sm rounded-5"
                  variant="primary light"
                  onClick={() => handleExport()}
                >
                  <div className="d-flex align-items-center gap-2">
                    <i className="las la-download fa-xl" />
                    <span className="fw-semibold">{EXPORT}</span>
                  </div>
                </Button>
              )}
            </div>

            <Tab.Container defaultActiveKey={selectedTab}>
              <>
                {tabs?.length > 0 && (
                  <Nav className="table-tabs nav nav-tabs">
                    {tabs.map((tab) => (
                      <Nav.Link
                        as="button"
                        eventKey={tab.value}
                        type={BUTTON_TYPE.BUTTON}
                        active={tab.value === selectedTab}
                        onClick={() => {
                          if (tab.value !== selectedTab) {
                            setSearchVal(initialSearch);
                            handleTab(tab.value);
                          }
                        }}
                      >
                        {tab.title}
                      </Nav.Link>
                    ))}
                  </Nav>
                )}
              </>
            </Tab.Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
