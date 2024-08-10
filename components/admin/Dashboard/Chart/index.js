import React, { useEffect, useState, useCallback } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import LineChart from "../../../shared/Charts/LineChart";
import { CHART_INITIAL, TABS, LIST_TYPE } from "./constants";
import { getChartDetails, tabHandler, chartTypeModifier } from "./helper";

const Chart = () => {
  const [data, setData] = useState(CHART_INITIAL);

  useEffect(() => {
    getChartDetails(setData);
  }, []);

  const typeHandler = useCallback(
    (value) => {
      chartTypeModifier(value, setData);
    },
    [data]
  );

  const handleTab = useCallback(
    (value) => {
      tabHandler(value, data, setData);
    },
    [data]
  );

  const options = {
    yaxis: {
      labels: {
        formatter: function (val) {
          val = parseFloat(val) / 1000;
          return `$${val.toFixed(2)}K`;
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        show: true,
        formatter: (value) => {
          return "$" + value;
        },
      },
    },
  };

  return (
    <div className="mt-4">
      <Card>
        <Card.Body>
          <div className="d-flex flex-row flex-wrap justify-content-between">
            <div>
              <Tab.Container defaultActiveKey={data?.tab}>
                <>
                  <Nav className="table-tabs nav nav-tabs">
                    {TABS.map((tab) => (
                      <Nav.Link
                        as="button"
                        eventKey={tab.value}
                        type="button"
                        onClick={() => handleTab(tab.value)}
                      >
                        {tab.title}
                      </Nav.Link>
                    ))}
                  </Nav>
                </>
              </Tab.Container>
            </div>
            <div className="d-flex flex-row align-items-center">
              {LIST_TYPE?.map((type, i) => (
                <span
                  className={`text-body fs-sm px-2 cursor-pointer ${i < LIST_TYPE?.length - 1 && "border-end border-2 body-border mr-3"} ${type.value === data.chartType && "text-primary"}`}
                  onClick={() => typeHandler(type.value)}
                >
                  {type.title}
                </span>
              ))}
            </div>
          </div>
          <LineChart
            name={data.name}
            data={data?.display}
            loading={data?.loading}
            options={options}
            className="admin-fiat-chart"
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Chart;
