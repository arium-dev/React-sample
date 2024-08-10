import React from "react";
import { Tab } from "react-bootstrap";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

const Table = ({
  loading,
  title = "",
  search = "",
  handleSearch,
  header = [],
  children,
  bodyData = [],
  page = 1,
  limit = 10,
  total = 1,
  handlePagination,
  tabs,
  handleTab,
  selectedTab,
  mainTabs,
  activeTab,
  handleActiveTab,
  handleCreate,
  handleRefresh,
  handleExport,
  actionHandler,
  setToggleTabs,
  isCreateWithdrawal = false,
  className = "",
  btnText = "",
}) => {
  let pagination = Array(Math.ceil(total / limit))
    .fill()
    .map((_, i) => i + 1);

  return (
    <>
      <Tab.Container defaultActiveKey="Buy">
        <div className="card text-title d-flex flex-column flex-grow-1 overflow-auto">
          <TableHeader
            title={title}
            search={search}
            handleSearch={handleSearch}
            tabs={tabs}
            handleTab={handleTab}
            selectedTab={selectedTab}
            mainTabs={mainTabs}
            activeTab={activeTab}
            handleActiveTab={handleActiveTab}
            handleCreate={handleCreate}
            handleRefresh={handleRefresh}
            handleExport={handleExport}
            setToggleTabs={setToggleTabs}
            btnText={btnText}
          />

          <div
            className={`card-body d-flex overflow-auto py-0 min-height-220 ${className}`}
          >
            <Tab.Content className="w-100">
              <div className="table-responsive dataTablehistory w-100 h-100">
                <div
                  id="sellbthdata_wrapper"
                  className="dataTables_wrapper no-footer h-100 d-flex flex-column"
                >
                  <TableBody
                    loading={loading}
                    header={header}
                    bodyData={bodyData}
                    page={page}
                    total={total}
                    handlePagination={handlePagination}
                    actionHandler={actionHandler}
                  >
                    {children}
                  </TableBody>
                </div>
              </div>
            </Tab.Content>
          </div>
          {handlePagination && (
            <div className="card-footer py-0">
              <TableFooter
                loading={loading}
                page={page}
                total={total}
                pagination={pagination}
                handlePagination={handlePagination}
                limit={limit}
              />
            </div>
          )}
        </div>
      </Tab.Container>
    </>
  );
};
export default Table;
